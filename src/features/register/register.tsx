import React, { useState, useEffect } from "react";
import { useSignupMutation } from "../register/registerAPI";
import ReCAPTCHA from "react-google-recaptcha";

const Register: React.FC = () => {
  const [signup, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  // Initialize recaptcha_token from localStorage if it exists
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    password: "",
    invite_code: "",
    recaptcha_token: localStorage.getItem("recaptcha_token") || "",
  });

  // Whenever the recaptcha token changes, store it in localStorage
  const handleCaptchaChange = (token: string | null) => {
    const value = token || "";
    setFormData((prev) => ({ ...prev, recaptcha_token: value }));
    if (value) {
      localStorage.setItem("recaptcha_token", value);
    } else {
      localStorage.removeItem("recaptcha_token");
    }
  };

  // If user refreshes or returns, automatically reuse saved token (if still valid)
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

    try {
      await signup(formData).unwrap();
      alert("Registration successful!");
      localStorage.removeItem("recaptcha_token"); // clear token after success
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Invite Code (Optional)
            </label>
            <input
              name="invite_code"
              value={formData.invite_code}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Google reCAPTCHA */}
          <div className="flex justify-center mt-4">
            <ReCAPTCHA
              sitekey="6LfIBgMsAAAAAFyzXNqSXiI_qk5Tm15lcqrHPgqn"
              onChange={handleCaptchaChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        {isSuccess && (
          <p className="text-green-600 text-sm mt-4 text-center">
            Registration successful!
          </p>
        )}
        {isError && (
          <p className="text-red-600 text-sm mt-4 text-center">
            {error && "An error occurred. Please try again."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
