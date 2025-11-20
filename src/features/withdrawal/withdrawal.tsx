



// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   BanknotesIcon,
//   ClipboardDocumentListIcon,
//   CheckCircleIcon,
//   ClockIcon,
// } from "@heroicons/react/24/solid";
// import {
//   useCreateWithdrawalMutation,
//   useGetMyWithdrawalsQuery,
// } from "../withdrawal/withdrawalAPI";

// const Withdrawal: React.FC = () => {
//   const [amount, setAmount] = useState<number | "">("");
//   const [pin, setPin] = useState<string>("");
//   const [walletType, setWalletType] = useState<"commission">("commission");
//   const [createWithdrawal, { isLoading: isSubmitting }] =
//     useCreateWithdrawalMutation();
//   const {
//     data: withdrawals = [],
//     isLoading,
//     refetch,
//   } = useGetMyWithdrawalsQuery();
//   const [feedback, setFeedback] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!amount || amount <= 0) {
//       setFeedback({ type: "error", message: "Enter a valid amount" });
//       return;
//     }
//     if (!pin || pin.length < 4) {
//       setFeedback({ type: "error", message: "Enter your 4-digit PIN" });
//       return;
//     }
//     try {
//       await createWithdrawal({
//         amount: Number(amount),
//         method: "mpesa",
//         wallet_type: walletType,
//         withdrawal_pin: pin,
//       }).unwrap();
//       setFeedback({
//         type: "success",
//         message: "Withdrawal requested successfully",
//       });
//       setAmount("");
//       setPin("");
//       refetch();
//     } catch (error: any) {
//       setFeedback({
//         type: "error",
//         message: error?.data?.detail || "Failed to request withdrawal",
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
//       case "reversed":
//         return {
//           color: "bg-blue-900/50 text-blue-100",
//           icon: <ClockIcon className="h-5 w-5 text-blue-400" />,
//           text: "Reversed",
//         };
//       default:
//         return {
//           color: "bg-yellow-900/50 text-yellow-100",
//           icon: <ClockIcon className="h-5 w-5 text-yellow-400" />,
//           text: "Pending",
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
//         <BanknotesIcon className="h-8 w-8" /> Withdraw Funds
//       </h1>

//       {/* Withdrawal Form */}
//       <section className="max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow mb-10">
//         <h2 className="text-xl font-semibold text-yellow-400 mb-4">
//           Request Withdrawal
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-yellow-100 mb-1">Amount (KES)</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) =>
//                 setAmount(e.target.value === "" ? "" : Number(e.target.value))
//               }
//               className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               placeholder="Enter amount"
//             />
//           </div>
//           <div>
//             <label className="block text-yellow-100 mb-1">Withdrawal PIN</label>
//             <input
//               type="password"
//               value={pin}
//               onChange={(e) => setPin(e.target.value)}
//               className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               placeholder="Enter 4-digit PIN"
//             />
//           </div>
//           <div>
//             <label className="block text-yellow-100 mb-1">Wallet Type</label>
//             <select
//               value={walletType}
//               onChange={(e) => setWalletType(e.target.value as "commission")}
//               className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             >
//               <option value="commission">Commission Wallet</option>
//             </select>
//           </div>
//           {feedback && (
//             <div
//               className={`flex items-center gap-2 p-3 rounded-lg ${
//                 feedback.type === "success"
//                   ? "bg-green-900/50 text-green-100"
//                   : "bg-red-900/50 text-red-100"
//               }`}
//             >
//               {feedback.type === "success" ? (
//                 <CheckCircleIcon className="h-5 w-5" />
//               ) : (
//                 <ClockIcon className="h-5 w-5" />
//               )}
//               <span>{feedback.message}</span>
//             </div>
//           )}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors py-3 rounded-lg font-semibold text-gray-900"
//           >
//             {isSubmitting ? "Submitting..." : "Request Withdrawal"}
//           </button>
//         </form>
//       </section>

//       {/* Withdrawal History Table */}
//       <section className="max-w-6xl mx-auto">
//         <h2 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
//           <ClipboardDocumentListIcon className="h-6 w-6" /> My Withdrawals
//         </h2>
//         {isLoading ? (
//           <p className="text-yellow-100 text-center">Loading withdrawals...</p>
//         ) : withdrawals.length === 0 ? (
//           <p className="text-yellow-100 text-center">No withdrawals yet.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow">
//               <thead>
//                 <tr className="border-b border-white/20">
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Amount (KES)
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Wallet
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Method
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Account Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Account Number
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Transaction Fee (KES)
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Net Amount (KES)
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Approved
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                     Admin Remarks
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {withdrawals.map((w: any) => {
//                   const { color, icon, text } = getStatusStyle(w.status);
//                   return (
//                     <tr
//                       key={w.id}
//                       className="border-b border-white/10 hover:bg-white/5"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
//                         {w.amount}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                         <div
//                           className={`flex items-center gap-1 ${color} px-3 py-1 rounded-full w-fit`}
//                         >
//                           {icon}
//                           <span className="text-xs">{text}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                         {new Date(w.created_at).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                         {w.wallet_type}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                         {w.method}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                         {w.account_name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                         {w.account_number}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                         {w.transaction_fee}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                         {w.net_amount}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                         {w.approved_at
//                           ? new Date(w.approved_at).toLocaleDateString()
//                           : "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                         {w.admin_remarks || "N/A"}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </motion.div>
//   );
// };

// export default Withdrawal;






import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import {
  useCreateWithdrawalMutation,
  useGetMyWithdrawalsQuery,
} from "../withdrawal/withdrawalAPI";

const Withdrawal: React.FC = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [pin, setPin] = useState<string>("");
  const [walletType, setWalletType] = useState<"commission">("commission");
  const [createWithdrawal, { isLoading: isSubmitting }] =
    useCreateWithdrawalMutation();
  const {
    data: withdrawals = [],
    isLoading,
    refetch,
  } = useGetMyWithdrawalsQuery();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Mock function to check if M-Pesa details are set
  // In a real app, you would fetch this from your API or context
  const hasMpesaDetails = true; // Replace with actual logic to check M-Pesa details

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setFeedback({ type: "error", message: "Enter a valid amount" });
      return;
    }
    if (!pin || pin.length < 4) {
      setFeedback({ type: "error", message: "Enter your 4-digit PIN" });
      return;
    }
    try {
      await createWithdrawal({
        amount: Number(amount),
        method: "mpesa",
        wallet_type: walletType,
        withdrawal_pin: pin,
      }).unwrap();
      setFeedback({
        type: "success",
        message: "Withdrawal requested successfully",
      });
      setAmount("");
      setPin("");
      refetch();
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error?.data?.detail || "Failed to request withdrawal",
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
      case "reversed":
        return {
          color: "bg-blue-900/50 text-blue-100",
          icon: <ClockIcon className="h-5 w-5 text-blue-400" />,
          text: "Reversed",
        };
      default:
        return {
          color: "bg-yellow-900/50 text-yellow-100",
          icon: <ClockIcon className="h-5 w-5 text-yellow-400" />,
          text: "Pending",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950"
    >
      <h1 className="text-3xl font-bold text-yellow-400 flex items-center gap-2 mb-8">
        <BanknotesIcon className="h-8 w-8" /> Withdraw Funds
      </h1>

      {!hasMpesaDetails && (
        <div className="max-w-md mx-auto bg-red-900/30 backdrop-blur-xl border border-red-900/50 p-6 rounded-2xl shadow mb-6">
          <div className="flex items-center gap-3 mb-4">
            <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
            <h3 className="text-lg font-semibold text-red-100">
              M-Pesa Details Missing
            </h3>
          </div>
          <p className="text-red-100 mb-4">
            You need to set your M-Pesa details before requesting a withdrawal.
          </p>
          <Link
            to="/security"
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors py-2 px-4 rounded-lg font-semibold text-gray-900 text-center block"
          >
            Set M-Pesa Details
          </Link>
        </div>
      )}

      {/* Withdrawal Form */}
      <section className="max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">
          Request Withdrawal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-100 mb-1">Amount (KES)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-yellow-100 mb-1">Withdrawal PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter 4-digit PIN"
            />
          </div>
          <div>
            <label className="block text-yellow-100 mb-1">Wallet Type</label>
            <select
              value={walletType}
              onChange={(e) => setWalletType(e.target.value as "commission")}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="commission">Commission Wallet</option>
            </select>
          </div>
          {feedback && (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg ${
                feedback.type === "success"
                  ? "bg-green-900/50 text-green-100"
                  : "bg-red-900/50 text-red-100"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !hasMpesaDetails}
            className="w-full bg-yellow-500 hover:bg-yellow-600 transition-colors py-3 rounded-lg font-semibold text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Request Withdrawal"}
          </button>
        </form>
      </section>

      {/* Withdrawal History Table */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
          <ClipboardDocumentListIcon className="h-6 w-6" /> My Withdrawals
        </h2>
        {isLoading ? (
          <p className="text-yellow-100 text-center">Loading withdrawals...</p>
        ) : withdrawals.length === 0 ? (
          <p className="text-yellow-100 text-center">No withdrawals yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow">
              <thead>
                <tr className="border-b border-white/20">
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
                    Admin Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w: any) => {
                  const { color, icon, text } = getStatusStyle(w.status);
                  return (
                    <tr
                      key={w.id}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
                        {w.admin_remarks || "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default Withdrawal;
