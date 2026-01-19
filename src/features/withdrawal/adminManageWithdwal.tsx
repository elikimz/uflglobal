


// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   ClipboardDocumentListIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   ClockIcon,
//   DocumentDuplicateIcon,
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
//   const [localWithdrawals, setLocalWithdrawals] = useState<any[]>([]);
//   const [filterLevel, setFilterLevel] = useState<string>("All");

//   // Sync and sort local state with fetched withdrawals
//   useEffect(() => {
//     const sorted = [...withdrawals].sort(
//       (a, b) =>
//         new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//     );
//     setLocalWithdrawals(sorted);
//   }, [withdrawals]);

//   // Extract unique user levels for filter dropdown
//   const userLevels = Array.from(
//     new Set(withdrawals.map((w) => w.level_name || w.user?.level?.level_name))
//   ).filter(Boolean);

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

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text.toString());
//     setFeedback({
//       type: "success",
//       message: "Account number copied to clipboard!",
//     });
//   };

//   // Apply filter before rendering
//   const filteredWithdrawals =
//     filterLevel === "All"
//       ? localWithdrawals
//       : localWithdrawals.filter(
//           (w) => (w.level_name || w.user?.level?.level_name) === filterLevel
//         );

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950"
//     >
//       <h1 className="text-3xl font-bold text-yellow-400 flex items-center gap-2 mb-4">
//         <ClipboardDocumentListIcon className="h-8 w-8" /> Manage Withdrawals
//       </h1>

//       {/* Filter */}
//       <div className="mb-6 flex items-center gap-4">
//         <label className="text-yellow-100 font-semibold">
//           Filter by User Level:
//         </label>
//         <select
//           value={filterLevel}
//           onChange={(e) => setFilterLevel(e.target.value)}
//           className="bg-gray-800 text-white px-3 py-1 rounded-lg"
//         >
//           <option value="All">All</option>
//           {userLevels.map((level) => (
//             <option key={level} value={level}>
//               {level}
//             </option>
//           ))}
//         </select>
//       </div>

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
//       ) : filteredWithdrawals.length === 0 ? (
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
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredWithdrawals.map((w: any) => {
//                 const { color, icon, text } = getStatusStyle(w.status);
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
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100 flex items-center gap-1">
//                       {w.account_number}
//                       <button
//                         onClick={() => copyToClipboard(w.account_number)}
//                         className="text-yellow-300 hover:text-yellow-400"
//                       >
//                         <DocumentDuplicateIcon className="h-4 w-4" />
//                       </button>
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
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import {
  useGetAllWithdrawalsQuery,
  useUpdateWithdrawalStatusMutation,
} from "../withdrawal/withdrawalAPI";

const AdminManageWithdrawal: React.FC = () => {
  const {
    data: withdrawals = [],
    isLoading,
    refetch,
  } = useGetAllWithdrawalsQuery();
  const [updateStatus] = useUpdateWithdrawalStatusMutation();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [localWithdrawals, setLocalWithdrawals] = useState<any[]>([]);
  const [filterLevel, setFilterLevel] = useState<string>("All");
  const [processingWithdrawalId, setProcessingWithdrawalId] = useState<number | null>(null);

  // Log backend data for debugging
  useEffect(() => {
    console.log("Backend withdrawals data:", withdrawals);
  }, [withdrawals]);

  // Sync and sort local state with fetched withdrawals
  useEffect(() => {
    const sorted = [...withdrawals].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setLocalWithdrawals(sorted);
  }, [withdrawals]);

  // Extract unique user levels for filter dropdown
  const userLevels = Array.from(
    new Set(withdrawals.map((w) => w.level_name || w.user?.level?.level_name))
  ).filter(Boolean);

  const handleStatusChange = async (
    id: number,
    status: "success" | "reversed"
  ) => {
    if (processingWithdrawalId === id) return; // Prevent duplicate clicks
    setProcessingWithdrawalId(id);

    try {
      console.log(`Updating withdrawal ${id} to ${status}...`);
      const response = await updateStatus({ withdrawal_id: id, status }).unwrap();
      console.log("Update response:", response);
      setFeedback({
        type: "success",
        message: `Withdrawal marked as ${status}`,
      });
      refetch();
    } catch (error: any) {
      console.error("Update error:", error);
      setFeedback({
        type: "error",
        message: error?.data?.detail || "Failed to update status",
      });
    } finally {
      setProcessingWithdrawalId(null);
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.toString());
    setFeedback({
      type: "success",
      message: "Account number copied to clipboard!",
    });
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredWithdrawals.map((w: any) => {
                const { color, icon, text } = getStatusStyle(w.status);
                const levelName = w.level_name || w.user?.level?.level_name || "N/A";
                // Use phone number as account number if account_number is not provided
                const accountNumber = w.account_number || w.user?.phone_number || "N/A";

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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100 flex items-center gap-1">
                      {accountNumber}
                      <button
                        onClick={() => copyToClipboard(accountNumber)}
                        className="text-yellow-300 hover:text-yellow-400"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </button>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                      {w.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(w.id, "success")}
                            disabled={processingWithdrawalId === w.id}
                            className={`bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-white font-semibold text-xs ${
                              processingWithdrawalId === w.id ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {processingWithdrawalId === w.id ? (
                              <>
                                <ClockIcon className="h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Approve"
                            )}
                          </button>
                          <button
                            onClick={() => handleStatusChange(w.id, "reversed")}
                            disabled={processingWithdrawalId === w.id}
                            className={`bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white font-semibold text-xs ${
                              processingWithdrawalId === w.id ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {processingWithdrawalId === w.id ? (
                              <>
                                <ClockIcon className="h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Reverse"
                            )}
                          </button>
                        </>
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
