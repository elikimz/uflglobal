


import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiLock,
  FiPhone,
  FiUser,
  FiTag,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLoginUserMutation } from '../login/loginAPI';
import { useSignupMutation } from '../register/registerAPI';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ustwologo from '../../assets/ustwologo.png';

interface DecodedToken {
  role?: string;
  sub?: string;
  [key: string]: any;
}

interface Message {
  type: 'success' | 'error';
  text: string;
}

interface FormData {
  username: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
  invite_code: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loginUser, { isLoading: loggingIn }] = useLoginUserMutation();
  const [signup, { isLoading: signingUp }] = useSignupMutation();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    invite_code: '',
  });
  const [message, setMessage] = useState<Message | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract invite code from URL
  useEffect(() => {
    const inviteCode = searchParams.get('invite_code');
    if (inviteCode) {
      setFormData((prev) => ({ ...prev, invite_code: inviteCode }));
    }
  }, [searchParams]);

  // Toggle between login and signup forms
  const toggleMode = () => {
    setMessage(null);
    setIsLogin((prev) => !prev);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password' && value.length > 0 && value.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters long.',
      });
    } else if (name === 'password' && value.length >= 8) {
      setMessage(null);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Decode JWT token to extract role and other payload data
  const decodeToken = (token: string): DecodedToken => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Failed to decode token:', e);
      return {};
    }
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await loginUser({
        username: formData.phone_number,
        password: formData.password,

      }).unwrap();

      if (!res.access_token) {
        throw new Error('No access token received');
      }

      localStorage.setItem('access_token', res.access_token);
      const decoded = decodeToken(res.access_token);
      const role = decoded?.role || 'user';

      setMessage({ type: 'success', text: 'Login successful!' });

      setTimeout(() => {
        navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }, 1200);
    } catch (err: any) {
      let errorMsg = 'An error occurred. Please try again.';
      if (err.data?.detail) {
        errorMsg = err.data.detail;
      } else if (typeof err.data === 'object' && err.data?.message) {
        errorMsg = err.data.message;
      } else if (typeof err.data === 'string') {
        errorMsg = err.data;
      }
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    if (formData.password.length < 8) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters long.',
      });
      return;
    }

    const token = recaptchaRef.current?.getValue() || '';
    if (!token) {
      setMessage({ type: 'error', text: 'Please complete the reCAPTCHA.' });
      return;
    }

    try {
      await signup({
        username: formData.username,
        phone_number: formData.phone_number,
        password: formData.password,
        invite_code: formData.invite_code,
        recaptcha_token: token,
        data: '',
      }).unwrap();

      setMessage({
        type: 'success',
        text: 'Registration successful! Redirecting to login...',
      });

      setTimeout(() => {
        setFormData({
          username: '',
          phone_number: '',
          password: '',
          confirmPassword: '',
          invite_code: formData.invite_code,
        });
        setIsLogin(true);
      }, 1200);
    } catch (err: any) {
      let errorMsg = 'An error occurred. Please try again.';
      if (err.data?.detail) {
        errorMsg = err.data.detail;
      } else if (typeof err.data === 'object' && err.data?.message) {
        errorMsg = err.data.message;
      } else if (typeof err.data === 'string') {
        errorMsg = err.data;
      }
      setMessage({ type: 'error', text: errorMsg });
      recaptchaRef.current?.reset();
    }
  };

  const inputClass =
    'w-full px-4 py-3 pl-12 rounded-full bg-indigo-50 border border-indigo-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden relative">
      <div className="absolute w-[150%] h-[150%] bg-indigo-100/20 rounded-[50%] -top-1/4 -right-1/4 blur-3xl"></div>
      <div className="relative w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl flex overflow-hidden backdrop-blur-md border border-indigo-200">
        {/* Left Image - Desktop */}
        <motion.div
          key={isLogin ? 'loginImage' : 'registerImage'}
          initial={{ x: isLogin ? '-100%' : '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isLogin ? '100%' : '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"
        >
          <img src={ustwologo} alt="Company Logo" className="h-64 drop-shadow-lg" />
        </motion.div>
        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-4 md:hidden">
            <img src={ustwologo} alt="Logo" className="h-14" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          {/* Message Box */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-4 flex items-center gap-2 p-3 rounded-lg text-sm ${
                  message.type === 'success'
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-red-100 text-red-700 border border-red-300'
                }`}
              >
                {message.type === 'success' ? <FiCheckCircle /> : <FiXCircle />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Login/Signup Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleLogin}
                className="space-y-5"
              >
                <div className="relative">
                  <FiPhone className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    name="phone_number"
                    placeholder="Phone Number"
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-3.5 text-indigo-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
                >
                  {loggingIn ? 'Logging in...' : 'Login'}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSignup}
                className="space-y-5"
              >
                <div className="relative">
                  <FiUser className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    name="username"
                    placeholder="Username"
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    name="phone_number"
                    placeholder="Phone Number"
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-3.5 text-indigo-500"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-3.5 text-indigo-500"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="relative">
                  <FiTag className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    name="invite_code"
                    placeholder="Invite Code (optional)"
                    className={inputClass}
                    onChange={handleChange}
                    value={formData.invite_code}
                    readOnly={!!formData.invite_code}
                  />
                </div>
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LfIBgMsAAAAAFyzXNqSXiI_qk5Tm15lcqrHPgqn"
                    onLoad={() => console.log('reCAPTCHA loaded successfully')}
                    onErrored={() => console.error('reCAPTCHA failed to load')}
                  />
                </div>
                <button
                  type="submit"
                  disabled={signingUp}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
                >
                  {signingUp ? 'Registering...' : 'Create Account'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {/* Toggle between login and signup */}
          <p className="text-center text-gray-600 mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={toggleMode}
              className="text-purple-600 hover:underline font-medium"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;



// import { useEffect, useState } from 'react';
// import { useGetAllUsersQuery } from '../profile/profileAPI';


// const HackedTerminalUsers = () => {
//   const { data: users, isLoading, isError } = useGetAllUsersQuery();
//   const [displayedText, setDisplayedText] = useState('');
//   const [cursorVisible, setCursorVisible] = useState(true);

//   useEffect(() => {
//     if (isLoading) {
//       const loadingText = "> Fetching user database... \n> Bypassing security protocols... \n> Access granted. \n\n";
//       let i = 0;
//       const typingInterval = setInterval(() => {
//         if (i < loadingText.length) {
//           setDisplayedText(prev => prev + loadingText.charAt(i));
//           i++;
//         } else {
//           clearInterval(typingInterval);
//         }
//       }, 50);
//       return () => clearInterval(typingInterval);
//     } else if (users) {
//       const header =
//         "ID\tUsername\t\tPhone\t\t\tRole\t\tActive\tSuspended\tWithdraw\tRecharge\tCommission\tInvite Code\tCreated At\n" +
//         "--\t--------\t\t------------\t\t----\t\t------\t---------\t---------\t--------\t----------\t----------\t----------\n";
//       const userList = users.map(user =>
//         `${user.id}\t${user.username}\t\t${user.phone_number}\t${user.role}\t\t${user.is_active}\t${user.is_suspended}\t\t${user.can_withdraw}\t${user.wallet.recharge_wallet}\t${user.wallet.commission_wallet}\t${user.invite_code}\t${user.created_at}`
//       ).join('\n');
//       const fullText = `> Users retrieved: ${users.length} entries.\n\n${header}${userList}\n\n> Process completed.`;
//       let i = 0;
//       const typingInterval = setInterval(() => {
//         if (i < fullText.length) {
//           setDisplayedText(prev => prev + fullText.charAt(i));
//           i++;
//         } else {
//           clearInterval(typingInterval);
//         }
//       }, 20);
//       return () => clearInterval(typingInterval);
//     } else if (isError) {
//       setDisplayedText("> ERROR: Firewall detected. Access denied.");
//     }
//   }, [users, isLoading, isError]);

//   useEffect(() => {
//     const cursorInterval = setInterval(() => {
//       setCursorVisible(prev => !prev);
//     }, 500);
//     return () => clearInterval(cursorInterval);
//   }, []);

//   return (
//     <div style={{
//       backgroundColor: '#0a0a0a',
//       color: '#00ff00',
//       fontFamily: '"Courier New", monospace',
//       padding: '20px',
//       height: '100vh',
//       overflow: 'auto',
//       whiteSpace: 'pre',
//       lineHeight: '1.5',
//       position: 'relative',
//       border: '1px solid #00ff00',
//       boxShadow: '0 0 10px #00ff00 inset',
//       animation: 'flicker 0.1s infinite alternate'
//     }}>
//       <style>
//         {`
//           @keyframes flicker {
//             0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 0.9; }
//             20%, 24%, 55% { opacity: 0.6; }
//           }
//         `}
//       </style>
//       <pre style={{ margin: 0 }}>
//         {displayedText}
//         <span style={{ opacity: cursorVisible ? 1 : 0 }}>▮</span>
//       </pre>
//     </div>
//   );
// };

// export default HackedTerminalUsers;
