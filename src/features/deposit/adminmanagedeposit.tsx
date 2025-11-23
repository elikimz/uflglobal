// import React from "react";
// import { motion } from "framer-motion";
// import {
//   ArrowPathIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   TrashIcon,
// } from "@heroicons/react/24/solid";
// import {
//   useGetAllDepositsQuery,
//   useUpdateDepositStatusMutation,
//   useDeleteDepositMutation,
// } from "../deposit/depositAPI";

// const AdminManageDeposits: React.FC = () => {
//   const { data: deposits, isLoading, refetch } = useGetAllDepositsQuery();
//   const [updateDepositStatus, { isLoading: updating }] =
//     useUpdateDepositStatusMutation();
//   const [deleteDeposit, { isLoading: deleting }] = useDeleteDepositMutation();

//   const handleStatusChange = async (
//     id: number,
//     status: "approved" | "rejected"
//   ) => {
//     try {
//       await updateDepositStatus({ deposit_id: id, status }).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Failed to update status:", err);
//       alert("Failed to update deposit status");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this deposit?"))
//       return;
//     try {
//       await deleteDeposit(id).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Failed to delete deposit:", err);
//       alert("Failed to delete deposit");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="relative min-h-screen w-full text-white px-4 py-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 overflow-x-hidden"
//     >
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold mb-1 flex justify-center items-center gap-2 text-indigo-300">
//           Admin Deposit Management
//         </h1>
//         <p className="text-indigo-200 text-sm">
//           Approve, reject, or delete user deposits
//         </p>
//       </div>

//       <div className="flex justify-end mb-4 max-w-md mx-auto">
//         <button
//           onClick={() => refetch()}
//           className="flex items-center gap-1 text-indigo-300 hover:text-indigo-400 transition"
//         >
//           <ArrowPathIcon className="h-4 w-4" />
//           Refresh
//         </button>
//       </div>

//       <div className="max-w-3xl mx-auto space-y-3">
//         {isLoading ? (
//           <p className="text-indigo-200 text-center">Loading deposits...</p>
//         ) : deposits && deposits.length > 0 ? (
//           deposits.map((deposit) => (
//             <motion.div
//               key={deposit.id}
//               className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-sm text-indigo-100 shadow-sm hover:bg-white/20 transition flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2"
//             >
//               <div className="flex flex-col gap-1 w-full md:w-2/3">
//                 <span className="font-medium text-white">
//                   KES {deposit.amount.toFixed(2)}
//                 </span>
//                 <div className="text-xs">
//                   {deposit.payer_name} ({deposit.payer_number})
//                 </div>
//                 <div className="text-[11px] text-indigo-300 mt-1">
//                   {new Date(deposit.created_at).toLocaleString()}
//                 </div>
//                 {deposit.payment_message && (
//                   <div className="text-[11px] text-indigo-200 mt-1">
//                     "{deposit.payment_message}"
//                   </div>
//                 )}
//               </div>

//               <div className="flex items-center gap-2 mt-2 md:mt-0">
//                 {/* Status label */}
//                 <span
//                   className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                     deposit.status === "approved"
//                       ? "bg-green-700 text-green-100"
//                       : deposit.status === "pending"
//                       ? "bg-yellow-600 text-yellow-100"
//                       : "bg-red-700 text-red-100"
//                   }`}
//                 >
//                   {deposit.status}
//                 </span>

//                 {/* Approve button */}
//                 {deposit.status === "pending" && (
//                   <>
//                     <button
//                       onClick={() => handleStatusChange(deposit.id, "approved")}
//                       disabled={updating}
//                       className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded-md transition text-white flex items-center gap-1"
//                     >
//                       <CheckCircleIcon className="h-4 w-4" />
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(deposit.id, "rejected")}
//                       disabled={updating}
//                       className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md transition text-white flex items-center gap-1"
//                     >
//                       <XCircleIcon className="h-4 w-4" />
//                       Reject
//                     </button>
//                   </>
//                 )}

//                 {/* Delete button */}
//                 <button
//                   onClick={() => handleDelete(deposit.id)}
//                   disabled={deleting}
//                   className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded-md transition text-white flex items-center gap-1"
//                 >
//                   <TrashIcon className="h-4 w-4" />
//                   Delete
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-indigo-200 text-center">No deposits found.</p>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AdminManageDeposits;





import React from "react";
import { motion } from "framer-motion";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  useGetAllDepositsQuery,
  useUpdateDepositStatusMutation,
  useDeleteDepositMutation,
} from "../deposit/depositAPI";

const AdminManageDeposits: React.FC = () => {
  const { data: deposits, isLoading, refetch } = useGetAllDepositsQuery();
  const [updateDepositStatus, { isLoading: updating }] =
    useUpdateDepositStatusMutation();
  const [deleteDeposit, { isLoading: deleting }] = useDeleteDepositMutation();

  const handleStatusChange = async (
    id: number,
    status: "approved" | "rejected"
  ) => {
    try {
      await updateDepositStatus({ deposit_id: id, status }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update deposit status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this deposit?"))
      return;
    try {
      await deleteDeposit(id).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to delete deposit:", err);
      alert("Failed to delete deposit");
    }
  };

  // Sort deposits by created_at in descending order (newest first)
  const sortedDeposits = deposits
    ? [...deposits].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full text-white px-4 py-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 overflow-x-hidden"
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1 flex justify-center items-center gap-2 text-indigo-300">
          Admin Deposit Management
        </h1>
        <p className="text-indigo-200 text-sm">
          Approve, reject, or delete user deposits
        </p>
      </div>
      <div className="flex justify-end mb-4 max-w-md mx-auto">
        <button
          onClick={() => refetch()}
          className="flex items-center gap-1 text-indigo-300 hover:text-indigo-400 transition"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Refresh
        </button>
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        {isLoading ? (
          <p className="text-indigo-200 text-center">Loading deposits...</p>
        ) : sortedDeposits.length > 0 ? (
          sortedDeposits.map((deposit) => (
            <motion.div
              key={deposit.id}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 text-sm text-indigo-100 shadow-sm hover:bg-white/20 transition flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2"
            >
              <div className="flex flex-col gap-1 w-full md:w-2/3">
                <span className="font-medium text-white">
                  KES {deposit.amount.toFixed(2)}
                </span>
                <div className="text-xs">
                  {deposit.payer_name} ({deposit.payer_number})
                </div>
                <div className="text-[11px] text-indigo-300 mt-1">
                  {new Date(deposit.created_at).toLocaleString()}
                </div>
                {deposit.payment_message && (
                  <div className="text-[11px] text-indigo-200 mt-1">
                    "{deposit.payment_message}"
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    deposit.status === "approved"
                      ? "bg-green-700 text-green-100"
                      : deposit.status === "pending"
                      ? "bg-yellow-600 text-yellow-100"
                      : "bg-red-700 text-red-100"
                  }`}
                >
                  {deposit.status}
                </span>
                {deposit.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(deposit.id, "approved")}
                      disabled={updating}
                      className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded-md transition text-white flex items-center gap-1"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(deposit.id, "rejected")}
                      disabled={updating}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded-md transition text-white flex items-center gap-1"
                    >
                      <XCircleIcon className="h-4 w-4" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(deposit.id)}
                  disabled={deleting}
                  className="bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded-md transition text-white flex items-center gap-1"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-indigo-200 text-center">No deposits found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AdminManageDeposits;
