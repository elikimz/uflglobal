// src/component/error.tsx
import React from "react";

interface ErrorPageProps {
  code?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = "❌",
  message = "Oops! Something went wrong.",
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 px-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-lg text-center">
        <div className="text-6xl mb-6 animate-bounce">{code}</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <a
          href="/register"
          className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-600 transition-colors"
        >
          Go to Register
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
