import React from "react";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Spinner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-6"
    >
      {/* Header with back button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* Main content */}
      <div className="text-center max-w-2xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-yellow-800 mb-6"
        >
          Lottery Tour Coming Soon!
        </motion.h1>

        {/* Spinner graphic */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-64 h-64 mx-auto mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-20"></div>
          <div className="absolute inset-4 bg-yellow-50 rounded-full flex items-center justify-center">
            <div className="text-3xl font-bold text-yellow-700">SPIN</div>
          </div>
          <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
          <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-yellow-700 mb-8 max-w-md mx-auto"
        >
          Get ready for an exciting lottery experience! Our spinning wheel game
          is almost here. Stay tuned for your chance to win amazing prizes!
        </motion.p>

        {/* Countdown placeholder */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-yellow-100 border-2 border-yellow-300 rounded-xl px-8 py-6 mb-8"
        >
          <p className="text-yellow-700 font-semibold">Launching in:</p>
          <p className="text-2xl font-bold text-yellow-800 mt-2">
            Coming Soon!
          </p>
        </motion.div>

        {/* Notification signup */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer inline-block"
        >
          <p className="font-medium"></p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Spinner;
