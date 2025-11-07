import React, { useState } from "react";
import { useLoginUserMutation } from "../login/loginAPI";
import { FiUser, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    try {
      const res = await loginUser(formData).unwrap();
      localStorage.setItem("access_token", res.access_token);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/dashboard"); // redirect after login
      }, 1500);
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err?.data?.detail) {
        setServerError(err.data.detail);
      } else if (err?.error) {
        setServerError(err.error);
      } else {
        setServerError("Invalid username or password.");
      }
    }
  };

  const inputClass =
    "w-full px-4 py-3 pl-12 rounded-full bg-indigo-50 border border-indigo-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-indigo-50 rounded-xl p-8 shadow-xl border border-indigo-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/ustwo.png" alt="Logo" className="h-16" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        {/* Success Notification */}
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
            Login successful! Redirecting...
          </div>
        )}

        {/* Error Notification */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username or Phone
            </label>
            <div className="relative">
              <FiUser className="absolute left-4 top-3.5 text-indigo-500" />
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Enter your username or phone number"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-3.5 text-indigo-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-colors disabled:opacity-70"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-gray-600 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 hover:underline font-medium"
          >
            Create one
          </Link>
        </p>

        {/* Footer */}
        <p className="text-gray-500 text-xs text-center mt-4">
          © {new Date().getFullYear()} Ustwo. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
