



// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   ClipboardDocumentListIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   ClockIcon,
// } from "@heroicons/react/24/solid";
// import {
//   useGetAllWithdrawalsQuery,
//   useUpdateWithdrawalStatusMutation,
// } from "../withdrawal/withdrawalAPI";

// const AdminManageWithdrawal: React.FC = () => {
//   const {
//     data: withdrawals = [],
//     isLoading,
//     refetch,
//   } = useGetAllWithdrawalsQuery();
//   const [updateStatus] = useUpdateWithdrawalStatusMutation();
//   const [feedback, setFeedback] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const handleStatusChange = async (
//     id: number,
//     status: "success" | "reversed"
//   ) => {
//     try {
//       await updateStatus({ withdrawal_id: id, status }).unwrap();
//       setFeedback({
//         type: "success",
//         message: `Withdrawal marked as ${status}`,
//       });
//       refetch();
//     } catch (error: any) {
//       setFeedback({
//         type: "error",
//         message: error?.data?.detail || "Failed to update status",
//       });
//     }
//   };

//   const getStatusStyle = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "success":
//         return {
//           color: "bg-green-900/50 text-green-100",
//           icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
//           text: "Success",
//         };
//       case "canceled":
//         return {
//           color: "bg-red-900/50 text-red-100",
//           icon: <XCircleIcon className="h-5 w-5 text-red-400" />,
//           text: "Canceled",
//         };
//       case "pending":
//         return {
//           color: "bg-yellow-900/50 text-yellow-100",
//           icon: <ClockIcon className="h-5 w-5 text-yellow-400" />,
//           text: "Pending",
//         };
//       case "reversed":
//         return {
//           color: "bg-blue-900/50 text-blue-100",
//           icon: <ClockIcon className="h-5 w-5 text-blue-400" />,
//           text: "Reversed",
//         };
//       default:
//         return {
//           color: "bg-gray-700/50 text-gray-100",
//           icon: <ClockIcon className="h-5 w-5 text-gray-400" />,
//           text: "Unknown",
//         };
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950"
//     >
//       <h1 className="text-3xl font-bold text-yellow-400 flex items-center gap-2 mb-8">
//         <ClipboardDocumentListIcon className="h-8 w-8" /> Manage Withdrawals
//       </h1>

//       {feedback && (
//         <div
//           className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${
//             feedback.type === "success"
//               ? "bg-green-900/50 text-green-100"
//               : "bg-red-900/50 text-red-100"
//           }`}
//         >
//           {feedback.type === "success" ? (
//             <CheckCircleIcon className="h-5 w-5" />
//           ) : (
//             <XCircleIcon className="h-5 w-5" />
//           )}
//           <span>{feedback.message}</span>
//         </div>
//       )}

//       {isLoading ? (
//         <p className="text-yellow-100 text-center">Loading withdrawals...</p>
//       ) : withdrawals.length === 0 ? (
//         <p className="text-yellow-100 text-center">No withdrawals found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow">
//             <thead>
//               <tr className="border-b border-white/20">
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Amount (KES)
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Wallet
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Method
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Account Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Account Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Transaction Fee (KES)
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Net Amount (KES)
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Approved
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Admin Remarks
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {withdrawals.map((w: any) => {
//                 const { color, icon, text } = getStatusStyle(w.status);
//                 return (
//                   <tr
//                     key={w.id}
//                     className="border-b border-white/10 hover:bg-white/5"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                       {w.amount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                       <div
//                         className={`flex items-center gap-1 ${color} px-3 py-1 rounded-full w-fit`}
//                       >
//                         {icon}
//                         <span className="text-xs">{text}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {new Date(w.created_at).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.wallet_type}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.method}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.account_name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.account_number}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.transaction_fee}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.net_amount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.approved_at
//                         ? new Date(w.approved_at).toLocaleDateString()
//                         : "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.admin_remarks || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       {w.status === "pending" && (
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleStatusChange(w.id, "success")}
//                             className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white font-semibold text-xs"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleStatusChange(w.id, "reversed")}
//                             className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white font-semibold text-xs"
//                           >
//                             Reverse
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default AdminManageWithdrawal;





// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   ClipboardDocumentListIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   ClockIcon,
// } from "@heroicons/react/24/solid";
// import { BanIcon } from "lucide-react";
// import {
//   useGetAllWithdrawalsQuery,
//   useUpdateWithdrawalStatusMutation,
//   useToggleUserWithdrawalsMutation,
// } from "../withdrawal/withdrawalAPI";

// const AdminManageWithdrawal: React.FC = () => {
//   const {
//     data: withdrawals = [],
//     isLoading,
//     refetch,
//   } = useGetAllWithdrawalsQuery();

//   const [updateStatus] = useUpdateWithdrawalStatusMutation();
//   const [toggleWithdrawals] = useToggleUserWithdrawalsMutation();

//   const [feedback, setFeedback] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);
//   const [localWithdrawals, setLocalWithdrawals] = useState<any[]>([]);

//   // Sync local state with fetched withdrawals & log data
//   useEffect(() => {
//     console.log("Fetched withdrawals:", withdrawals);
//     setLocalWithdrawals(withdrawals);
//   }, [withdrawals]);

//   const handleStatusChange = async (
//     id: number,
//     status: "success" | "reversed"
//   ) => {
//     try {
//       await updateStatus({ withdrawal_id: id, status }).unwrap();
//       setFeedback({
//         type: "success",
//         message: `Withdrawal marked as ${status}`,
//       });
//       refetch();
//     } catch (error: any) {
//       setFeedback({
//         type: "error",
//         message: error?.data?.detail || "Failed to update status",
//       });
//     }
//   };

//   const handleBlockToggle = async (user_id: number, block: boolean) => {
//     try {
//       const res = await toggleWithdrawals({ user_id, block }).unwrap();
//       setFeedback({
//         type: "success",
//         message:
//           res?.message ||
//           `User ${block ? "blocked" : "unblocked"} successfully`,
//       });

//       setLocalWithdrawals((prev) =>
//         prev.map((w) =>
//           w.user?.id === user_id ? { ...w, can_withdraw: !w.can_withdraw } : w
//         )
//       );
//     } catch (error: any) {
//       setFeedback({
//         type: "error",
//         message: error?.data?.detail || "Failed to update user status",
//       });
//     }
//   };

//   const getStatusStyle = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "success":
//         return {
//           color: "bg-green-900/50 text-green-100",
//           icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
//           text: "Success",
//         };
//       case "canceled":
//         return {
//           color: "bg-red-900/50 text-red-100",
//           icon: <XCircleIcon className="h-5 w-5 text-red-400" />,
//           text: "Canceled",
//         };
//       case "pending":
//         return {
//           color: "bg-yellow-900/50 text-yellow-100",
//           icon: <ClockIcon className="h-5 w-5 text-yellow-400" />,
//           text: "Pending",
//         };
//       case "reversed":
//         return {
//           color: "bg-blue-900/50 text-blue-100",
//           icon: <ClockIcon className="h-5 w-5 text-blue-400" />,
//           text: "Reversed",
//         };
//       default:
//         return {
//           color: "bg-gray-700/50 text-gray-100",
//           icon: <ClockIcon className="h-5 w-5 text-gray-400" />,
//           text: "Unknown",
//         };
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950"
//     >
//       <h1 className="text-3xl font-bold text-yellow-400 flex items-center gap-2 mb-8">
//         <ClipboardDocumentListIcon className="h-8 w-8" /> Manage Withdrawals
//       </h1>

//       {feedback && (
//         <div
//           className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${
//             feedback.type === "success"
//               ? "bg-green-900/50 text-green-100"
//               : "bg-red-900/50 text-red-100"
//           }`}
//         >
//           {feedback.type === "success" ? (
//             <CheckCircleIcon className="h-5 w-5" />
//           ) : (
//             <XCircleIcon className="h-5 w-5" />
//           )}
//           <span>{feedback.message}</span>
//         </div>
//       )}

//       {isLoading ? (
//         <p className="text-yellow-100 text-center">Loading withdrawals...</p>
//       ) : localWithdrawals.length === 0 ? (
//         <p className="text-yellow-100 text-center">No withdrawals found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow">
//             <thead>
//               <tr className="border-b border-white/20">
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   User Level
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Amount (KES)
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Wallet
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Method
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Account Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Account Number
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Transaction Fee (KES)
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Net Amount (KES)
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Approved
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Can Withdraw
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {localWithdrawals.map((w: any) => {
//                 console.log("Rendering withdrawal:", w); // <-- log each row

//                 const { color, icon, text } = getStatusStyle(w.status);
//                 const userId = w.user?.id;
                
//                 const levelName =
//                   w.level_name || w.user?.level?.level_name || "N/A";

//                 return (
//                   <tr
//                     key={w.id}
//                     className="border-b border-white/10 hover:bg-white/5"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {levelName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                       {w.amount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                       <div
//                         className={`flex items-center gap-1 ${color} px-3 py-1 rounded-full w-fit`}
//                       >
//                         {icon}
//                         <span className="text-xs">{text}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {new Date(w.created_at).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.wallet_type}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.method}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.account_name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.account_number}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.transaction_fee}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.net_amount}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                       {w.approved_at
//                         ? new Date(w.approved_at).toLocaleDateString()
//                         : "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center gap-2">
//                       {w.can_withdraw ? (
//                         <span className="bg-green-700/50 px-2 py-1 rounded-full text-green-100 text-xs flex items-center gap-1">
//                           <CheckCircleIcon className="h-4 w-4" /> Yes
//                         </span>
//                       ) : (
//                         <span className="bg-red-700/50 px-2 py-1 rounded-full text-red-100 text-xs flex items-center gap-1">
//                           <BanIcon className="h-4 w-4" /> No
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
//                       {w.status === "pending" && (
//                         <>
//                           <button
//                             onClick={() => handleStatusChange(w.id, "success")}
//                             className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white font-semibold text-xs"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleStatusChange(w.id, "reversed")}
//                             className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white font-semibold text-xs"
//                           >
//                             Reverse
//                           </button>
//                         </>
//                       )}
//                       {userId && (
//                         <button
//                           onClick={() =>
//                             handleBlockToggle(userId, !w.can_withdraw)
//                           }
//                           className={`${
//                             w.can_withdraw
//                               ? "bg-red-600 hover:bg-red-700"
//                               : "bg-green-600 hover:bg-green-700"
//                           } px-3 py-1 rounded-lg text-white font-semibold text-xs`}
//                         >
//                           {w.can_withdraw ? "Block" : "unblock"}
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default AdminManageWithdrawal;






import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { BanIcon } from "lucide-react";
import {
  useGetAllWithdrawalsQuery,
  useUpdateWithdrawalStatusMutation,
  useToggleUserWithdrawalsMutation,
} from "../withdrawal/withdrawalAPI";

const AdminManageWithdrawal: React.FC = () => {
  const {
    data: withdrawals = [],
    isLoading,
    refetch,
  } = useGetAllWithdrawalsQuery();

  const [updateStatus] = useUpdateWithdrawalStatusMutation();
  const [toggleWithdrawals] = useToggleUserWithdrawalsMutation();

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [localWithdrawals, setLocalWithdrawals] = useState<any[]>([]);
  const [filterLevel, setFilterLevel] = useState<string>("All");

  // Sync local state with fetched withdrawals
  useEffect(() => {
    console.log("Fetched withdrawals:", withdrawals);
    setLocalWithdrawals(withdrawals);
  }, [withdrawals]);

  // Extract unique user levels for filter dropdown
  const userLevels = Array.from(
    new Set(withdrawals.map((w) => w.level_name || w.user?.level?.level_name))
  ).filter(Boolean);

  const handleStatusChange = async (
    id: number,
    status: "success" | "reversed"
  ) => {
    try {
      await updateStatus({ withdrawal_id: id, status }).unwrap();
      setFeedback({
        type: "success",
        message: `Withdrawal marked as ${status}`,
      });
      refetch();
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error?.data?.detail || "Failed to update status",
      });
    }
  };

  const handleBlockToggle = async (user_id: number, block: boolean) => {
    try {
      const res = await toggleWithdrawals({ user_id, block }).unwrap();
      setFeedback({
        type: "success",
        message:
          res?.message ||
          `User ${block ? "blocked" : "unblocked"} successfully`,
      });

      setLocalWithdrawals((prev) =>
        prev.map((w) =>
          w.user?.id === user_id ? { ...w, can_withdraw: !w.can_withdraw } : w
        )
      );
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error?.data?.detail || "Failed to update user status",
      });
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return {
          color: "bg-green-900/50 text-green-100",
          icon: <CheckCircleIcon className="h-5 w-5 text-green-400" />,
          text: "Success",
        };
      case "canceled":
        return {
          color: "bg-red-900/50 text-red-100",
          icon: <XCircleIcon className="h-5 w-5 text-red-400" />,
          text: "Canceled",
        };
      case "pending":
        return {
          color: "bg-yellow-900/50 text-yellow-100",
          icon: <ClockIcon className="h-5 w-5 text-yellow-400" />,
          text: "Pending",
        };
      case "reversed":
        return {
          color: "bg-blue-900/50 text-blue-100",
          icon: <ClockIcon className="h-5 w-5 text-blue-400" />,
          text: "Reversed",
        };
      default:
        return {
          color: "bg-gray-700/50 text-gray-100",
          icon: <ClockIcon className="h-5 w-5 text-gray-400" />,
          text: "Unknown",
        };
    }
  };

  // Apply filter before rendering
  const filteredWithdrawals =
    filterLevel === "All"
      ? localWithdrawals
      : localWithdrawals.filter(
          (w) => (w.level_name || w.user?.level?.level_name) === filterLevel
        );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950"
    >
      <h1 className="text-3xl font-bold text-yellow-400 flex items-center gap-2 mb-4">
        <ClipboardDocumentListIcon className="h-8 w-8" /> Manage Withdrawals
      </h1>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-yellow-100 font-semibold">
          Filter by User Level:
        </label>
        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="bg-gray-800 text-white px-3 py-1 rounded-lg"
        >
          <option value="All">All</option>
          {userLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {feedback && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg mb-6 ${
            feedback.type === "success"
              ? "bg-green-900/50 text-green-100"
              : "bg-red-900/50 text-red-100"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircleIcon className="h-5 w-5" />
          ) : (
            <XCircleIcon className="h-5 w-5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {isLoading ? (
        <p className="text-yellow-100 text-center">Loading withdrawals...</p>
      ) : filteredWithdrawals.length === 0 ? (
        <p className="text-yellow-100 text-center">No withdrawals found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  User Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Amount (KES)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Wallet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Account Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Account Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Transaction Fee (KES)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Net Amount (KES)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Approved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Can Withdraw
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredWithdrawals.map((w: any) => {
                const { color, icon, text } = getStatusStyle(w.status);
                const userId = w.user?.id;
                const levelName =
                  w.level_name || w.user?.level?.level_name || "N/A";

                return (
                  <tr
                    key={w.id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                      {levelName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {w.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <div
                        className={`flex items-center gap-1 ${color} px-3 py-1 rounded-full w-fit`}
                      >
                        {icon}
                        <span className="text-xs">{text}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                      {new Date(w.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                      {w.wallet_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                      {w.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                      {w.account_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                      {w.account_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                      {w.transaction_fee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                      {w.net_amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                      {w.approved_at
                        ? new Date(w.approved_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center gap-2">
                      {w.can_withdraw ? (
                        <span className="bg-green-700/50 px-2 py-1 rounded-full text-green-100 text-xs flex items-center gap-1">
                          <CheckCircleIcon className="h-4 w-4" /> Yes
                        </span>
                      ) : (
                        <span className="bg-red-700/50 px-2 py-1 rounded-full text-red-100 text-xs flex items-center gap-1">
                          <BanIcon className="h-4 w-4" /> No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                      {w.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(w.id, "success")}
                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white font-semibold text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(w.id, "reversed")}
                            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white font-semibold text-xs"
                          >
                            Reverse
                          </button>
                        </>
                      )}
                      {userId && (
                        <button
                          onClick={() =>
                            handleBlockToggle(userId, !w.can_withdraw)
                          }
                          className={`${
                            w.can_withdraw
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          } px-3 py-1 rounded-lg text-white font-semibold text-xs`}
                        >
                          {w.can_withdraw ? "Block" : "unblock"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default AdminManageWithdrawal;
