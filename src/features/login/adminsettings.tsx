


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useAdminUpdatePhoneMutation,
  useAdminUpdatePasswordMutation,
  useAdminSuspendUserMutation,
  useAdminResetWithdrawalPinMutation,
} from "../login/loginAPI";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const AdminSettings: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  } | null>(null);

  const [updatePhone] = useAdminUpdatePhoneMutation();
  const [updatePassword] = useAdminUpdatePasswordMutation();
  const [suspendUser] = useAdminSuspendUserMutation();
  const [resetPin] = useAdminResetWithdrawalPinMutation();

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification((prev) => (prev ? { ...prev, visible: false } : null));
    }, 5000);
  };

  const handlePhoneUpdate = async () => {
    if (!userId || !newPhone) {
      showNotification("User ID and new phone number are required", "error");
      return;
    }

    try {
      await updatePhone({
        user_id: Number(userId),
        new_phone: newPhone,
      }).unwrap();
      showNotification("Phone updated successfully", "success");
      setNewPhone("");
    } catch (err) {
      showNotification("Failed to update phone", "error");
    }
  };

  const handlePasswordUpdate = async () => {
    if (!userId || !newPassword) {
      showNotification("User ID and new password are required", "error");
      return;
    }

    try {
      await updatePassword({
        user_id: Number(userId),
        new_password: newPassword,
      }).unwrap();
      showNotification("Password updated successfully", "success");
      setNewPassword("");
    } catch (err) {
      showNotification("Failed to update password", "error");
    }
  };

  const handleSuspendToggle = async (state: boolean) => {
    if (!userId) {
      showNotification("User ID is required", "error");
      return;
    }

    try {
      await suspendUser({ user_id: Number(userId), suspend: state }).unwrap();
      showNotification(
        state ? "User suspended successfully" : "User unsuspended successfully",
        "success"
      );
    } catch (err) {
      showNotification("Failed to update suspension status", "error");
    }
  };

  const handlePinReset = async () => {
    if (!userId) {
      showNotification("User ID is required", "error");
      return;
    }

    try {
      await resetPin({ user_id: Number(userId) }).unwrap();
      showNotification("Withdrawal PIN reset successfully", "success");
    } catch (err) {
      showNotification("Failed to reset PIN", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Settings
        </h2>

        {/* Notification Component */}
        <AnimatePresence>
          {notification?.visible && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
                notification.type === "success" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              {notification.type === "success" ? (
                <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span
                className={
                  notification.type === "success"
                    ? "text-green-800"
                    : "text-red-800"
                }
              >
                {notification.message}
              </span>
              <button
                onClick={() => setNotification(null)}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User ID Input */}
        <div className="mb-6">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            User ID
          </label>
          <input
            id="userId"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter user ID"
          />
        </div>

        {/* Phone Update Section */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Update Phone Number
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter new phone number"
            />
            <button
              onClick={handlePhoneUpdate}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Phone
            </button>
          </div>
        </div>

        {/* Password Update Section */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Update Password
          </h3>
          <div className="space-y-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter new password"
            />
            <button
              onClick={handlePasswordUpdate}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Suspension Controls */}
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            User Suspension
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSuspendToggle(true)}
              className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-md transition-colors border border-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Suspend User
            </button>
            <button
              onClick={() => handleSuspendToggle(false)}
              className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-2 px-4 rounded-md transition-colors border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Unsuspend User
            </button>
          </div>
        </div>

        {/* PIN Reset Section */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Reset Withdrawal PIN
          </h3>
          <button
            onClick={handlePinReset}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Reset Withdrawal PIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
