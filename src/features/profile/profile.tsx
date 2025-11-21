

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   UserIcon,
//   WalletIcon,
//   BanknotesIcon,
//   ArrowRightOnRectangleIcon,
//   LockClosedIcon,
// } from "@heroicons/react/24/solid";
// import { useGetUserProfileQuery } from "../profile/profileAPI";
// import ustwoLogo from "../register/ustwologo.png"

// const Profile: React.FC = () => {
//   const navigate = useNavigate();
//   const { data: profile, isLoading, error } = useGetUserProfileQuery();

//   useEffect(() => {
//     console.log("User profile data:", profile);
//   }, [profile]);

//   if (isLoading)
//     return <p className="text-yellow-800 text-center mt-10">Loading...</p>;
//   if (error)
//     return (
//       <p className="text-red-500 text-center mt-10">Error loading profile.</p>
//     );

//   // Determine current level
//   const currentLevel =
//     profile?.level?.name ?? profile?.user_levels?.[0]?.name ?? "N/A";

//   // Level color/gradient map
//   const levelStyles: Record<string, string> = {
//     Bronze: "bg-amber-700 text-white",
//     Silver: "bg-gray-400 text-gray-900",
//     Gold: "bg-yellow-500 text-gray-900",
//     Platinum:
//       "bg-gradient-to-r from-purple-500 to-indigo-600 text-white animate-pulse",
//     Diamond:
//       "bg-gradient-to-r from-blue-400 to-cyan-500 text-white animate-pulse",
//     "N/A": "bg-gray-700 text-gray-300",
//   };
//   const levelClass = levelStyles[currentLevel] || levelStyles["N/A"];

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     navigate("/register");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen px-4 py-6 text-yellow-900 bg-yellow-50"
//     >
//       {/* Company Logo at the top */}
//       <div className="flex justify-center mb-8">
//         <img
//           src={ustwoLogo}
//           alt="Company Logo"
//           className="h-20 drop-shadow-lg"
//         />
//       </div>

//       {/* Profile Information */}
//       <section className="max-w-4xl mx-auto mb-10">
//         <div className="bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-6 rounded-2xl shadow">
//           <div className="space-y-3 text-yellow-700">
//             <p>
//               Phone:{" "}
//               <span className="font-semibold">{profile?.phone_number}</span>
//             </p>
//             <p>
//               ID:{" "}
//               <span className="font-semibold">{profile?.id}</span>
//             </p>
//             <p className="flex items-center gap-2">
//               Level:{" "}
//               <span
//                 className={`px-4 py-1 rounded-full font-semibold ${levelClass} shadow-lg`}
//               >
//                 {currentLevel}
//               </span>
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Wallet Overview */}
//       <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         <div className="bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-6 rounded-2xl shadow">
//           <h2 className="text-lg font-semibold mb-4 text-yellow-800">
//             Wallet Overview
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-yellow-50 backdrop-blur-xl border border-yellow-200 p-4 rounded-2xl shadow flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-yellow-800">
//                   Recharge Wallet
//                 </h3>
//                 <p className="text-yellow-700 text-sm">
//                   KES {profile?.wallet?.recharge_wallet ?? 0}
//                 </p>
//               </div>
//               <WalletIcon className="h-10 w-10 text-yellow-700" />
//             </div>
//             <div className="bg-yellow-50 backdrop-blur-xl border border-yellow-200 p-4 rounded-2xl shadow flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-yellow-800">
//                   Flexible Wallet
//                 </h3>
//                 <p className="text-yellow-700 text-sm">
//                   KES {profile?.wallet?.commission_wallet ?? 0}
//                 </p>
//               </div>
//               <BanknotesIcon className="h-10 w-10 text-yellow-700" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Action Buttons */}
//       <section className="max-w-4xl mx-auto mb-10">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
//           {/* Update Details Button */}
//           <button
//             onClick={() => navigate("/security")}
//             className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
//           >
//             <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
//             <div className="relative z-10 flex flex-col items-center">
//               <UserIcon className="h-5 w-5 text-white mb-1" />
//               <span className="font-medium text-white text-xs text-center">
//                 Update Details
//               </span>
//             </div>
//           </button>

//           {/* Recharge Button */}
//           <button
//             onClick={() => navigate("/recharge")}
//             className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
//           >
//             <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
//             <div className="relative z-10 flex flex-col items-center">
//               <WalletIcon className="h-5 w-5 text-white mb-1" />
//               <span className="font-medium text-white text-xs text-center">
//                 Recharge
//               </span>
//             </div>
//           </button>

//           {/* Withdraw Button */}
//           <button
//             onClick={() => navigate("/withdraw")}
//             className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
//           >
//             <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
//             <div className="relative z-10 flex flex-col items-center">
//               <BanknotesIcon className="h-5 w-5 text-white mb-1" />
//               <span className="font-medium text-white text-xs text-center">
//                 Withdraw
//               </span>
//             </div>
//           </button>

//           {/* View Earnings Button */}
//           <button
//             onClick={() => navigate("/earnings/me")}
//             className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
//           >
//             <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
//             <div className="relative z-10 flex flex-col items-center">
//               <ArrowRightOnRectangleIcon className="h-5 w-5 text-white mb-1" />
//               <span className="font-medium text-white text-xs text-center">
//                 View Earnings
//               </span>
//             </div>
//           </button>

//           {/* Password Settings Button */}
//           <button
//             onClick={() => navigate("/change-password")}
//             className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
//           >
//             <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
//             <div className="relative z-10 flex flex-col items-center">
//               <LockClosedIcon className="h-5 w-5 text-white mb-1" />
//               <span className="font-medium text-white text-xs text-center">
//                 Password Settings
//               </span>
//             </div>
//           </button>
//         </div>
//       </section>

//       {/* Logout Button at Bottom Left */}
//       <div className="fixed bottom-4 left-4">
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 transition-colors p-2 rounded-md flex items-center gap-1 text-sm text-white"
//         >
//           <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default Profile;




import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserIcon,
  WalletIcon,
  BanknotesIcon,
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useGetUserProfileQuery } from "../profile/profileAPI";
import ustwoLogo from "../register/ustwologo.png";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading, error } = useGetUserProfileQuery();

  useEffect(() => {
    console.log("User profile data:", profile);
  }, [profile]);

  if (isLoading)
    return <p className="text-yellow-800 text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Error loading profile.</p>
    );

  // Determine current level
  const currentLevel =
    profile?.level?.name ?? profile?.user_levels?.[0]?.name ?? "N/A";

  // Level color/gradient map
  const levelStyles: Record<string, string> = {
    Bronze: "bg-amber-700 text-white",
    Silver: "bg-gray-400 text-gray-900",
    Gold: "bg-yellow-500 text-gray-900",
    Platinum:
      "bg-gradient-to-r from-purple-500 to-indigo-600 text-white animate-pulse",
    Diamond:
      "bg-gradient-to-r from-blue-400 to-cyan-500 text-white animate-pulse",
    "N/A": "bg-gray-700 text-gray-300",
  };
  const levelClass = levelStyles[currentLevel] || levelStyles["N/A"];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/register");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 py-6 text-yellow-900 bg-yellow-50"
    >
      {/* Profile Header with Logo and Info */}
      <div className="flex flex-col items-center mb-8">
        {/* Logo and Info Container */}
        <div className="flex items-center gap-6">
          <img
            src={ustwoLogo}
            alt="Company Logo"
            className="h-20 drop-shadow-lg"
          />

          {/* Profile Info */}
          <div className="bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-4 rounded-2xl shadow">
            <div className="space-y-2 text-yellow-700">
              <p>
                📱 Phone:{" "}
                <span className="font-semibold">{profile?.phone_number}</span>
              </p>
              <p>
                🆔 ID: <span className="font-semibold">USR-{profile?.id}</span>
              </p>
              <p className="flex items-center gap-2">
                ⭐ Level:{" "}
                <span
                  className={`px-3 py-1 rounded-full font-semibold ${levelClass} shadow-lg text-xs`}
                >
                  {currentLevel}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Overview */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-yellow-800">
            Wallet Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 backdrop-blur-xl border border-yellow-200 p-4 rounded-2xl shadow flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">
                  Recharge Wallet
                </h3>
                <p className="text-yellow-700 text-sm">
                  KES {profile?.wallet?.recharge_wallet ?? 0}
                </p>
              </div>
              <WalletIcon className="h-10 w-10 text-yellow-700" />
            </div>
            <div className="bg-yellow-50 backdrop-blur-xl border border-yellow-200 p-4 rounded-2xl shadow flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-yellow-800">
                  Flexible Wallet
                </h3>
                <p className="text-yellow-700 text-sm">
                  KES {profile?.wallet?.commission_wallet ?? 0}
                </p>
              </div>
              <BanknotesIcon className="h-10 w-10 text-yellow-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="max-w-4xl mx-auto mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {/* Update Details Button */}
          <button
            onClick={() => navigate("/security")}
            className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
            <div className="relative z-10 flex flex-col items-center">
              <UserIcon className="h-5 w-5 text-white mb-1" />
              <span className="font-medium text-white text-xs text-center">
                Update Details
              </span>
            </div>
          </button>

          {/* Recharge Button */}
          <button
            onClick={() => navigate("/recharge")}
            className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
            <div className="relative z-10 flex flex-col items-center">
              <WalletIcon className="h-5 w-5 text-white mb-1" />
              <span className="font-medium text-white text-xs text-center">
                Recharge
              </span>
            </div>
          </button>

          {/* Withdraw Button */}
          <button
            onClick={() => navigate("/withdraw")}
            className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
            <div className="relative z-10 flex flex-col items-center">
              <BanknotesIcon className="h-5 w-5 text-white mb-1" />
              <span className="font-medium text-white text-xs text-center">
                Withdraw
              </span>
            </div>
          </button>

          {/* View Earnings Button */}
          <button
            onClick={() => navigate("/earnings/me")}
            className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
            <div className="relative z-10 flex flex-col items-center">
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-white mb-1" />
              <span className="font-medium text-white text-xs text-center">
                View Earnings
              </span>
            </div>
          </button>

          {/* Password Settings Button */}
          <button
            onClick={() => navigate("/change-password")}
            className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-500 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
            <div className="relative z-10 flex flex-col items-center">
              <LockClosedIcon className="h-5 w-5 text-white mb-1" />
              <span className="font-medium text-white text-xs text-center">
                Password Settings
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Logout Button at Bottom Left */}
      <div className="fixed bottom-4 left-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition-colors p-2 rounded-md flex items-center gap-1 text-sm text-white"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Profile;
