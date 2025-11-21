// import React from "react";
// import {
//   useGetMyEarningsQuery,
//   useGetMyTransactionHistoryQuery,
// } from "../earnings/earningsAPI";
// import { format } from "date-fns";

// const Earnings: React.FC = () => {
//   // Fetch earnings summary
//   const { data: earnings, isLoading: loadingEarnings } =
//     useGetMyEarningsQuery();
//   // Fetch transaction history
//   const { data: history, isLoading: loadingHistory } =
//     useGetMyTransactionHistoryQuery();

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">My Earnings</h1>

//       {/* Earnings Summary */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         {loadingEarnings ? (
//           Array.from({ length: 6 }).map((_, idx) => (
//             <div
//               key={idx}
//               className="h-24 bg-white rounded-lg shadow animate-pulse"
//             />
//           ))
//         ) : (
//           <>
//             <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-blue-500">
//               <p className="text-gray-500">Today's Earnings</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${earnings?.todays_earnings.toFixed(2)}
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-green-500">
//               <p className="text-gray-500">This Week</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${earnings?.this_weeks_earnings.toFixed(2)}
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-yellow-500">
//               <p className="text-gray-500">This Month</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${earnings?.this_months_earnings.toFixed(2)}
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-purple-500">
//               <p className="text-gray-500">Task Rebates</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${earnings?.task_rebate_earnings.toFixed(2)}
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-pink-500">
//               <p className="text-gray-500">Referral Commissions</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 ${earnings?.referral_commission.toFixed(2)}
//               </p>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Transaction History */}
//       <div className="bg-white shadow rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-gray-900 mb-4">
//           Transaction History
//         </h2>
//         {loadingHistory ? (
//           <div className="space-y-2">
//             {Array.from({ length: 5 }).map((_, idx) => (
//               <div
//                 key={idx}
//                 className="h-12 bg-gray-200 rounded animate-pulse"
//               />
//             ))}
//           </div>
//         ) : history?.history.length === 0 ? (
//           <p className="text-gray-500">No transactions found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Method
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {history?.history.map((tx, idx) => (
//                   <tr key={idx} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 text-sm font-medium text-gray-900 capitalize">
//                       {tx.type}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-gray-900">
//                       ${tx.amount.toFixed(2)}
//                       {tx.type === "withdrawal" && tx.net_amount && (
//                         <span className="text-gray-400 text-xs">
//                           {" "}
//                           (Net: ${tx.net_amount.toFixed(2)})
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-gray-900">
//                       {tx.method || "-"}
//                     </td>
//                     <td
//                       className={`px-4 py-2 text-sm font-semibold ${
//                         tx.status.toLowerCase() === "success"
//                           ? "text-green-600"
//                           : tx.status.toLowerCase() === "pending"
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {tx.status}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-gray-500">
//                       {format(new Date(tx.created_at), "MMM dd, yyyy HH:mm")}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Earnings;




import React from "react";
import {
  useGetMyEarningsQuery,
  useGetMyTransactionHistoryQuery,
} from "../earnings/earningsAPI";
import { format } from "date-fns";

const Earnings: React.FC = () => {
  // Fetch earnings summary
  const { data: earnings, isLoading: loadingEarnings } =
    useGetMyEarningsQuery();
  // Fetch transaction history
  const { data: history, isLoading: loadingHistory } =
    useGetMyTransactionHistoryQuery();

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">My Earnings</h1>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loadingEarnings ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-24 bg-white rounded-lg shadow animate-pulse"
            />
          ))
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-yellow-500">
              <p className="text-yellow-600">Today's Earnings</p>
              <p className="text-2xl font-bold text-yellow-900">
                KES {earnings?.todays_earnings?.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-yellow-600">
              <p className="text-yellow-600">This Week</p>
              <p className="text-2xl font-bold text-yellow-900">
                KES {earnings?.this_weeks_earnings?.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-yellow-700">
              <p className="text-yellow-600">This Month</p>
              <p className="text-2xl font-bold text-yellow-900">
                KES {earnings?.this_months_earnings?.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-purple-500">
              <p className="text-yellow-600">Task Rebates</p>
              <p className="text-2xl font-bold text-yellow-900">
                KES {earnings?.task_rebate_earnings?.toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-between border-l-4 border-pink-500">
              <p className="text-yellow-600">Referral Commissions</p>
              <p className="text-2xl font-bold text-yellow-900">
                KES {earnings?.referral_commission?.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Transaction History */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-yellow-900 mb-4">
          Transaction History
        </h2>
        {loadingHistory ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="h-12 bg-yellow-100 rounded animate-pulse"
              />
            ))}
          </div>
        ) : history?.history.length === 0 ? (
          <p className="text-yellow-600">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-yellow-100">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-yellow-100">
                {history?.history.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50">
                    <td className="px-4 py-2 text-sm font-medium text-yellow-900 capitalize">
                      {tx.type}
                    </td>
                    <td className="px-4 py-2 text-sm text-yellow-900">
                      KES {tx.amount.toFixed(2)}
                      {tx.type === "withdrawal" && tx.net_amount && (
                        <span className="text-yellow-600 text-xs">
                          {" "}
                          (Net: KES {tx.net_amount.toFixed(2)})
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-yellow-900">
                      {tx.method || "-"}
                    </td>
                    <td
                      className={`px-4 py-2 text-sm font-semibold ${
                        tx.status.toLowerCase() === "success"
                          ? "text-green-600"
                          : tx.status.toLowerCase() === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.status}
                    </td>
                    <td className="px-4 py-2 text-sm text-yellow-600">
                      {format(new Date(tx.created_at), "MMM dd, yyyy HH:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Earnings;
