


import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  TrophyIcon,
  UserIcon,
  NewspaperIcon,
  GiftIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import ustwo1 from "../assets/ustwo1.png";
import ustwo2 from "../assets/ustwo2.png";
import ustwo3 from "../assets/ustwo3.png";
import ustwo4 from "../assets/ustwo4.png";
import spinnerImage from "../components/SpinnerImage.png"
import { useGetUserProfileQuery } from "../features/profile/profileAPI";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  // Fetch user profile
  const { data: userProfile, isLoading } = useGetUserProfileQuery();

  // Unique color for username
  const usernameColor = useMemo(() => {
    const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  // Unique color for level
  const levelColor = useMemo(() => {
    const colors = ["#FBBF24", "#34D399", "#60A5FA", "#F87171", "#A78BFA"];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  const banners = [ustwo1, ustwo2, ustwo3, ustwo4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 70000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleNavigation = (path: string | null) => {
    if (!path) return;
    setIsExiting(true);
    setTimeout(() => navigate(path), 500);
  };

  const handleSpinnerNavigation = () => {
    setIsExiting(true);
    setTimeout(() => navigate("/spinner"), 500);
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

          {/* Header */}
          <div className="relative pt-6 pb-6 text-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg mx-4 mt-4 overflow-hidden">
            {!isLoading && userProfile ? (
              <>
                <h1 className="text-2xl font-bold mb-2 relative z-10">
                  Welcome back{" "}
                  <span style={{ color: usernameColor }}>
                    {userProfile.username}
                  </span>{" "}
                  to UFL
                </h1>
                <p className="text-indigo-100 text-sm relative z-10">
                  Your current level is{" "}
                  <span
                    style={{
                      color: levelColor,
                      fontWeight: "bold",
                    }}
                  >
                    {userProfile.user_levels?.[0]?.name || "---"}
                  </span>
                </p>
              </>
            ) : (
              <h1 className="text-2xl font-bold mb-2 relative z-10">
                Welcome to UFL
              </h1>
            )}
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

          {/* Spinner Image - Clickable */}
          <motion.div
            className="relative mt-8 mb-16 flex justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSpinnerNavigation}
          >
            <img
              src={spinnerImage}
              alt="Click to enter the lottery tour"
              className="w-full max-w-md h-auto rounded-xl cursor-pointer shadow-lg"
            />
          </motion.div>

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









// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   HomeIcon,
//   UsersIcon,
//   TrophyIcon,
//   UserIcon,

//   GiftIcon,

//   ClipboardIcon,
//   FlagIcon,
//   MegaphoneIcon,
//   CurrencyDollarIcon,
//   UserPlusIcon,
//   ChartBarIcon,
// } from "@heroicons/react/24/solid";
// import { motion, AnimatePresence } from "framer-motion";
// import ustwo1 from "../assets/ustwo1.png";
// import ustwo2 from "../assets/ustwo2.png";
// import ustwo3 from "../assets/ustwo3.png";
// import ustwo4 from "../assets/ustwo4.png";
// import spinnerImage from "../components/SpinnerImage.png";
// import badge from "../components/badge.png";
// import { useGetUserProfileQuery } from "../features/profile/profileAPI";

// const UserDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const [, setCurrentBanner] = useState(0);
//   const [isExiting, setIsExiting] = useState(false);
//   const { data: userProfile, isLoading } = useGetUserProfileQuery();

//   // Unique color for username

//   // Unique color for level

//   const banners = [ustwo1, ustwo2, ustwo3, ustwo4];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length);
//     }, 70000);
//     return () => clearInterval(interval);
//   }, [banners.length]);

//   const handleNavigation = (path: string | null) => {
//     if (!path) return;
//     setIsExiting(true);
//     setTimeout(() => navigate(path), 500);
//   };

//   const handleSpinnerNavigation = () => {
//     setIsExiting(true);
//     setTimeout(() => navigate("/spinner"), 500);
//   };

//   return (
//     <AnimatePresence>
//       {!isExiting && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative min-h-screen w-full overflow-hidden text-white pb-20 bg-yellow-50"
//         >
//           {/* Header with level badge */}
//           <div className="relative pt-4 pb-4 px-4">
//             <div className="flex justify-between items-center">
//               <div className="text-xl font-bold text-yellow-800">UFL</div>
//               {/* Level badge with custom image */}
//               {!isLoading && userProfile && (
//                 <div className="relative flex items-center">
//                   {/* Badge image positioned at the corner */}
//                   <div className="w-8 h-8 mr-1">
//                     <img
//                       src={badge}
//                       alt="Level badge"
//                       className="w-full h-full object-contain"
//                     />
//                   </div>
//                   {/* Level area with Lv text */}
//                   <div className="flex items-center gap-1 bg-yellow-400/30 rounded-full px-3 py-1 border-2 border-yellow-500">
//                     <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
//                       Lv
//                     </div>
//                     <span className="text-yellow-800 font-bold pr-2">
//                       {userProfile.user_levels?.[0]?.name || "1"}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//             {/* Welcome message */}
//             {!isLoading && userProfile ? (
//               <div className="mt-2">
//                 <h2 className="text-lg font-medium text-yellow-800">
//                   Welcome to UFL
//                 </h2>
//                 <p className="text-sm text-yellow-700">
//                   Start your work journey
//                 </p>
//               </div>
//             ) : (
//               <div className="mt-2">
//                 <h2 className="text-lg font-medium text-yellow-800">
//                   Welcome to RXM
//                 </h2>
//                 <p className="text-sm text-yellow-700">
//                   Start your work journey
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* MAIN ICON GRID - 3 columns with circular icons */}
//           <div className="grid grid-cols-3 gap-2 px-4 mt-4">
//             {[
//               {
//                 icon: <FlagIcon className="h-6 w-6 text-yellow-600" />,
//                 label: "Company Activities",
//                 path: "/company-activity",
//               },
//               {
//                 icon: <MegaphoneIcon className="h-6 w-6 text-yellow-600" />,
//                 label: "News",
//                 path: "/company-news",
//               },
//               {
//                 icon: <GiftIcon className="h-6 w-6 text-yellow-600" />,
//                 label: "Member Benefits",
//                 path: "/member-benefits",
//               },
//               {
//                 icon: (
//                   <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
//                 ),
//                 label: "Advertising Positions",
//                 path: "/finance",
//               },
//               {
//                 icon: <UserPlusIcon className="h-6 w-6 text-yellow-600" />,
//                 label: "Team Expansion",
//                 path: "/team-management",
//               },
//               {
//                 icon: <ChartBarIcon className="h-6 w-6 text-yellow-600" />,
//                 label: "Financial Management Fund",
//                 path: "/finance",
//               },
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleNavigation(item.path)}
//                 className="flex flex-col items-center justify-center"
//               >
//                 {/* Circular icon container */}
//                 <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-1 shadow-sm border border-yellow-200">
//                   {item.icon}
//                 </div>
//                 <p className="text-xs text-yellow-800 text-center font-medium">
//                   {item.label}
//                 </p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Spinner Image - Clickable */}
//           <motion.div
//             className="relative mt-6 px-4"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleSpinnerNavigation}
//           >
//             <img
//               src={spinnerImage}
//               alt="Click to enter the lottery tour"
//               className="w-full rounded-xl cursor-pointer shadow-lg"
//             />
//           </motion.div>

//           {/* Bottom Navigation */}
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 py-3 z-50"
//           >
//             <div className="grid grid-cols-5">
//               {[
//                 {
//                   path: null,
//                   icon: (
//                     <HomeIcon className="h-6 w-6 mx-auto text-yellow-600" />
//                   ),
//                   label: "Home",
//                 },
//                 {
//                   path: "/task",
//                   icon: (
//                     <ClipboardIcon className="h-6 w-6 mx-auto text-yellow-600" />
//                   ),
//                   label: "Task",
//                 },
//                 {
//                   path: "/referrals",
//                   icon: (
//                     <UsersIcon className="h-6 w-6 mx-auto text-yellow-600" />
//                   ),
//                   label: "Team",
//                 },
//                 {
//                   path: "/levels",
//                   icon: (
//                     <TrophyIcon className="h-6 w-6 mx-auto text-yellow-600" />
//                   ),
//                   label: "Level",
//                 },
//                 {
//                   path: "/profile",
//                   icon: (
//                     <UserIcon className="h-6 w-6 mx-auto text-yellow-600" />
//                   ),
//                   label: "My",
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   onClick={() => handleNavigation(item.path)}
//                   className="flex flex-col items-center text-yellow-800"
//                 >
//                   {item.icon}
//                   <span className="text-xs mt-1">{item.label}</span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default UserDashboard;
