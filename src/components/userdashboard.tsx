



import  { useState } from "react";
import { useNavigate, type To } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  TrophyIcon,
  UserIcon,
  GiftIcon,
  ClipboardIcon,
  FlagIcon,
  MegaphoneIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import image from "../assets/image.png"
import badge from "../assets/badge.png";
import { useGetUserProfileQuery } from "../features/profile/profileAPI.tsx";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const { data: userProfile, isLoading } = useGetUserProfileQuery();

  const handleNavigation = (path: To | null) => {
    if (!path) return;
    setIsExiting(true);
    setTimeout(() => navigate(path), 500);
  };

  const handleSpinnerNavigation = () => {
    setIsExiting(true);
    setTimeout(() => navigate("/spinner"), 500);
  };

  // Show loading state while data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <p className="text-yellow-800">Loading...</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen w-full overflow-hidden text-white pb-20 bg-yellow-50"
        >
          {/* Header with level badge */}
          <div className="relative pt-4 pb-4 px-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-yellow-800">UFL</div>

              {/* Level badge with custom image */}
              {userProfile && (
                <div className="relative flex items-center">
                  {/* Badge image positioned at the corner */}
                  <div className="w-8 h-8 mr-1">
                    <img
                      src={badge}
                      alt="Level badge"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Level area with Lv text */}
                  <div className="flex items-center gap-1 bg-yellow-400/30 rounded-full px-3 py-1 border-2 border-yellow-500">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      Lv
                    </div>
                    <span className="text-yellow-800 font-bold pr-2">
                      {userProfile.user_levels?.[0]?.name || "1"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Welcome message */}
            <div className="mt-2">
              <h2 className="text-lg font-medium text-yellow-800">
                Welcome to UFL
              </h2>
              <p className="text-sm text-yellow-700">Start your work journey</p>
            </div>
          </div>

          {/* MAIN ICON GRID - 3 columns with circular icons */}
          <div className="grid grid-cols-3 gap-2 px-4 mt-4">
            {[
              {
                icon: <FlagIcon className="h-6 w-6 text-yellow-600" />,
                label: "Company Activities",
                path: "/company-activity",
              },
              {
                icon: <MegaphoneIcon className="h-6 w-6 text-yellow-600" />,
                label: "News",
                path: "/company-news",
              },
              {
                icon: <GiftIcon className="h-6 w-6 text-yellow-600" />,
                label: "Member Benefits",
                path: "/member-benefits",
              },
              {
                icon: (
                  <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
                ),
                label: "Advertising Positions",
                path: "/finance",
              },
              {
                icon: <UserPlusIcon className="h-6 w-6 text-yellow-600" />,
                label: "Team Expansion",
                path: "/team-management",
              },
              {
                icon: <ChartBarIcon className="h-6 w-6 text-yellow-600" />,
                label: "Financial Management Fund",
                path: "/finance",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.path)}
                className="flex flex-col items-center justify-center"
              >
                {/* Circular icon container */}
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-1 shadow-sm border border-yellow-200">
                  {item.icon}
                </div>
                <p className="text-xs text-yellow-800 text-center font-medium">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Spinner Image - Clickable */}
          <motion.div
            className="relative mt-6 px-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSpinnerNavigation}
          >
            <img
              src={image}
              alt="Click to enter the lottery tour"
              className="w-full rounded-xl cursor-pointer shadow-lg"
            />
          </motion.div>

          {/* Bottom Navigation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 py-3 z-50"
          >
            <div className="grid grid-cols-5">
              {[
                {
                  path: null,
                  icon: (
                    <HomeIcon className="h-6 w-6 mx-auto text-yellow-600" />
                  ),
                  label: "Home",
                },
                {
                  path: "/task",
                  icon: (
                    <ClipboardIcon className="h-6 w-6 mx-auto text-yellow-600" />
                  ),
                  label: "Task",
                },
                {
                  path: "/referrals",
                  icon: (
                    <UsersIcon className="h-6 w-6 mx-auto text-yellow-600" />
                  ),
                  label: "Team",
                },
                {
                  path: "/levels",
                  icon: (
                    <TrophyIcon className="h-6 w-6 mx-auto text-yellow-600" />
                  ),
                  label: "Level",
                },
                {
                  path: "/profile",
                  icon: (
                    <UserIcon className="h-6 w-6 mx-auto text-yellow-600" />
                  ),
                  label: "My",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleNavigation(item.path)}
                  className="flex flex-col items-center text-yellow-800"
                >
                  {item.icon}
                  <span className="text-xs mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserDashboard;
