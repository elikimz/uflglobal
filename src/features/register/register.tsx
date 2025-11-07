import React, { useState, useRef } from "react";
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
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginUser, { isLoading: loggingIn }] = useLoginUserMutation();
  const [signup, { isLoading: signingUp }] = useSignupMutation();
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    password: "",
    invite_code: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();

  const toggleMode = () => {
    setMessage(null);
    setIsLogin((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Decode JWT token to extract role
  const decodeToken = (token: string) => {
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
    } catch {
      return {};
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await loginUser({
        username: formData.username,
        password: formData.password,
      }).unwrap();

      localStorage.setItem("access_token", res.access_token);
      const decoded = decodeToken(res.access_token);
      const role = decoded?.role || "user";

      setMessage({ type: "success", text: "Login successful!" });

      setTimeout(() => {
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }, 1200);
    } catch {
      setMessage({
        type: "error",
        text: "Login failed. Please check your credentials.",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const token = recaptchaRef.current?.getValue() || "";
    if (!token) {
      setMessage({ type: "error", text: "Please complete the reCAPTCHA." });
      return;
    }

    try {
      await signup({ ...formData, recaptcha_token: token }).unwrap();
      setMessage({
        type: "success",
        text: "Registration successful! You can now log in.",
      });
      setTimeout(() => {
        setIsLogin(true);
        recaptchaRef.current?.reset();
      }, 1500);
    } catch {
      setMessage({ type: "error", text: "Signup failed. Please try again." });
    }
  };

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
            src="/ustwo.png"
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

          {/* SaaS-style message box */}
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
