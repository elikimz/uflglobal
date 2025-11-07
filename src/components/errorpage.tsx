import React from "react";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  code?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = "404",
  message = "Oops! The page you're looking for doesn't exist.",
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-indigo-200">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-100 rounded-full inline-block animate-pulse">
            <FiAlertTriangle className="text-indigo-600 text-4xl" />
          </div>
        </div>

        {/* Error Code */}
        <div className="text-6xl font-bold text-indigo-600 mb-4">{code}</div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sorry!</h1>
        <p className="text-gray-600 mb-8">{message}</p>

        {/* Action Button */}
        <button
          onClick={() => navigate("/register")}
          className="flex items-center justify-center mx-auto px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Register
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
