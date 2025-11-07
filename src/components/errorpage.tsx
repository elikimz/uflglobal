// src/components/errorpage.tsx
import React from "react";
import { motion } from "framer-motion";

interface ErrorPageProps {
  code?: string;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  code = "🚧",
  message = "We're working hard to fix this. Please check back soon!",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Soft glowing circles for depth */}
      <div className="absolute w-[120%] h-[120%] bg-white/10 rounded-full blur-3xl -top-1/3 -left-1/4"></div>
      <div className="absolute w-[120%] h-[120%] bg-white/10 rounded-full blur-3xl bottom-[-30%] right-[-20%]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/90 backdrop-blur-md border border-indigo-200 shadow-2xl rounded-3xl p-10 max-w-lg w-[90%] text-center"
      >
        {/* Optional illustration */}
        <motion.img
          src="/error-illustration.svg"
          alt="Friendly Error Illustration"
          className="w-56 mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onError={(e) => {
            // fallback if image missing
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        {/* Error Code / Emoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="text-6xl mb-3"
        >
          {code}
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">{message}</p>

        {/* Button */}
        <motion.a
          href="/register"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg transition"
        >
          Back to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
