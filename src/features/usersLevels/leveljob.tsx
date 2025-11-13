import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  useGetUserLevelsQuery,
  useUpgradeUserLevelMutation,
} from "../usersLevels/userlevelsAPI";
import { ArrowPathIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";

const MyJobLevels: React.FC = () => {
  const navigate = useNavigate();
  const { data: userLevels, isLoading, refetch } = useGetUserLevelsQuery();
  const [upgradeUserLevel] = useUpgradeUserLevelMutation();
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 15000);
  };

  const handleUpgrade = async (userLevelId: number, newLevelId: number) => {
    try {
      await upgradeUserLevel({
        user_level_id: userLevelId,
        data: { new_level_id: newLevelId },
      }).unwrap();

      showNotification("🎉 Upgrade successful! New level activated.");
      setSelectedLevelId(null);
      refetch(); // refresh user levels
    } catch (error: any) {
      console.error("Upgrade failed:", error);
      if (error?.data?.detail) {
        if (Array.isArray(error.data.detail)) {
          const messages = error.data.detail
            .map((d: any) => d.msg || JSON.stringify(d))
            .join(", ");
          showNotification(messages);
        } else if (typeof error.data.detail === "string") {
          showNotification(error.data.detail);
        } else {
          showNotification(JSON.stringify(error.data.detail));
        }
      } else {
        showNotification(error?.error || "An unknown error occurred.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full px-4 py-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 text-white"
    >
      {/* === Notification === */}
      {notification && (
        <div className="max-w-5xl mx-auto mb-4 p-3 bg-indigo-600 text-center rounded-xl shadow-md">
          {notification}
        </div>
      )}

      {/* === Header === */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1 flex justify-center items-center gap-2 text-indigo-300">
          <RocketLaunchIcon className="h-6 w-6" />
          My Job Levels
        </h1>
        <p className="text-indigo-200 text-sm">
          Manage your current job levels and upgrade to higher ones
        </p>
      </div>

      {/* === Refresh === */}
      <div className="flex justify-end max-w-5xl mx-auto mb-4">
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* === Table === */}
      <div className="max-w-5xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-orange-600 text-white">
              <th className="px-4 py-2">Level Name</th>
              <th className="px-4 py-2">Invested Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-indigo-200">
                  Loading your levels...
                </td>
              </tr>
            ) : userLevels && userLevels.length > 0 ? (
              userLevels.map((ul) => (
                <tr
                  key={ul.id}
                  className="even:bg-white/10 odd:bg-white/5 hover:bg-white/20 transition"
                >
                  <td className="px-4 py-2 text-indigo-300 font-medium">
                    {ul.name || "N/A"}
                  </td>
                  <td className="px-4 py-2">KES {ul.invested_amount}</td>
                  <td className="px-4 py-2 capitalize">{ul.status}</td>
                  <td className="px-4 py-2">
                    {new Date(ul.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {selectedLevelId === ul.id ? (
                      <div className="flex gap-2 items-center">
                        <select
                          className="bg-gray-800 text-white border border-indigo-500 rounded-lg px-2 py-1"
                          onChange={(e) =>
                            handleUpgrade(ul.id, Number(e.target.value))
                          }
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Select new level
                          </option>
                          {[2, 3, 4, 5].map((lvl) => (
                            <option key={lvl} value={lvl}>
                              Level {lvl}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => setSelectedLevelId(null)}
                          className="text-sm text-red-400 hover:text-red-500 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedLevelId(ul.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-xl text-white text-sm transition"
                      >
                        Upgrade
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-indigo-200">
                  You have not enrolled in any level yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* === Footer === */}
      <div className="text-center mt-8 text-indigo-300 text-sm">
        Want to enroll in more levels?{" "}
        <span
          onClick={() => navigate("/levels")}
          className="text-orange-400 hover:underline cursor-pointer"
        >
          Go to Levels
        </span>
      </div>
    </motion.div>
  );
};

export default MyJobLevels;
