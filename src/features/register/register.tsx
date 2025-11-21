


// import React, { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiUser,
//   FiLock,
//   FiPhone,
//   FiTag,
//   FiCheckCircle,
//   FiXCircle,
// } from "react-icons/fi";
// import ReCAPTCHA from "react-google-recaptcha";
// import { useLoginUserMutation } from "../login/loginAPI";
// import { useSignupMutation } from "../register/registerAPI";
// import { useNavigate } from "react-router-dom";

// // Define types for the decoded token and message
// interface DecodedToken {
//   role?: string;
//   sub?: string;
//   [key: string]: any;
// }

// interface Message {
//   type: "success" | "error";
//   text: string;
// }



// const AuthPage: React.FC = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loginUser, { isLoading: loggingIn }] = useLoginUserMutation();
//   const [signup, { isLoading: signingUp }] = useSignupMutation();
//   const [formData, setFormData] = useState({
//     username: "",
//     phone_number: "",
//     password: "",
//     invite_code: "",
//   });
//   const [message, setMessage] = useState<Message | null>(null);
//   const recaptchaRef = useRef<ReCAPTCHA>(null);
//   const navigate = useNavigate();

//   // Toggle between login and signup forms
//   const toggleMode = () => {
//     setMessage(null);
//     setIsLogin((prev) => !prev);
//   };

//   // Handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Decode JWT token to extract role and other payload data
//   const decodeToken = (token: string): DecodedToken => {
//     try {
//       const base64Url = token.split(".")[1];
//       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split("")
//           .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//           .join("")
//       );
//       return JSON.parse(jsonPayload);
//     } catch (e) {
//       console.error("Failed to decode token:", e);
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

//       // Store the access token
//       localStorage.setItem("access_token", res.access_token);

//       // Decode the token to get the user's role
//       const decoded = decodeToken(res.access_token);
//       const role = decoded?.role || "user";

//       // Show success message
//       setMessage({ type: "success", text: "Login successful!" });

//       // Redirect based on role
//       setTimeout(() => {
//         navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
//       }, 1200);
//     } catch (err: any) {
//       let errorMsg = "Login failed. Please check your credentials.";
//       if (err?.data?.detail) {
//         if (typeof err.data.detail === "string") {
//           errorMsg = err.data.detail;
//         } else if (Array.isArray(err.data.detail) && err.data.detail[0]?.msg) {
//           errorMsg = err.data.detail[0].msg;
//         }
//       }
//       setMessage({ type: "error", text: errorMsg });
//     }
//   };

//   // Handle signup form submission
//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);
//     const token = recaptchaRef.current?.getValue() || "";
//     if (!token) {
//       setMessage({ type: "error", text: "Please complete the reCAPTCHA." });
//       return;
//     }
//     try {
//       // Register the user
//       await signup({ ...formData, recaptcha_token: token }).unwrap();

//       // Auto-login after successful registration
//       const loginRes = await loginUser({
//         username: formData.username,
//         password: formData.password,
//       }).unwrap();

//       // Store the access token
//       localStorage.setItem("access_token", loginRes.access_token);

//       // Decode the token to get the user's role
//       const decoded = decodeToken(loginRes.access_token);
//       const role = decoded?.role || "user";

//       // Show success message
//       setMessage({
//         type: "success",
//         text: "Registration successful! Redirecting...",
//       });

//       // Redirect based on role
//       setTimeout(() => {
//         navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
//       }, 1200);
//     } catch (err: any) {
//       let errorMsg = "Signup failed. Please try again.";
//       if (err?.data?.detail) {
//         if (typeof err.data.detail === "string") {
//           errorMsg = err.data.detail;
//         } else if (Array.isArray(err.data.detail) && err.data.detail[0]?.msg) {
//           errorMsg = err.data.detail[0].msg;
//         }
//       }
//       setMessage({ type: "error", text: errorMsg });
//       recaptchaRef.current?.reset();
//     }
//   };

//   // Input field styling
//   const inputClass =
//     "w-full px-4 py-3 pl-12 rounded-full bg-indigo-50 border border-indigo-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden relative">
//       <div className="absolute w-[150%] h-[150%] bg-indigo-100/20 rounded-[50%] -top-1/4 -right-1/4 blur-3xl"></div>
//       <div className="relative w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl flex overflow-hidden backdrop-blur-md border border-indigo-200">
//         {/* Left Image */}
//         <motion.div
//           key={isLogin ? "loginImage" : "registerImage"}
//           initial={{ x: isLogin ? "-100%" : "100%", opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: isLogin ? "100%" : "-100%", opacity: 0 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"
//         >
//           <img
//             src="/ustwo.png"
//             alt="Company Logo"
//             className="h-48 drop-shadow-lg"
//           />
//         </motion.div>

//         {/* Right Form */}
//         <div className="w-full md:w-1/2 p-10">
//           <div className="flex justify-center mb-4 md:hidden">
//             <img src="/ustwo.png" alt="Logo" className="h-14" />
//           </div>
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//             {isLogin ? "Welcome Back" : "Create Your Account"}
//           </h2>

//           {/* Message Box */}
//           <AnimatePresence>
//             {message && (
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className={`mb-4 flex items-center gap-2 p-3 rounded-lg text-sm ${
//                   message.type === "success"
//                     ? "bg-green-100 text-green-700 border border-green-300"
//                     : "bg-red-100 text-red-700 border border-red-300"
//                 }`}
//               >
//                 {message.type === "success" ? <FiCheckCircle /> : <FiXCircle />}
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
//                   <FiUser className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     name="username"
//                     placeholder="Username or Phone"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={loggingIn}
//                   className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
//                 >
//                   {loggingIn ? "Logging in..." : "Login"}
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
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className={inputClass}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="relative">
//                   <FiTag className="absolute left-4 top-3.5 text-indigo-500" />
//                   <input
//                     name="invite_code"
//                     placeholder="Invite Code (optional)"
//                     className={inputClass}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="flex justify-center">
//                   <ReCAPTCHA
//                     ref={recaptchaRef}
//                     sitekey="6LfIBgMsAAAAAFyzXNqSXiI_qk5Tm15lcqrHPgqn"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={signingUp}
//                   className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
//                 >
//                   {signingUp ? "Registering..." : "Create Account"}
//                 </button>
//               </motion.form>
//             )}
//           </AnimatePresence>

//           {/* Toggle between login and signup */}
//           <p className="text-center text-gray-600 mt-6">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//             <button
//               onClick={toggleMode}
//               className="text-purple-600 hover:underline font-medium"
//             >
//               {isLogin ? "Register" : "Login"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;



import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiPhone,
  FiTag,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";
import { useLoginUserMutation } from "../login/loginAPI";
import { useSignupMutation } from "../register/registerAPI";
import { useNavigate, useSearchParams } from "react-router-dom";

interface DecodedToken {
  role?: string;
  sub?: string;
  [key: string]: any;
}

interface Message {
  type: "success" | "error";
  text: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false); // Changed to false to show registration first
  const [loginUser, { isLoading: loggingIn }] = useLoginUserMutation();
  const [signup, { isLoading: signingUp }] = useSignupMutation();
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    password: "",
    invite_code: "",
  });
  const [message, setMessage] = useState<Message | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract invite code from URL
  useEffect(() => {
    const inviteCode = searchParams.get("invite_code");
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
  };

  // Decode JWT token to extract role and other payload data
  const decodeToken = (token: string): DecodedToken => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode token:", e);
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
      // Store the access token
      localStorage.setItem("access_token", res.access_token);
      // Decode the token to get the user's role
      const decoded = decodeToken(res.access_token);
      const role = decoded?.role || "user";
      // Show success message
      setMessage({ type: "success", text: "Login successful!" });
      // Redirect based on role
      setTimeout(() => {
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }, 1200);
    } catch (err: any) {
      let errorMsg = "Login failed. Please check your credentials.";
      if (err?.data?.detail) {
        if (typeof err.data.detail === "string") {
          errorMsg = err.data.detail;
        } else if (Array.isArray(err.data.detail) && err.data.detail[0]?.msg) {
          errorMsg = err.data.detail[0].msg;
        }
      }
      setMessage({ type: "error", text: errorMsg });
    }
  };

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const token = recaptchaRef.current?.getValue() || "";
    if (!token) {
      setMessage({ type: "error", text: "Please complete the reCAPTCHA." });
      return;
    }
    try {
      // Register the user
      await signup({ ...formData, recaptcha_token: token }).unwrap();
      // Auto-login after successful registration
      const loginRes = await loginUser({
        username: formData.username,
        password: formData.password,
      }).unwrap();
      // Store the access token
      localStorage.setItem("access_token", loginRes.access_token);
      // Decode the token to get the user's role
      const decoded = decodeToken(loginRes.access_token);
      const role = decoded?.role || "user";
      // Show success message
      setMessage({
        type: "success",
        text: "Registration successful! Redirecting...",
      });
      // Redirect based on role
      setTimeout(() => {
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }, 1200);
    } catch (err: any) {
      let errorMsg = "Signup failed. Please try again.";
      if (err?.data?.detail) {
        if (typeof err.data.detail === "string") {
          errorMsg = err.data.detail;
        } else if (Array.isArray(err.data.detail) && err.data.detail[0]?.msg) {
          errorMsg = err.data.detail[0].msg;
        }
      }
      setMessage({ type: "error", text: errorMsg });
      recaptchaRef.current?.reset();
    }
  };

  // Input field styling
  const inputClass =
    "w-full px-4 py-3 pl-12 rounded-full bg-indigo-50 border border-indigo-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden relative">
      <div className="absolute w-[150%] h-[150%] bg-indigo-100/20 rounded-[50%] -top-1/4 -right-1/4 blur-3xl"></div>
      <div className="relative w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl flex overflow-hidden backdrop-blur-md border border-indigo-200">
        {/* Left Image */}
        <motion.div
          key={isLogin ? "loginImage" : "registerImage"}
          initial={{ x: isLogin ? "-100%" : "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: isLogin ? "100%" : "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600"
        >
          <img
            src="/ustwologo.png"
            alt="Company Logo"
            className="h-48 drop-shadow-lg"
          />
        </motion.div>
        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10">
          <div className="flex justify-center mb-4 md:hidden">
            <img src="/ustwo.png" alt="Logo" className="h-14" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>
          {/* Message Box */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-4 flex items-center gap-2 p-3 rounded-lg text-sm ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {message.type === "success" ? <FiCheckCircle /> : <FiXCircle />}
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
                  <FiUser className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    name="username"
                    placeholder="Username or Phone"
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loggingIn}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
                >
                  {loggingIn ? "Logging in..." : "Login"}
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={inputClass}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <FiTag className="absolute left-4 top-3.5 text-indigo-500" />
                  <input
                    name="invite_code"
                    placeholder="Invite Code (optional)"
                    className={inputClass}
                    onChange={handleChange}
                    value={formData.invite_code}
                    readOnly={!!formData.invite_code} // Make it read-only if it has a value from URL
                  />
                </div>
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LfIBgMsAAAAAFyzXNqSXiI_qk5Tm15lcqrHPgqn"
                  />
                </div>
                <button
                  type="submit"
                  disabled={signingUp}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition"
                >
                  {signingUp ? "Registering..." : "Create Account"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {/* Toggle between login and signup */}
          <p className="text-center text-gray-600 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-purple-600 hover:underline font-medium"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
