// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   HomeIcon,
//   ClipboardIcon,
//   UsersIcon,
//   TrophyIcon,
//   UserIcon,
//   MegaphoneIcon,
//   NewspaperIcon,
//   GiftIcon,
//   BuildingOfficeIcon,
//   BanknotesIcon,
//   UserGroupIcon,
// } from "@heroicons/react/24/solid";
// import { motion, AnimatePresence } from "framer-motion";
// import omini1 from "../assets/omini1.png";
// import omini2 from "../assets/omini2.png";
// import omini3 from "../assets/omini3.png";
// import omini4 from "../assets/omini4.png";

// const UserDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const [currentBanner, setCurrentBanner] = useState(0);
//   const [isExiting, setIsExiting] = useState(false);
//   const banners = [omini1, omini2, omini3, omini4];

//   useEffect(() => {
//     // Change banner every 5 minutes = 300000 ms
//     const interval = setInterval(() => {
//       setCurrentBanner((prev) => (prev + 1) % banners.length);
//     }, 300000);

//     return () => clearInterval(interval);
//   }, [banners.length]);

//   const handleNavigation = (path: string | null) => {
//     if (!path) return;
//     setIsExiting(true);
//     setTimeout(() => navigate(path), 500);
//   };

//   // Mock Data
//   const currentLevel = {
//     level: "Bronze",
//     progress: 65,
//     nextLevel: "Silver",
//     requirements: "Invite 5 more members",
//   };
//   const companyActivity = [
//     { id: 1, activity: "New product launch", time: "2 hours ago" },
//     { id: 2, activity: "System maintenance completed", time: "1 day ago" },
//     { id: 3, activity: "Bonus distribution", time: "3 days ago" },
//   ];
//   const companyNews = [
//     { id: 1, title: "New Membership Tiers", date: "2023-11-15" },
//     { id: 2, title: "Holiday Bonus Announcement", date: "2023-11-10" },
//     { id: 3, title: "Mobile App Update", date: "2023-11-05" },
//   ];
//   const memberBenefits = [
//     { id: 1, benefit: "Cashback Rewards", value: "Up to 15%" },
//     { id: 2, benefit: "Exclusive Training", value: "Weekly webinars" },
//     { id: 3, benefit: "Health Insurance", value: "Basic coverage" },
//   ];
//   const advertisingPositions = [
//     {
//       id: 1,
//       position: "Homepage Banner",
//       status: "Available",
//       earnings: "$500",
//     },
//     {
//       id: 2,
//       position: "Newsletter Feature",
//       status: "Taken",
//       earnings: "$300",
//     },
//   ];
//   const teamExpansion = {
//     currentMembers: 12,
//     growthThisMonth: 4,
//     potentialEarnings: "$1,200",
//   };
//   const financialFunds = {
//     availableBalance: "$2,450.75",
//     pendingWithdrawals: "$150.00",
//     totalInvested: "$8,200.00",
//   };

//   return (
//     <AnimatePresence>
//       {!isExiting && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.6 }}
//           className="relative min-h-screen w-full overflow-hidden text-white pb-20 px-4"
//         >
//           {/* === Full-Page Background with Ken Burns Effect === */}
//           <div className="absolute inset-0 w-full h-full overflow-hidden">
//             {banners.map((banner, index) => (
//               <motion.img
//                 key={index}
//                 src={banner}
//                 alt={`background-${index}`}
//                 initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
//                 animate={{
//                   opacity: index === currentBanner ? 1 : 0,
//                   scale: index === currentBanner ? 1.1 : 1,
//                   x: index === currentBanner ? "-2%" : 0,
//                   y: index === currentBanner ? "-1%" : 0,
//                 }}
//                 transition={{
//                   opacity: { duration: 1.5 },
//                   scale: { duration: 300, ease: "linear" }, // 5 minutes smooth zoom
//                   x: { duration: 300, ease: "linear" },
//                   y: { duration: 300, ease: "linear" },
//                 }}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//             ))}
//             <div className="absolute inset-0 bg-black/40" />{" "}
//             {/* Dark overlay for readability */}
//           </div>

//           {/* === Header === */}
//           <div className="relative pt-6 pb-4 text-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg mx-4 mt-4">
//             <h1 className="text-2xl font-bold mb-1">Welcome to UFL</h1>
//             <p className="text-indigo-100 text-sm">Start Your Work Journey</p>
//           </div>

//           {/* === Dashboard Sections === */}
//           <div className="relative space-y-6 max-w-md mx-auto mt-6 mb-20">
//             {[
//               {
//                 title: "Current Level",
//                 icon: <TrophyIcon className="h-5 w-5 text-indigo-100" />,
//                 content: (
//                   <>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span>{currentLevel.level}</span>
//                       <span>{currentLevel.nextLevel}</span>
//                     </div>
//                     <div className="w-full bg-white/20 rounded-full h-2.5">
//                       <div
//                         className="bg-indigo-400 h-2.5 rounded-full"
//                         style={{ width: `${currentLevel.progress}%` }}
//                       />
//                     </div>
//                     <p className="text-xs text-indigo-100 mt-1">
//                       {currentLevel.requirements}
//                     </p>
//                   </>
//                 ),
//               },
//               {
//                 title: "Company Activity",
//                 icon: (
//                   <BuildingOfficeIcon className="h-5 w-5 text-indigo-100" />
//                 ),
//                 content: (
//                   <div className="space-y-2">
//                     {companyActivity.map((activity) => (
//                       <div key={activity.id} className="text-sm">
//                         <div className="flex justify-between">
//                           <span>{activity.activity}</span>
//                           <span className="text-indigo-100 text-xs">
//                             {activity.time}
//                           </span>
//                         </div>
//                         {activity.id !== companyActivity.length && (
//                           <div className="border-b border-white/20 my-1" />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ),
//               },
//               {
//                 title: "Company News",
//                 icon: <NewspaperIcon className="h-5 w-5 text-indigo-100" />,
//                 content: (
//                   <div className="space-y-2">
//                     {companyNews.map((news) => (
//                       <div key={news.id} className="text-sm">
//                         <div className="font-medium">{news.title}</div>
//                         <div className="text-indigo-100 text-xs">
//                           {news.date}
//                         </div>
//                         {news.id !== companyNews.length && (
//                           <div className="border-b border-white/20 my-1" />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ),
//               },
//               {
//                 title: "Member Benefits",
//                 icon: <GiftIcon className="h-5 w-5 text-indigo-100" />,
//                 content: (
//                   <div className="space-y-2">
//                     {memberBenefits.map((benefit) => (
//                       <div
//                         key={benefit.id}
//                         className="flex justify-between text-sm"
//                       >
//                         <span>{benefit.benefit}</span>
//                         <span className="text-indigo-100">{benefit.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 ),
//               },
//               {
//                 title: "Advertising Positions",
//                 icon: <MegaphoneIcon className="h-5 w-5 text-indigo-100" />,
//                 content: (
//                   <div className="space-y-2">
//                     {advertisingPositions.map((position) => (
//                       <div key={position.id} className="text-sm">
//                         <div className="flex justify-between">
//                           <span>{position.position}</span>
//                           <span
//                             className={`text-xs ${
//                               position.status === "Available"
//                                 ? "text-green-400"
//                                 : "text-red-400"
//                             }`}
//                           >
//                             {position.status}
//                           </span>
//                         </div>
//                         <div className="text-indigo-100 text-xs">
//                           Potential: {position.earnings}
//                         </div>
//                         {position.id !== advertisingPositions.length && (
//                           <div className="border-b border-white/20 my-1" />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ),
//               },
//               {
//                 title: "Team Expansion",
//                 icon: <UserGroupIcon className="h-5 w-5 text-indigo-100" />,
//                 content: (
//                   <div className="grid grid-cols-3 text-center">
//                     <div>
//                       <div className="text-lg font-medium">
//                         {teamExpansion.currentMembers}
//                       </div>
//                       <div className="text-xs text-indigo-100">Members</div>
//                     </div>
//                     <div>
//                       <div className="text-lg font-medium">
//                         +{teamExpansion.growthThisMonth}
//                       </div>
//                       <div className="text-xs text-indigo-100">This Month</div>
//                     </div>
//                     <div>
//                       <div className="text-lg font-medium">
//                         {teamExpansion.potentialEarnings}
//                       </div>
//                       <div className="text-xs text-indigo-100">Potential</div>
//                     </div>
//                   </div>
//                 ),
//               },
//               {
//                 title: "Financial Management",
//                 icon: <BanknotesIcon className="h-5 w-5 text-indigo-100" />,
//                 content: (
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span>Available Balance</span>
//                       <span>{financialFunds.availableBalance}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Pending Withdrawals</span>
//                       <span>{financialFunds.pendingWithdrawals}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Total Invested</span>
//                       <span>{financialFunds.totalInvested}</span>
//                     </div>
//                   </div>
//                 ),
//               },
//             ].map((section, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="bg-white/15 backdrop-blur-2xl rounded-2xl p-4 border border-white/30 shadow-xl"
//               >
//                 <div className="flex items-center justify-between mb-3">
//                   <h2 className="text-lg font-semibold">{section.title}</h2>
//                   {section.icon}
//                 </div>
//                 {section.content}
//               </motion.div>
//             ))}
//           </div>

//           {/* === Bottom Navigation === */}
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl flex justify-around py-3 border-t border-white/20 z-50 shadow-lg"
//           >
//             {[
//               {
//                 path: null,
//                 icon: <HomeIcon className="h-6 w-6" />,
//                 label: "Home",
//               },
//               {
//                 path: "/deposit",
//                 icon: <ClipboardIcon className="h-6 w-6" />,
//                 label: "Task",
//               },
//               {
//                 path: "/team-management",
//                 icon: <UsersIcon className="h-6 w-6" />,
//                 label: "Team",
//               },
//               {
//                 path: "/levels",
//                 icon: <TrophyIcon className="h-6 w-6" />,
//                 label: "Level",
//               },
//               {
//                 path: "/profile",
//                 icon: <UserIcon className="h-6 w-6" />,
//                 label: "My",
//               },
//             ].map((item, i) => (
//               <motion.button
//                 key={i}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleNavigation(item.path)}
//                 className="flex flex-col items-center text-white"
//               >
//                 {item.icon}
//                 <span className="text-xs mt-1">{item.label}</span>
//               </motion.button>
//             ))}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default UserDashboard;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ClipboardIcon,
  UsersIcon,
  TrophyIcon,
  UserIcon,
 
  NewspaperIcon,
  GiftIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  UserGroupIcon,
  BriefcaseIcon, // 🆕 New Icon
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
    }, 300000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleNavigation = (path: string | null) => {
    if (!path) return;
    setIsExiting(true);
    setTimeout(() => navigate(path), 500);
  };

  // --- Mock Data ---
  const currentLevel = {
    level: "Bronze",
    progress: 65,
    nextLevel: "Silver",
    requirements: "Invite 5 more members",
  };
  const companyActivity = [
    { id: 1, activity: "New product launch", time: "2 hours ago" },
    { id: 2, activity: "System maintenance completed", time: "1 day ago" },
    { id: 3, activity: "Bonus distribution", time: "3 days ago" },
  ];
  const companyNews = [
    { id: 1, title: "New Membership Tiers", date: "2023-11-15" },
    { id: 2, title: "Holiday Bonus Announcement", date: "2023-11-10" },
    { id: 3, title: "Mobile App Update", date: "2023-11-05" },
  ];
  const memberBenefits = [
    { id: 1, benefit: "Cashback Rewards", value: "Up to 15%" },
    { id: 2, benefit: "Exclusive Training", value: "Weekly webinars" },
    { id: 3, benefit: "Health Insurance", value: "Basic coverage" },
  ];
  const teamExpansion = {
    currentMembers: 12,
    growthThisMonth: 4,
    potentialEarnings: "$1,200",
  };
  const financialFunds = {
    availableBalance: "$2,450.75",
    pendingWithdrawals: "$150.00",
    totalInvested: "$8,200.00",
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen w-full overflow-hidden text-white pb-20 px-4"
        >
          {/* === Animated Background === */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {banners.map((banner, index) => (
              <motion.img
                key={index}
                src={banner}
                alt={`background-${index}`}
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

          {/* === Header === */}
          <div className="relative pt-6 pb-4 text-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg mx-4 mt-4">
            <h1 className="text-2xl font-bold mb-1">Welcome to UFL</h1>
            <p className="text-indigo-100 text-sm">Start Your Work Journey</p>
          </div>

          {/* === Dashboard Cards === */}
          <div className="relative space-y-6 max-w-md mx-auto mt-6 mb-20">
            {/* Rendered Sections */}
            {[
              {
                title: "Current Level",
                icon: <TrophyIcon className="h-5 w-5 text-indigo-100" />,
                content: (
                  <>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{currentLevel.level}</span>
                      <span>{currentLevel.nextLevel}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div
                        className="bg-indigo-400 h-2.5 rounded-full"
                        style={{ width: `${currentLevel.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-indigo-100 mt-1">
                      {currentLevel.requirements}
                    </p>
                  </>
                ),
              },
              {
                title: "Company Activity",
                icon: (
                  <BuildingOfficeIcon className="h-5 w-5 text-indigo-100" />
                ),
                content: (
                  <div className="space-y-2">
                    {companyActivity.map((activity) => (
                      <div key={activity.id} className="text-sm">
                        <div className="flex justify-between">
                          <span>{activity.activity}</span>
                          <span className="text-indigo-100 text-xs">
                            {activity.time}
                          </span>
                        </div>
                        {activity.id !== companyActivity.length && (
                          <div className="border-b border-white/20 my-1" />
                        )}
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: "Company News",
                icon: <NewspaperIcon className="h-5 w-5 text-indigo-100" />,
                content: (
                  <div className="space-y-2">
                    {companyNews.map((news) => (
                      <div key={news.id} className="text-sm">
                        <div className="font-medium">{news.title}</div>
                        <div className="text-indigo-100 text-xs">
                          {news.date}
                        </div>
                        {news.id !== companyNews.length && (
                          <div className="border-b border-white/20 my-1" />
                        )}
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: "Member Benefits",
                icon: <GiftIcon className="h-5 w-5 text-indigo-100" />,
                content: (
                  <div className="space-y-2">
                    {memberBenefits.map((benefit) => (
                      <div
                        key={benefit.id}
                        className="flex justify-between text-sm"
                      >
                        <span>{benefit.benefit}</span>
                        <span className="text-indigo-100">{benefit.value}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: "Team Expansion",
                icon: <UserGroupIcon className="h-5 w-5 text-indigo-100" />,
                content: (
                  <div className="grid grid-cols-3 text-center">
                    <div>
                      <div className="text-lg font-medium">
                        {teamExpansion.currentMembers}
                      </div>
                      <div className="text-xs text-indigo-100">Members</div>
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        +{teamExpansion.growthThisMonth}
                      </div>
                      <div className="text-xs text-indigo-100">This Month</div>
                    </div>
                    <div>
                      <div className="text-lg font-medium">
                        {teamExpansion.potentialEarnings}
                      </div>
                      <div className="text-xs text-indigo-100">Potential</div>
                    </div>
                  </div>
                ),
              },
              {
                title: "Financial Management",
                icon: <BanknotesIcon className="h-5 w-5 text-indigo-100" />,
                content: (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Available Balance</span>
                      <span>{financialFunds.availableBalance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending Withdrawals</span>
                      <span>{financialFunds.pendingWithdrawals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Invested</span>
                      <span>{financialFunds.totalInvested}</span>
                    </div>
                  </div>
                ),
              },
            ].map((section, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/15 backdrop-blur-2xl rounded-2xl p-4 border border-white/30 shadow-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  {section.icon}
                </div>
                {section.content}
              </motion.div>
            ))}
          </div>

          {/* === Bottom Navigation === */}
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
                path: "/deposit",
                icon: <ClipboardIcon className="h-6 w-6" />,
                label: "Task",
              },
              {
                path: "/team-management",
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
              }, // 🆕 Added
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
