// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiUser,
//   FiLock,
//   FiCheckCircle,
//   FiXCircle,
//   FiEye,
//   FiEyeOff,
// } from 'react-icons/fi';
// import { useLoginUserMutation } from '../login/loginAPI';
// import { useNavigate, Link } from 'react-router-dom';
// import ustwologo from '../../assets/ustwologo.png';

// interface DecodedToken {
//   role?: string;
//   sub?: string;
//   [key: string]: any;
// }

// interface Message {
//   type: 'success' | 'error';
//   text: string;
// }

// const LoginPage: React.FC = () => {
//   const [loginUser, { isLoading: loggingIn }] = useLoginUserMutation();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [message, setMessage] = useState<Message | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Decode JWT token to extract role and other payload data
//   const decodeToken = (token: string): DecodedToken => {
//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split('')
//           .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//           .join(''),
//       );
//       return JSON.parse(jsonPayload);
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (e) {
//       return {};
//     }
//   };

//   // Handle login form submission
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);
//     try {
//       const res = await loginUser({
//         username: formData.username,
//         password: formData.password,
//       }).unwrap();
//       if (!res.access_token) {
//         throw new Error('No access token received');
//       }
//       // Store the access token
//       localStorage.setItem('access_token', res.access_token);

//       // Decode the token to get the user's role
//       const decoded = decodeToken(res.access_token);
//       const role = decoded?.role || 'user';

//       // Show success message
//       setMessage({ type: 'success', text: 'Login successful!' });

//       // Redirect based on role
//       setTimeout(() => {
//         navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
//       }, 1200);
//     } catch (err: any) {
//       let errorMsg = 'Your account has been suspended. Please contact support.';
//       if (err?.data?.detail) {
//         if (typeof err.data.detail === 'string') {
//           errorMsg = err.data.detail;
//         } else if (Array.isArray(err.data.detail) && err.data.detail[0]?.msg) {
//           errorMsg = err.data.detail[0].msg;
//         }
//       }
//       setMessage({ type: 'error', text: errorMsg });
//     }
//   };

//   // Input field styling
//   const inputClass =
//     'w-full px-4 py-3 pl-12 rounded-full bg-indigo-50 border border-indigo-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden relative">
//       <div className="absolute w-[150%] h-[150%] bg-indigo-100/20 rounded-[50%] -top-1/4 -right-1/4 blur-3xl"></div>
//       <div className="relative w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl flex overflow-hidden backdrop-blur-md border border-indigo-200">
//         {/* Left Image - Desktop */}
//         <motion.div
//           initial={{ x: '-100%', opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.6, ease: 'easeInOut' }}
//           className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"
//         >
//           <img
//             src={ustwologo}
//             alt="Company Logo"
//             className="h-64 drop-shadow-lg"
//           />
//         </motion.div>
//         {/* Right Form */}
//         <div className="w-full md:w-1/2 p-10">
//           {/* Mobile Logo */}
//           <div className="flex justify-center mb-4 md:hidden">
//             <img src={ustwologo} alt="Logo" className="h-14" />
//           </div>
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//             Welcome Back
//           </h2>
//           {/* Message Box */}
//           <AnimatePresence>
//             {message && (
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className={`mb-4 flex items-center gap-2 p-3 rounded-lg text-sm ${
//                   message.type === 'success'
//                     ? 'bg-green-100 text-green-700 border border-green-300'
//                     : 'bg-red-100 text-red-700 border border-red-300'
//                 }`}
//               >
//                 {message.type === 'success' ? <FiCheckCircle /> : <FiXCircle />}
//                 {message.text}
//               </motion.div>
//             )}
//           </AnimatePresence>
//           {/* Login Form */}
//           <motion.form
//             initial={{ opacity: 0, x: 100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             onSubmit={handleLogin}
//             className="space-y-5"
//           >
//             <div className="relative">
//               <FiUser className="absolute left-4 top-3.5 text-indigo-500" />
//               <input
//                 name="username"
//                 placeholder="Phone"
//                 className={inputClass}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="relative">
//               <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Password"
//                 className={inputClass}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-4 top-3.5 text-indigo-500"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <FiEyeOff /> : <FiEye />}
//               </button>
//             </div>
//             <button
//               type="submit"
//               disabled={loggingIn}
//               className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
//             >
//               {loggingIn ? 'Logging in...' : 'Login'}
//             </button>
//           </motion.form>
//           {/* Link to Register */}
//           <p className="text-center text-gray-600 mt-6">
//             Don't have an account?{' '}
//             <Link
//               to="/register"
//               className="text-purple-600 hover:underline font-medium"
//             >
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;






import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiLock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import { useLoginUserMutation } from '../login/loginAPI';
import { useNavigate, Link } from 'react-router-dom';
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

const LoginPage: React.FC = () => {
  const [loginUser, { isLoading: loggingIn }] = useLoginUserMutation();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState<Message | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      return {};
    }
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await loginUser({
        username: formData.username,
        password: formData.password,
      }).unwrap();
      if (!res.access_token) {
        throw new Error('No access token received');
      }
      // Store the access token
      localStorage.setItem('access_token', res.access_token);

      // Decode the token to get the user's role
      const decoded = decodeToken(res.access_token);
      const role = decoded?.role || 'user';

      // Show success message
      setMessage({ type: 'success', text: 'Login successful!' });

      // Redirect based on role
      setTimeout(() => {
        navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }, 1200);
    } catch (err: any) {
      let errorMsg =
        'Login failed. Please check your credentials and try again.';
      // Check if the error response has a 'data' field and a 'message' inside it
      if (err?.data) {
        errorMsg = err.data.message || errorMsg;
      }
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  // Input field styling
  const inputClass =
    'w-full px-4 py-3 pl-12 rounded-full bg-indigo-50 border border-indigo-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden relative">
      <div className="absolute w-[150%] h-[150%] bg-indigo-100/20 rounded-[50%] -top-1/4 -right-1/4 blur-3xl"></div>
      <div className="relative w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl flex overflow-hidden backdrop-blur-md border border-indigo-200">
        {/* Left Image - Desktop */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"
        >
          <img
            src={ustwologo}
            alt="Company Logo"
            className="h-64 drop-shadow-lg"
          />
        </motion.div>
        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-4 md:hidden">
            <img src={ustwologo} alt="Logo" className="h-14" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
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
          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleLogin}
            className="space-y-5"
          >
            <div className="relative">
              <FiUser className="absolute left-4 top-3.5 text-indigo-500" />
              <input
                name="username"
                placeholder="Phone"
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
          {/* Link to Register */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-purple-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
