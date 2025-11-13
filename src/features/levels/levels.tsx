



// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useGetLevelsQuery } from "../levels/levelsAPI";
// import { useCreateUserLevelMutation } from "../usersLevels/userlevelsAPI";
// import { ArrowPathIcon, TrophyIcon } from "@heroicons/react/24/solid";

// const Levels: React.FC = () => {
//   const navigate = useNavigate(); // ✅ added navigation hook
//   const { data: levels, isLoading, refetch } = useGetLevelsQuery();
//   const [createUserLevel] = useCreateUserLevelMutation();
//   const [notification, setNotification] = useState<string | null>(null);

//   const showNotification = (msg: string) => {
//     setNotification(msg);
//     setTimeout(() => setNotification(null), 5000);
//   };

//   const handleEnroll = async (levelId: number) => {
//     try {
//       await createUserLevel({ level_id: levelId }).unwrap();

//       // ✅ If enrollment succeeds, navigate to /jobslevels
//       showNotification("Enrollment successful! Redirecting to your jobs...");
//       setTimeout(() => {
//         navigate("/jobslevels");
//       }, 2000); // small delay for user to see the message
//     } catch (error: any) {
//       console.error("Enrollment failed:", error);

//       if (error?.data?.detail) {
//         if (Array.isArray(error.data.detail)) {
//           const messages = error.data.detail
//             .map((d: any) => d.msg || JSON.stringify(d))
//             .join(", ");
//           showNotification(messages);
//         } else if (typeof error.data.detail === "string") {
//           showNotification(error.data.detail);
//         } else {
//           showNotification(JSON.stringify(error.data.detail));
//         }
//       } else {
//         showNotification(error?.error || "An unknown error occurred.");
//       }
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen w-full px-4 py-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 text-white overflow-x-auto"
//     >
//       {/* === Notification === */}
//       {notification && (
//         <div className="max-w-6xl mx-auto mb-4 p-3 bg-indigo-600 rounded-xl text-white text-center">
//           {notification}
//         </div>
//       )}

//       {/* === Header === */}
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold mb-1 flex justify-center items-center gap-2 text-indigo-300">
//           <TrophyIcon className="h-6 w-6" />
//           Levels & Income
//         </h1>
//         <p className="text-indigo-200 text-sm">
//           Explore all levels and enroll in the ones you want
//         </p>
//       </div>

//       {/* === Refresh Button === */}
//       <div className="flex justify-end max-w-6xl mx-auto mb-4">
//         <button
//           onClick={() => refetch()}
//           className="flex items-center gap-2 text-indigo-300 hover:text-indigo-400 transition"
//         >
//           <ArrowPathIcon className="h-4 w-4" />
//           Refresh
//         </button>
//       </div>

//       {/* === Levels Table === */}
//       <div className="max-w-6xl mx-auto overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-orange-600 text-white">
//               <th className="px-4 py-2">Job Grade</th>
//               <th className="px-4 py-2">Work Deposit</th>
//               <th className="px-4 py-2">Number of Tasks</th>
//               <th className="px-4 py-2">Mission Income</th>
//               <th className="px-4 py-2">Daily Mission Income</th>
//               <th className="px-4 py-2">Monthly Task Income</th>
//               <th className="px-4 py-2">Annual Mission Income</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               <tr>
//                 <td colSpan={8} className="text-center py-4 text-indigo-200">
//                   Loading levels...
//                 </td>
//               </tr>
//             ) : levels && levels.length > 0 ? (
//               levels.map((level) => (
//                 <tr
//                   key={level.id}
//                   className="even:bg-white/10 odd:bg-white/5 hover:bg-white/20 transition"
//                 >
//                   <td className="px-4 py-2 text-indigo-300 font-medium">
//                     {level.name}
//                   </td>
//                   <td className="px-4 py-2">KES {level.work_deposit}</td>
//                   <td className="px-4 py-2">{level.number_of_tasks}</td>
//                   <td className="px-4 py-2">KES {level.mission_income}</td>
//                   <td className="px-4 py-2">KES {level.mission_day_income}</td>
//                   <td className="px-4 py-2">KES {level.task_monthly_income}</td>
//                   <td className="px-4 py-2">
//                     KES {level.mission_annual_income}
//                   </td>
//                   <td className="px-4 py-2">
//                     <button
//                       onClick={() => handleEnroll(level.id)}
//                       className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-xl text-white text-sm transition"
//                     >
//                       Enroll
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={8} className="text-center py-4 text-indigo-200">
//                   No levels available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </motion.div>
//   );
// };

// export default Levels;



import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGetLevelsQuery } from "../levels/levelsAPI";
import { useCreateUserLevelMutation } from "../usersLevels/userlevelsAPI";
import { ArrowPathIcon, TrophyIcon } from "@heroicons/react/24/solid";

const Levels: React.FC = () => {
  const navigate = useNavigate();
  const { data: levels, isLoading, error, refetch } = useGetLevelsQuery();
  const [createUserLevel] = useCreateUserLevelMutation();
  const [notification, setNotification] = useState<string | null>(null);

  // ✅ Debug: log response from backend
  useEffect(() => {
    console.log("🟢 useGetLevelsQuery() response:", levels);
    console.log("🔵 isLoading:", isLoading);
    console.log("🔴 error:", error);
  }, [levels, isLoading, error]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleEnroll = async (levelId: number) => {
    try {
      await createUserLevel({ level_id: levelId }).unwrap();
      showNotification("Enrollment successful! Redirecting to your jobs...");
      setTimeout(() => {
        navigate("/jobslevels");
      }, 2000);
    } catch (error: any) {
      console.error("Enrollment failed:", error);

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
      className="min-h-screen w-full px-4 py-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 text-white overflow-x-auto"
    >
      {/* === Notification === */}
      {notification && (
        <div className="max-w-6xl mx-auto mb-4 p-3 bg-indigo-600 rounded-xl text-white text-center">
          {notification}
        </div>
      )}

      {/* === Header === */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1 flex justify-center items-center gap-2 text-indigo-300">
          <TrophyIcon className="h-6 w-6" />
          Levels & Income
        </h1>
        <p className="text-indigo-200 text-sm">
          Explore all levels and enroll in the ones you want
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
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-indigo-200">
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
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEnroll(level.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-xl text-white text-sm transition"
                    >
                      Enroll
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-indigo-200">
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
