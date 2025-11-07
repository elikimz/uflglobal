// src/pages/UserDashboard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ClipboardIcon,
  ChartBarIcon,
  UserIcon,
  ArrowPathIcon,
  GiftIcon,
  CurrencyDollarIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import omini1 from "../assets/omini1.png";
import omini2 from "../assets/omini2.png";
import omini3 from "../assets/omini3.png";
import omini4 from "../assets/omini4.png";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const banners = [omini1, omini2, omini3, omini4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleNavigation = (path: string | null) => {
    if (!path) return;
    setIsExiting(true);
    setTimeout(() => navigate(path), 500);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-fuchsia-600 text-white pb-28 px-4 relative overflow-hidden"
        >
          {/* Soft Glow Background */}
          <div className="absolute inset-0 bg-indigo-200/10 blur-3xl"></div>

          {/* Rotating Banner */}
          <div className="relative h-44 w-full max-w-lg mx-auto overflow-hidden rounded-3xl shadow-2xl mb-8">
            {banners.map((banner, index) => (
              <motion.img
                key={index}
                src={banner}
                alt={`banner-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentBanner ? 1 : 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              />
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="max-w-md mx-auto mb-10 grid grid-cols-3 gap-5 text-center">
            {[
              {
                path: "/paymentsmethods",
                icon: (
                  <CurrencyDollarIcon className="h-5 w-5 text-indigo-100" />
                ),
                label: "Recharge",
              },
              { path: "/withdraw", icon: "💸", label: "Withdraw" },
              {
                path: "/my-investments",
                icon: <ChartBarIcon className="h-5 w-5 text-indigo-100" />,
                label: "Investments",
              },
              {
                path: "/spin",
                icon: <ArrowPathIcon className="h-5 w-5 text-indigo-100" />,
                label: "Spin",
              },
              {
                path: "/giftcode",
                icon: <GiftIcon className="h-5 w-5 text-indigo-100" />,
                label: "Giftcode",
              },
              { path: "/company-profile", icon: "🏢", label: "Company" },
              { path: "/wealth-fund", icon: "📈", label: "Wealth" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="bg-white/20 backdrop-blur-lg border border-white/30 p-4 rounded-2xl shadow-md hover:bg-white/30 transition-all"
                >
                  <div className="text-lg">{item.icon}</div>
                </button>
                <p className="text-xs mt-2 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-800 via-indigo-800 to-fuchsia-700 flex justify-around py-3 border-t border-indigo-400/30 z-50 backdrop-blur-xl"
          >
            {[
              {
                path: null,
                icon: <HomeIcon className="h-6 w-6 text-indigo-100" />,
                label: "Home",
              },
              {
                path: "/tasks",
                icon: <ClipboardIcon className="h-6 w-6 text-indigo-100" />,
                label: "Tasks",
              },
              {
                path: "/levels",
                icon: <TrophyIcon className="h-6 w-6 text-indigo-100" />,
                label: "Levels",
              },
              {
                path: "/profile",
                icon: <UserIcon className="h-6 w-6 text-indigo-100" />,
                label: "Profile",
              },
            ].map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.path)}
                className="flex flex-col items-center px-3"
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserDashboard;
