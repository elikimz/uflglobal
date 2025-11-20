


// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   UserIcon,
//   WalletIcon,
//   BanknotesIcon,
//   LockClosedIcon,
//   ArrowRightOnRectangleIcon,
//   ClipboardDocumentListIcon,
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
//   const levelStyles: Record<string, string> = {
//     Bronze: "bg-amber-700 text-white",
//     Silver: "bg-gray-400 text-gray-900",
//     Gold: "bg-yellow-400 text-gray-900",
//     Platinum:
//       "bg-gradient-to-r from-purple-500 to-indigo-600 text-white animate-pulse",
//     Diamond:
//       "bg-gradient-to-r from-blue-400 to-cyan-500 text-white animate-pulse",
//     "N/A": "bg-gray-700 text-gray-300",
//   };

//   const levelClass = levelStyles[currentLevel] || levelStyles["N/A"];

//   const handleLogout = () => {
//     localStorage.removeItem("access_token"); // remove token
//     navigate("/register"); // redirect to login
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

//       {/* === BANK / MPESA DETAILS === */}
//       <section className="max-w-4xl mx-auto mb-10">
//         <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
//           <h2 className="text-lg font-semibold text-indigo-300 mb-3">
//             Bank / M-Pesa Details
//           </h2>
//           <p className="text-indigo-100 text-sm">
//             Account: <span className="font-semibold">MPESA - 12345678</span>
//           </p>
//         </div>
//       </section>

//       {/* === CHANGE PASSWORD === */}
//       <section className="max-w-4xl mx-auto mb-6">
//         <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors p-3 rounded-xl flex items-center justify-center gap-2 font-semibold">
//           <LockClosedIcon className="h-5 w-5" /> Change Password
//         </button>
//       </section>

//       {/* === RECHARGE / WITHDRAW CARDS === */}
//       <section className="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div
//           className="bg-indigo-600 hover:bg-indigo-700 transition-colors p-6 rounded-2xl shadow cursor-pointer flex flex-col items-center justify-center"
//           onClick={() => navigate("/recharge")}
//         >
//           <WalletIcon className="h-12 w-12 mb-2 text-white" />
//           <p className="font-semibold text-white text-lg">Recharge</p>
//         </div>

//         <div
//           className="bg-green-600 hover:bg-green-700 transition-colors p-6 rounded-2xl shadow cursor-pointer flex flex-col items-center justify-center"
//           onClick={() => navigate("/withdraw")}
//         >
//           <BanknotesIcon className="h-12 w-12 mb-2 text-white" />
//           <p className="font-semibold text-white text-lg">Withdraw</p>
//         </div>
//       </section>

//       {/* === TRANSACTION HISTORY LAST === */}
//       <section className="max-w-4xl mx-auto mb-10">
//         <h2 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center gap-2">
//           <ClipboardDocumentListIcon className="h-6 w-6" />
//           Transaction History
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Deposits */}
//           <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
//             <h3 className="font-semibold text-lg text-green-300 flex items-center gap-2 mb-3">
//               Deposits
//             </h3>
//             <ul className="text-indigo-100 text-sm space-y-2">
//               <li>KES 2000 — 2025-01-20</li>
//               <li>KES 3500 — 2025-01-18</li>
//             </ul>
//           </div>

//           {/* Withdrawals */}
//           <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
//             <h3 className="font-semibold text-lg text-red-300 flex items-center gap-2 mb-3">
//               Withdrawals
//             </h3>
//             <ul className="text-indigo-100 text-sm space-y-2">
//               <li>KES 1000 — 2025-01-19</li>
//               <li>KES 850 — 2025-01-10</li>
//             </ul>
//           </div>
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
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import { useGetUserProfileQuery } from "../profile/profileAPI";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading, error } = useGetUserProfileQuery();

  useEffect(() => {
    console.log("User profile data:", profile);
  }, [profile]);

  if (isLoading)
    return <p className="text-white text-center mt-10">Loading...</p>;
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
    Gold: "bg-yellow-400 text-gray-900",
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
      className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950"
    >
      {/* === HEADER === */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserIcon className="h-8 w-8 text-indigo-300" /> My Account
          </h1>
          <p className="text-indigo-300 text-sm">
            Manage your profile & earnings
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition-colors p-2 rounded-md flex items-center gap-1 text-sm"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
        </button>
      </div>

      {/* === PROFILE INFORMATION === */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-indigo-300">
            Profile Information
          </h2>
          <div className="space-y-3 text-indigo-100">
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
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-indigo-300">
            Wallet Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-indigo-300">
                  Recharge Wallet
                </h3>
                <p className="text-indigo-100 text-sm">
                  KES {profile?.wallet?.recharge_wallet ?? 0}
                </p>
              </div>
              <WalletIcon className="h-10 w-10 text-indigo-300" />
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-indigo-300">
                  Flexible Wallet
                </h3>
                <p className="text-indigo-100 text-sm">
                  KES {profile?.wallet?.commission_wallet ?? 0}
                </p>
              </div>
              <BanknotesIcon className="h-10 w-10 text-indigo-300" />
            </div>
          </div>
        </div>
      </section>

      {/* === UPDATE DETAILS BUTTON === */}
      <section className="max-w-4xl mx-auto mb-10">
        <button
          onClick={() => navigate("/security")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors p-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
        >
          Update Details
        </button>
      </section>

      {/* === RECHARGE / WITHDRAW CARDS === */}
      <section className="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors p-6 rounded-2xl shadow cursor-pointer flex flex-col items-center justify-center"
          onClick={() => navigate("/recharge")}
        >
          <WalletIcon className="h-12 w-12 mb-2 text-white" />
          <p className="font-semibold text-white text-lg">Recharge</p>
        </div>

        <div
          className="bg-green-600 hover:bg-green-700 transition-colors p-6 rounded-2xl shadow cursor-pointer flex flex-col items-center justify-center"
          onClick={() => navigate("/withdraw")}
        >
          <BanknotesIcon className="h-12 w-12 mb-2 text-white" />
          <p className="font-semibold text-white text-lg">Withdraw</p>
        </div>
      </section>

      {/* === TRANSACTION HISTORY LAST === */}
      <section className="max-w-4xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4 text-indigo-300 flex items-center gap-2">
          <ClipboardDocumentListIcon className="h-6 w-6" />
          Transaction History
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deposits */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-lg text-green-300 flex items-center gap-2 mb-3">
              Deposits
            </h3>
            <ul className="text-indigo-100 text-sm space-y-2">
              <li>KES 2000 — 2025-01-20</li>
              <li>KES 3500 — 2025-01-18</li>
            </ul>
          </div>

          {/* Withdrawals */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-lg text-red-300 flex items-center gap-2 mb-3">
              Withdrawals
            </h3>
            <ul className="text-indigo-100 text-sm space-y-2">
              <li>KES 1000 — 2025-01-19</li>
              <li>KES 850 — 2025-01-10</li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Profile;
