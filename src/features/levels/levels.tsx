

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useGetLevelsQuery } from "../levels/levelsAPI";
// import { useCreateUserLevelMutation } from "../usersLevels/userlevelsAPI";
// import { ArrowPathIcon, TrophyIcon } from "@heroicons/react/24/solid";

// const Levels: React.FC = () => {
//   const navigate = useNavigate();
//   const { data: levels, isLoading, error, refetch } = useGetLevelsQuery();
//   const [createUserLevel] = useCreateUserLevelMutation();
//   const [notification, setNotification] = useState<string | null>(null);

//   // Debug: log response from backend
//   useEffect(() => {
//     console.log("useGetLevelsQuery() response:", levels);
//     console.log("isLoading:", isLoading);
//     console.log("error:", error);
//   }, [levels, isLoading, error]);

//   const showNotification = (msg: string) => {
//     setNotification(msg);
//     setTimeout(() => setNotification(null), 5000);
//   };

//   const handleEnroll = async (levelId: number) => {
//     try {
//       await createUserLevel({ level_id: levelId }).unwrap();
//       showNotification("Enrollment successful! Redirecting to your jobs...");
//       setTimeout(() => {
//         navigate("/myjoblevels");
//       }, 2000);
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

//   // Sort levels: "temporary worker" first, then LV1, LV2, etc.
//   const sortedLevels = levels
//     ? [...levels].sort((a, b) => {
//         if (a.name.toLowerCase() === "temporary worker") return -1;
//         if (b.name.toLowerCase() === "temporary worker") return 1;
//         // Extract the numeric part from the level name (e.g., "LV1" -> 1)
//         const aNum = parseInt(a.name.replace(/[^\d]/g, ""), 10) || 0;
//         const bNum = parseInt(b.name.replace(/[^\d]/g, ""), 10) || 0;
//         return aNum - bNum;
//       })
//     : [];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen w-full px-4 py-6 bg-yellow-50 text-yellow-900 overflow-x-auto"
//     >
//       {/* Notification */}
//       {notification && (
//         <div className="max-w-6xl mx-auto mb-4 p-3 bg-yellow-600 rounded-xl text-white text-center">
//           {notification}
//         </div>
//       )}
//       {/* Header */}
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold mb-1 flex justify-center items-center gap-2 text-yellow-800">
//           <TrophyIcon className="h-6 w-6" />
//           Levels & Income
//         </h1>
//         <p className="text-yellow-700 text-sm">
//           Explore all levels and enroll in the ones you want
//         </p>
//       </div>
//       {/* Refresh Button */}
//       <div className="flex justify-end max-w-6xl mx-auto mb-4">
//         <button
//           onClick={() => refetch()}
//           className="flex items-center gap-2 text-yellow-700 hover:text-yellow-800 transition"
//         >
//           <ArrowPathIcon className="h-4 w-4" />
//           Refresh
//         </button>
//       </div>
//       {/* Levels Table */}
//       <div className="max-w-6xl mx-auto overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-yellow-600 text-white">
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
//                 <td colSpan={8} className="text-center py-4 text-yellow-700">
//                   Loading levels...
//                 </td>
//               </tr>
//             ) : sortedLevels.length > 0 ? (
//               sortedLevels.map((level) => (
//                 <tr
//                   key={level.id}
//                   className="even:bg-yellow-50 odd:bg-yellow-100 hover:bg-yellow-200 transition"
//                 >
//                   <td className="px-4 py-2 text-yellow-800 font-medium">
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
//                       className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-xl text-white text-sm transition"
//                     >
//                       Enroll
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={8} className="text-center py-4 text-yellow-700">
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
  const [enrollingLevelId, setEnrollingLevelId] = useState<number | null>(null);

  // Debug: log response from backend
  useEffect(() => {
    console.log("useGetLevelsQuery() response:", levels);
    console.log("isLoading:", isLoading);
    console.log("error:", error);
  }, [levels, isLoading, error]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleEnroll = async (levelId: number) => {
    if (enrollingLevelId === levelId) return; // Prevent duplicate clicks
    setEnrollingLevelId(levelId);

    try {
      await createUserLevel({ level_id: levelId }).unwrap();
      showNotification("Enrollment successful! Redirecting to your jobs...");
      setTimeout(() => {
        navigate("/myjoblevels");
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
    } finally {
      setEnrollingLevelId(null); // Reset after API call completes
    }
  };

  // Sort levels: "temporary worker" first, then LV1, LV2, etc.
  const sortedLevels = levels
    ? [...levels].sort((a, b) => {
        if (a.name.toLowerCase() === "temporary worker") return -1;
        if (b.name.toLowerCase() === "temporary worker") return 1;
        // Extract the numeric part from the level name (e.g., "LV1" -> 1)
        const aNum = parseInt(a.name.replace(/[^\d]/g, ""), 10) || 0;
        const bNum = parseInt(b.name.replace(/[^\d]/g, ""), 10) || 0;
        return aNum - bNum;
      })
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full px-4 py-6 bg-yellow-50 text-yellow-900 overflow-x-auto"
    >
      {/* Notification */}
      {notification && (
        <div className="max-w-6xl mx-auto mb-4 p-3 bg-yellow-600 rounded-xl text-white text-center">
          {notification}
        </div>
      )}
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1 flex justify-center items-center gap-2 text-yellow-800">
          <TrophyIcon className="h-6 w-6" />
          Levels & Income
        </h1>
        <p className="text-yellow-700 text-sm">
          Explore all levels and enroll in the ones you want
        </p>
      </div>
      {/* Refresh Button */}
      <div className="flex justify-end max-w-6xl mx-auto mb-4">
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 text-yellow-700 hover:text-yellow-800 transition"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Refresh
        </button>
      </div>
      {/* Levels Table */}
      <div className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-yellow-600 text-white">
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
                <td colSpan={8} className="text-center py-4 text-yellow-700">
                  Loading levels...
                </td>
              </tr>
            ) : sortedLevels.length > 0 ? (
              sortedLevels.map((level) => (
                <tr
                  key={level.id}
                  className="even:bg-yellow-50 odd:bg-yellow-100 hover:bg-yellow-200 transition"
                >
                  <td className="px-4 py-2 text-yellow-800 font-medium">
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
                      disabled={enrollingLevelId !== null && enrollingLevelId !== level.id}
                      className={`bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-xl text-white text-sm transition ${
                        enrollingLevelId === level.id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {enrollingLevelId === level.id ? "Processing..." : "Enroll"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-yellow-700">
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
