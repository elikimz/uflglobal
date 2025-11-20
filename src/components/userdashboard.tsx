import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  // ClipboardIcon,
  UsersIcon,
  TrophyIcon,
  UserIcon,
  NewspaperIcon,
  GiftIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  // UserPlusIcon,
  ClipboardIcon,
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
    }, 5000); // switch picture every 5 seconds
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
          className="relative min-h-screen w-full overflow-hidden text-white pb-36 px-4"
        >
          {/* Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {banners.map((banner, index) => (
              <motion.img
                key={index}
                src={banner}
                alt={`banner-${index}`}
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: index === currentBanner ? 1 : 0,
                  scale: index === currentBanner ? 1.1 : 1,
                }}
                transition={{
                  opacity: { duration: 1.5 },
                  scale: { duration: 300, ease: "linear" },
                }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ))}
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Header with moving picture */}
          <div className="relative pt-6 pb-6 text-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg mx-4 mt-4 overflow-hidden">
            <h1 className="text-2xl font-bold mb-1 relative z-10">
              Welcome to UFL
            </h1>
            <p className="text-indigo-100 text-sm relative z-10">
              Start Your Work Journey
            </p>

            {/* Moving Picture (left to right) */}
            <motion.img
              src={banners[currentBanner]}
              alt="moving-omini"
              className="absolute bottom-0 w-16 h-16 opacity-80 z-0"
              animate={{ x: ["-50%", "50%", "-50%"] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          </div>

          {/* MAIN ICON GRID */}
          <div className="relative grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
            {[
              { icon: TrophyIcon, label: "Current Level", path: "/levels" },
              {
                icon: BuildingOfficeIcon,
                label: "Company Activity",
                path: "/company-activity",
              },
              {
                icon: NewspaperIcon,
                label: "Company News",
                path: "/company-news",
              },
              {
                icon: GiftIcon,
                label: "Member Benefits",
                path: "/member-benefits",
              },
              {
                icon: UserGroupIcon,
                label: "Team Expansion",
                path: "/team-management",
              },
              {
                icon: BanknotesIcon,
                label: "Financial Management Funds",
                path: "/finance",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavigation(item.path)}
                className="bg-white/15 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 shadow-xl flex flex-col items-center text-center cursor-pointer"
              >
                <item.icon className="h-10 w-10 text-indigo-100 mb-2" />
                <p className="text-sm font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* SECONDARY SPHERE ICONS */}
          <div className="relative mt-10 max-w-md mx-auto flex justify-around px-6">
            {[
              { icon: ArrowUpTrayIcon, label: "Deposit", path: "/deposit" },
              { icon: ArrowDownTrayIcon, label: "Withdraw", path: "/withdraw" },
              // { icon: UserPlusIcon, label: "Referrals", path: "/referrals" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavigation(item.path)}
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg flex flex-col justify-center items-center cursor-pointer"
              >
                <item.icon className="h-8 w-8 text-indigo-100" />
                <p className="text-xs mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>

     
          {/* Bottom Navigation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl flex justify-around py-3 border-t border-white/20 z-50 shadow-lg"
          >
            {[
              {
                path: null,
                icon: <HomeIcon className="h-6 w-6" />,
                label: "Home",
              },
              {
                path: "/task",
                icon: <ClipboardIcon className="h-6 w-6" />,
                label: "Task",
              },
              {
                path: "/referrals",
                icon: <UsersIcon className="h-6 w-6" />,
                label: "Team",
              },
              {
                path: "/levels",
                icon: <TrophyIcon className="h-6 w-6" />,
                label: "Level",
              },
              {
                path: "/myjoblevels",
                icon: <BriefcaseIcon className="h-6 w-6" />,
                label: "My Jobs",
              },
              {
                path: "/profile",
                icon: <UserIcon className="h-6 w-6" />,
                label: "My",
              },
            ].map((item, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.path)}
                className="flex flex-col items-center text-white"
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
