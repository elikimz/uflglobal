





import { useState } from "react";
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
import image from "../assets/image.png";
import badge from "../assets/badge.png";
import { useGetUserProfileQuery } from "../features/profile/profileAPI";
import { useGetLinksQuery } from "../features/whatapplinks/whatappAPI";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const { data: userProfile, isLoading } = useGetUserProfileQuery();
  const { data: links } = useGetLinksQuery();

  const handleNavigation = (path: To | null) => {
    if (!path) return;
    setIsExiting(true);
    setTimeout(() => navigate(path), 500);
  };

  const handleSpinnerNavigation = () => {
    setIsExiting(true);
    setTimeout(() => navigate("/spinner"), 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-100">
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
          className="relative min-h-screen w-full overflow-hidden text-white pb-20"
          style={{
            background: "linear-gradient(to bottom, #FFD700, #FFA500)",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='hexagons' patternUnits='userSpaceOnUse' width='60' height='60'%3E%3Cpath d='M0,0l30,17.32V34.64L0,51.96V0ZM30,0l30,17.32l0,34.64L30,51.96V0Z' fill='%23FFD700' fill-opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23hexagons)'/%3E%3C/svg%3E\")",
          }}
        >
          {/* Header */}
          <div className="relative pt-4 pb-4 px-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-yellow-800">UFL</div>
              {userProfile && (
                <div className="relative flex items-center">
                  <div className="relative">
                    <img
                      src={badge}
                      alt="Level badge"
                      className="w-10 h-10"
                      style={{ position: "relative", zIndex: 1 }}
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs"
                      style={{ zIndex: 2 }}
                    >
                      Lv
                    </div>
                  </div>
                  <div className="ml-2 flex items-center gap-1 bg-yellow-400/30 rounded-full px-3 py-1 border-2 border-yellow-500">
                    <span className="text-yellow-800 font-bold">
                      {userProfile.user_levels?.[0]?.name || "1"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2">
              <h2 className="text-lg font-medium text-yellow-800">
                Welcome to UFL
              </h2>
              <p className="text-sm text-yellow-700">Start your work journey</p>
            </div>
          </div>

          {/* Main Icon Grid */}
          <div className="grid grid-cols-3 gap-4 px-4 mt-4">
            {[
              {
                icon: <FlagIcon className="h-6 w-6 text-yellow-800" />,
                label: "Company Activities",
                path: "/company-activity",
              },
              {
                icon: <MegaphoneIcon className="h-6 w-6 text-yellow-800" />,
                label: "News",
                path: "/company-news",
              },
              {
                icon: <GiftIcon className="h-6 w-6 text-yellow-800" />,
                label: "Member Benefits",
                path: "/member-benefits",
              },
              {
                icon: (
                  <CurrencyDollarIcon className="h-6 w-6 text-yellow-800" />
                ),
                label: "Advertising Positions",
                path: "/sgg",
              },
              {
                icon: <UserPlusIcon className="h-6 w-6 text-yellow-800" />,
                label: "Team Expansion",
                path: "/team-management",
              },
              {
                icon: <ChartBarIcon className="h-6 w-6 text-yellow-800" />,
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
                <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-xs text-yellow-800 text-center font-medium mt-1">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Spinner Image */}
          <motion.div
            className="relative mt-6 px-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSpinnerNavigation}
          >
            <div className="relative">
              <img
                src={image}
                alt="Click to enter the lottery tour"
                className="w-full rounded-xl cursor-pointer shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-2xl font-bold bg-black bg-opacity-50 p-2 rounded">
                  Click here to enter the lottery tour
                </div>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp Links - pushed above bottom nav */}
          {links && links.length > 0 && (
            <div className="fixed bottom-24 right-4 flex flex-col gap-2 z-50">
              {links.map((link) => (
                <div key={link.id} className="flex flex-col gap-2">
                  {link.whatsapp_link && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => window.open(link.whatsapp_link, "_blank")}
                      className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                        alt="WhatsApp"
                        className="h-8 w-8"
                      />
                    </motion.div>
                  )}

                  {link.hiring_manager_link && (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        window.open(link.hiring_manager_link, "_blank")
                      }
                      className="w-14 h-14 rounded-full cursor-pointer shadow-lg overflow-hidden"
                    >
                      <img
                        src="https://i.postimg.cc/V6Yj5m92/hiring.png"
                        alt="Hiring Manager"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Bottom Navigation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 py-3 z-50"
          >
            <div className="grid grid-cols-6">
              {[
                {
                  path: null,
                  icon: <HomeIcon className="h-5 w-5 text-yellow-600" />,
                  label: "Home",
                },
                {
                  path: "/task",
                  icon: <ClipboardIcon className="h-5 w-5 text-yellow-600" />,
                  label: "Task",
                },
                {
                  path: "/referrals",
                  icon: <UsersIcon className="h-5 w-5 text-yellow-600" />,
                  label: "Team",
                },
                {
                  path: "/levels",
                  icon: <TrophyIcon className="h-5 w-5 text-yellow-600" />,
                  label: "Level",
                },
                {
                  path: "/myjoblevels",
                  icon: <TrophyIcon className="h-5 w-5 text-yellow-600" />,
                  label: "My Jobs",
                },
                {
                  path: "/profile",
                  icon: <UserIcon className="h-5 w-5 text-yellow-600" />,
                  label: "My",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleNavigation(item.path)}
                  className="flex flex-col items-center text-yellow-800"
                >
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
                    {item.icon}
                  </div>
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
