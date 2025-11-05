import React, { useState, useEffect, useRef } from "react";
import { useSignupMutation } from "../register/registerAPI";
import ReCAPTCHA from "react-google-recaptcha";

const Register: React.FC = () => {
  const [signup, { isLoading, isSuccess }] = useSignupMutation();
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    password: "",
    invite_code: "",
    recaptcha_token: localStorage.getItem("recaptcha_token") || "",
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleCaptchaChange = (token: string | null) => {
    const value = token || "";
    setFormData((prev) => ({ ...prev, recaptcha_token: value }));
    if (value) {
      localStorage.setItem("recaptcha_token", value);
    } else {
      localStorage.removeItem("recaptcha_token");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("recaptcha_token");
    if (savedToken) {
      setFormData((prev) => ({ ...prev, recaptcha_token: savedToken }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recaptcha_token) {
      alert("Please verify you are human!");
      return;
    }
    setServerError(null);
    try {
      await signup(formData).unwrap();
      alert("Registration successful!");
      localStorage.removeItem("recaptcha_token");
    } catch (err: any) {
      console.error("Signup failed:", err);
      if (err?.data?.detail) {
        setServerError(err.data.detail);
      } else if (err?.error) {
        setServerError(err.error);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      localStorage.removeItem("recaptcha_token");
      setFormData((prev) => ({ ...prev, recaptcha_token: "" }));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/b/couple-playing-video-games-13658594.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Ensures the background covers the entire viewport
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", // Ensures full viewport height
        width: "100vw", // Ensures full viewport width
      }}
    >
      <div
        className="backdrop-blur-md bg-transparent shadow-2xl rounded-2xl p-8 w-full max-w-md mx-4 border border-white/20"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/150x50?text=Your+Logo"
            alt="Logo"
            className="h-10"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Username
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-white placeholder-white/70 outline-none transition duration-200"
              placeholder="Enter your username"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Phone Number
            </label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-white placeholder-white/70 outline-none transition duration-200"
              placeholder="+254 712 345678"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-white placeholder-white/70 outline-none transition duration-200"
              placeholder="••••••••"
            />
          </div>

          {/* Invite Code */}
          <div>
            <label className="block text-sm font-medium text-white/90 mb-1">
              Invite Code (Optional)
            </label>
            <input
              name="invite_code"
              value={formData.invite_code}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 text-white placeholder-white/70 outline-none transition duration-200"
              placeholder="Enter invite code (if any)"
            />
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center mt-2">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfIBgMsAAAAAFyzXNqSXiI_qk5Tm15lcqrHPgqn"
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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
                Processing...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Success/Error Messages */}
        {isSuccess && (
          <p className="text-green-400 text-sm mt-4 text-center font-medium">
            Registration successful! Welcome aboard.
          </p>
        )}
        {serverError && (
          <p className="text-red-400 text-sm mt-4 text-center font-medium">
            {serverError}
          </p>
        )}

        {/* Footer */}
        <p className="text-white/80 text-xs text-center mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="text-indigo-300 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-300 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
