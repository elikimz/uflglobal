



import React from "react";
import { motion } from "framer-motion";
import { useGetLevelsQuery } from "../levels/levelsAPI";
import { ArrowPathIcon, TrophyIcon } from "@heroicons/react/24/solid";

const Levels: React.FC = () => {
  const { data: levels, isLoading, refetch } = useGetLevelsQuery();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full px-4 py-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 text-white overflow-x-auto"
    >
      {/* === Header === */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1 flex justify-center items-center gap-2 text-indigo-300">
          <TrophyIcon className="h-6 w-6" />
          Levels & Income
        </h1>
        <p className="text-indigo-200 text-sm">
          Explore all levels and their income details
        </p>
      </div>

      {/* === Refresh Button === */}
      <div className="flex justify-end max-w-6xl mx-auto mb-4">
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* === Levels Table === */}
      <div className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-orange-600 text-white">
              <th className="px-4 py-2">Job Grade</th>
              <th className="px-4 py-2">Work Deposit</th>
              <th className="px-4 py-2">Number of Tasks</th>
              <th className="px-4 py-2">Mission Income</th>
              <th className="px-4 py-2">Daily Mission Income</th>
              <th className="px-4 py-2">Monthly Task Income</th>
              <th className="px-4 py-2">Annual Mission Income</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-indigo-200">
                  Loading levels...
                </td>
              </tr>
            ) : levels && levels.length > 0 ? (
              levels.map((level) => (
                <tr
                  key={level.id}
                  className="even:bg-white/10 odd:bg-white/5 hover:bg-white/20 transition"
                >
                  <td className="px-4 py-2 text-indigo-300 font-medium">
                    {level.name}
                  </td>
                  <td className="px-4 py-2">KES {level.work_deposit}</td>
                  <td className="px-4 py-2">{level.number_of_tasks}</td>
                  <td className="px-4 py-2">KES {level.mission_income}</td>
                  <td className="px-4 py-2">KES {level.mission_day_income}</td>
                  <td className="px-4 py-2">KES {level.task_monthly_income}</td>
                  <td className="px-4 py-2">
                    KES {level.mission_annual_income}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-indigo-200">
                  No levels available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Levels;
