




import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useGetUserProfileQuery } from "../profile/profileAPI";
import ustwologo from "../../assets/ustwologo.png";

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

  // Extract level from user_levels
  const currentLevelName = profile?.user_levels?.[0]?.name || "N/A";

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

  // Extract the base level name for styling (first word)
  const levelBaseName = currentLevelName.split(" ")[0] || "N/A";

  // Use the full level name for display
  const levelClass = levelStyles[levelBaseName] || levelStyles["N/A"];

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
      <div className="flex items-center mb-6">
        {/* Logo on the left */}
        <img
          src={ustwologo}
          alt="Company Logo"
          className="h-16 w-32 object-contain mr-4"
        />

        {/* Phone number and Level Info on the right */}
        <div className="flex flex-col">
          <p className="font-bold text-yellow-800 mb-1">
            {profile?.phone_number}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-yellow-800">
              ID: {profile?.id}
            </span>
            <span
              className={`px-3 py-1 rounded-full font-semibold ${levelClass} shadow-lg text-xs`}
            >
              LV ✔️ {currentLevelName}
            </span>
          </div>
        </div>
      </div>

      {/* Wallet Overview */}
      <div className="bg-yellow-100 backdrop-blur-xl border border-yellow-200 p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 text-yellow-800 text-center">
          Wallet Overview
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg shadow text-center">
            <h3 className="text-sm font-semibold text-yellow-700">
              Recharge Wallet
            </h3>
            <p className="text-yellow-800 font-bold">
              KES {profile?.wallet?.recharge_wallet ?? 0}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow text-center">
            <h3 className="text-sm font-semibold text-yellow-700">
              Flexible Wallet
            </h3>
            <p className="text-yellow-800 font-bold">
              KES {profile?.wallet?.commission_wallet ?? 0}
            </p>
          </div>
        </div>
      </div>

      {/* Recharge and Withdrawal Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => navigate("/recharge")}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-8 rounded-full shadow-lg"
        >
          Recharge
        </button>
        <button
          onClick={() => navigate("/withdraw")}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-8 rounded-full shadow-lg"
        >
          Withdrawal
        </button>
      </div>

      {/* Menu Items in Requested Order */}
      <div className="space-y-3 mb-20">
        {/* View Earnings */}
        <div
          onClick={() => navigate("/earnings/me")}
          className="bg-yellow-100 p-4 rounded-lg shadow flex justify-between items-center"
        >
          <span className="text-yellow-800">View earnings</span>
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-yellow-600" />
        </div>

        {/* Withdrawal Details */}
        <div
          onClick={() => navigate("/withdrawal-details")}
          className="bg-yellow-100 p-4 rounded-lg shadow flex justify-between items-center"
        >
          <span className="text-yellow-800">Withdrawal details</span>
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-yellow-600" />
        </div>

        {/* Personal Settings */}
        <div
          onClick={() => navigate("/security")}
          className="bg-yellow-100 p-4 rounded-lg shadow flex justify-between items-center"
        >
          <span className="text-yellow-800">Withdrawal pin </span>
          <UserIcon className="h-5 w-5 text-yellow-600" />
        </div>

        {/* Password Settings */}
        <div
          onClick={() => navigate("/change-password")}
          className="bg-yellow-100 p-4 rounded-lg shadow flex justify-between items-center"
        >
          <span className="text-yellow-800">Personal Settings</span>
          <UserIcon className="h-5 w-5 text-yellow-600" />
        </div>

        {/* Team Expansion */}
        <div
          onClick={() => navigate("/referrals")}
          className="bg-yellow-100 p-4 rounded-lg shadow flex justify-between items-center"
        >
          <span className="text-yellow-800">Team expansion</span>
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-yellow-600" />
        </div>

        {/* App Download */}
        <div
          onClick={() => navigate("/app-download")}
          className="bg-yellow-100 p-4 rounded-lg shadow flex justify-between items-center"
        >
          <span className="text-yellow-800">App download</span>
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-yellow-600" />
        </div>
      </div>

      {/* Logout Button */}
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
