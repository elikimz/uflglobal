


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

// const Profile: React.FC = () => {
//   const navigate = useNavigate();
//   const { data: profile, isLoading, error } = useGetUserProfileQuery();

//   useEffect(() => {
//     console.log("User profile data:", profile);
//   }, [profile]);

//   if (isLoading)
//     return <p className="text-white text-center mt-10">Loading...</p>;
//   if (error)
//     return (
//       <p className="text-red-500 text-center mt-10">Error loading profile.</p>
//     );

//   // Determine current level
//   const currentLevel =
//     profile?.level?.name ?? profile?.user_levels?.[0]?.name ?? "N/A";

//   // Level color/gradient map
//     const levelStyles: Record<string, string> = {
//       Bronze: "bg-amber-700 text-white",
//       Silver: "bg-gray-400 text-gray-900",
//       Gold: "bg-yellow-400 text-gray-900",
//       Platinum:
//         "bg-gradient-to-r from-purple-500 to-indigo-600 text-white animate-pulse",
//       Diamond:
//         "bg-gradient-to-r from-blue-400 to-cyan-500 text-white animate-pulse",
//       "N/A": "bg-gray-700 text-gray-300",
//     };
//     const levelClass = levelStyles[currentLevel] || levelStyles["N/A"];

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     navigate("/register");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950"
//     >
//       {/* === HEADER === */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold flex items-center gap-2">
//             <UserIcon className="h-8 w-8 text-indigo-300" /> My Account
//           </h1>
//           <p className="text-indigo-300 text-sm">
//             Manage your profile & earnings
//           </p>
//         </div>
//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 transition-colors p-2 rounded-md flex items-center gap-1 text-sm"
//         >
//           <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
//         </button>
//       </div>

//       {/* === PROFILE INFORMATION === */}
//       <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
//           <h2 className="text-lg font-semibold mb-4 text-indigo-300">
//             Profile Information
//           </h2>
//           <div className="space-y-3 text-indigo-100">
//             <p>
//               📱 Phone Number:{" "}
//               <span className="font-semibold">{profile?.phone_number}</span>
//             </p>
//             <p>
//               🆔 User ID:{" "}
//               <span className="font-semibold">USR-{profile?.id}</span>
//             </p>
//             <p className="flex items-center gap-2">
//               ⭐ Current Level:{" "}
//               <span
//                 className={`px-4 py-1 rounded-full font-semibold ${levelClass} shadow-lg`}
//               >
//                 {currentLevel}
//               </span>
//             </p>
//           </div>
//         </div>
//         {/* === WALLET OVERVIEW === */}
//         <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
//           <h2 className="text-lg font-semibold mb-4 text-indigo-300">
//             Wallet Overview
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-indigo-300">
//                   Recharge Wallet
//                 </h3>
//                 <p className="text-indigo-100 text-sm">
//                   KES {profile?.wallet?.recharge_wallet ?? 0}
//                 </p>
//               </div>
//               <WalletIcon className="h-10 w-10 text-indigo-300" />
//             </div>
//             <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-indigo-300">
//                   Flexible Wallet
//                 </h3>
//                 <p className="text-indigo-100 text-sm">
//                   KES {profile?.wallet?.commission_wallet ?? 0}
//                 </p>
//               </div>
//               <BanknotesIcon className="h-10 w-10 text-indigo-300" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* === ACTION BUTTONS === */}
//       <section className="max-w-4xl mx-auto mb-10">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
//           {/* Update Details Button */}
//           <button
//             onClick={() => navigate("/security")}
//             className="relative group p-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md border border-indigo-400 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
//           >
//             <div className="absolute inset-0 bg-indigo-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
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
//             className="relative group p-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-md border border-green-400 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
//           >
//             <div className="absolute inset-0 bg-green-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
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
//             className="relative group p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-md border border-yellow-400 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
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
//             className="relative group p-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md border border-blue-400 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
//           >
//             <div className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
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
//             className="relative group p-3 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md border border-purple-400 transition-all transform hover:scale-105 flex flex-col items-center justify-center"
//           >
//             <div className="absolute inset-0 bg-purple-400/20 rounded-lg blur-xs group-hover:blur-sm transition-all"></div>
//             <div className="relative z-10 flex flex-col items-center">
//               <LockClosedIcon className="h-5 w-5 text-white mb-1" />
//               <span className="font-medium text-white text-xs text-center">
//                 Password Settings
//               </span>
//             </div>
//           </button>
//         </div>
//       </section>
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
      {/* === HEADER === */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2 text-yellow-800">
            <UserIcon className="h-8 w-8 text-yellow-700" /> My Account
          </h1>
          <p className="text-yellow-700 text-sm">
            Manage your profile & earnings
          </p>
        </div>
        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition-colors p-2 rounded-md flex items-center gap-1 text-sm text-white"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
        </button>
      </div>

      {/* === PROFILE INFORMATION === */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-yellow-800">
            Profile Information
          </h2>
          <div className="space-y-3 text-yellow-700">
            <p>
              📱 Phone Number:{" "}
              <span className="font-semibold">{profile?.phone_number}</span>
            </p>
            <p>
              🆔 User ID:{" "}
              <span className="font-semibold">USR-{profile?.id}</span>
            </p>
            <p className="flex items-center gap-2">
              ⭐ Current Level:{" "}
              <span
                className={`px-4 py-1 rounded-full font-semibold ${levelClass} shadow-lg`}
              >
                {currentLevel}
              </span>
            </p>
          </div>
        </div>
        {/* === WALLET OVERVIEW === */}
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

      {/* === ACTION BUTTONS === */}
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
    </motion.div>
  );
};

export default Profile;
