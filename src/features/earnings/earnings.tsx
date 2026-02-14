


// import React from 'react';
// import {
//   useGetMyEarningsQuery,
//   useGetMyTransactionHistoryQuery,
// } from '../earnings/earningsAPI';
// import { format } from 'date-fns';

// const Earnings: React.FC = () => {
//   // Fetch earnings summary
//   const { data: earnings, isLoading: loadingEarnings } =
//     useGetMyEarningsQuery();
//   // Fetch transaction history
//   const { data: history, isLoading: loadingHistory } =
//     useGetMyTransactionHistoryQuery();

//   return (
//     <div className="p-4 bg-yellow-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-yellow-900 mb-6">My Earnings</h1>

//       {/* Earnings Summary - Grid of cards */}
//       <div className="grid grid-cols-3 gap-3 mb-8">
//         {loadingEarnings ? (
//           Array.from({ length: 9 }).map((_, idx) => (
//             <div
//               key={idx}
//               className="h-20 bg-white rounded-xl shadow animate-pulse"
//             />
//           ))
//         ) : (
//           <>
//             {/* First row */}
//             <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
//               <p className="text-sm text-yellow-600">Yesterday's earnings</p>
//               <p className="text-xl font-bold text-yellow-900">
//                 KES {earnings?.yesterdays_earnings?.toFixed(2) || '0.00'}
//               </p>
//             </div>

//             <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
//               <p className="text-sm text-yellow-600">Today's earnings</p>
//               <p className="text-xl font-bold text-yellow-900">
//                 KES {earnings?.todays_earnings?.toFixed(2) || '0.00'}
//               </p>
//             </div>

//             {/* Second row */}
//             <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
//               <p className="text-sm text-yellow-600">Income this week</p>
//               <p className="text-xl font-bold text-yellow-900">
//                 KES {earnings?.this_weeks_earnings?.toFixed(2) || '0.00'}
//               </p>
//             </div>

//             <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
//               <p className="text-sm text-yellow-600">referral</p>
//               <p className="text-xl font-bold text-yellow-900">
//                 KES {earnings?.referral_commission?.toFixed(2) || '0.00'}
//               </p>
//             </div>

//             {/* Third row */}
//             <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
//               <p className="text-sm text-yellow-600">Monthly income</p>
//               <p className="text-xl font-bold text-yellow-900">
//                 KES {earnings?.this_months_earnings?.toFixed(2) || '0.00'}
//               </p>
//             </div>

//             <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
//               <p className="text-sm text-yellow-600">
//                 Subordinate task rebates
//               </p>
//               <p className="text-xl font-bold text-yellow-900">
//                 KES {earnings?.task_rebate_earnings?.toFixed(2) || '0.00'}
//               </p>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Transaction History */}
//       <div className="bg-white shadow rounded-xl p-6">
//         <h2 className="text-xl font-semibold text-yellow-900 mb-4">
//           Transaction History
//         </h2>
//         {loadingHistory ? (
//           <div className="space-y-2">
//             {Array.from({ length: 5 }).map((_, idx) => (
//               <div
//                 key={idx}
//                 className="h-12 bg-yellow-100 rounded animate-pulse"
//               />
//             ))}
//           </div>
//         ) : history?.history.length === 0 ? (
//           <p className="text-yellow-600">No transactions found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-yellow-100">
//               <thead className="bg-yellow-50">
//                 <tr>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
//                     Method
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-2 text-left text-xs font-medium text-yellow-600 uppercase tracking-wider">
//                     Date
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-yellow-100">
//                 {history?.history.map((tx, idx) => (
//                   <tr key={idx} className="hover:bg-yellow-50">
//                     <td className="px-4 py-2 text-sm font-medium text-yellow-900 capitalize">
//                       {tx.type}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-yellow-900">
//                       KES {tx.amount.toFixed(2)}
//                       {tx.type === 'withdrawal' && tx.net_amount && (
//                         <span className="text-yellow-600 text-xs">
//                           {' '}
//                           (Net: KES {tx.net_amount.toFixed(2)})
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-yellow-900">
//                       {tx.method || '-'}
//                     </td>
//                     <td
//                       className={`px-4 py-2 text-sm font-semibold ${
//                         tx.status.toLowerCase() === 'success'
//                           ? 'text-green-600'
//                           : tx.status.toLowerCase() === 'pending'
//                             ? 'text-yellow-600'
//                             : 'text-red-600'
//                       }`}
//                     >
//                       {tx.status}
//                     </td>
//                     <td className="px-4 py-2 text-sm text-yellow-600">
//                       {format(new Date(tx.created_at), 'MMM dd, yyyy HH:mm')}
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





import React from 'react';
import {
  useGetMyEarningsQuery,
  useGetMyTransactionHistoryQuery,
} from '../earnings/earningsAPI';
import { useGetMySuccessWithdrawalTotalQuery } from '../withdrawal/withdrawalAPI';
import { format } from 'date-fns';

const Earnings: React.FC = () => {
  // Earnings summary
  const { data: earnings, isLoading: loadingEarnings } = useGetMyEarningsQuery();

  // Transaction history
  const { data: history, isLoading: loadingHistory } = useGetMyTransactionHistoryQuery();

  // Total successful withdrawals
  const { data: withdrawalTotals, isLoading: loadingWithdrawTotals } =
    useGetMySuccessWithdrawalTotalQuery();

  const loadingCards = loadingEarnings || loadingWithdrawTotals;

  return (
    <div className="p-4 bg-yellow-50 min-h-screen">
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">My Earnings</h1>

      {/* Earnings Summary - Grid of cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {loadingCards ? (
          Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className="h-20 bg-white rounded-xl shadow animate-pulse" />
          ))
        ) : (
          <>
            {/* Row 1 */}
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-yellow-600">Yesterday's earnings</p>
              <p className="text-xl font-bold text-yellow-900">
                KES {earnings?.yesterdays_earnings?.toFixed(2) || '0.00'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-yellow-600">Today's earnings</p>
              <p className="text-xl font-bold text-yellow-900">
                KES {earnings?.todays_earnings?.toFixed(2) || '0.00'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-yellow-600">Income this week</p>
              <p className="text-xl font-bold text-yellow-900">
                KES {earnings?.this_weeks_earnings?.toFixed(2) || '0.00'}
              </p>
            </div>

            {/* Row 2 */}
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-yellow-600">Referral commission</p>
              <p className="text-xl font-bold text-yellow-900">
                KES {earnings?.referral_commission?.toFixed(2) || '0.00'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-yellow-600">Monthly income</p>
              <p className="text-xl font-bold text-yellow-900">
                KES {earnings?.this_months_earnings?.toFixed(2) || '0.00'}
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-yellow-600">Task rebate earnings</p>
              <p className="text-xl font-bold text-yellow-900">
                KES {earnings?.task_rebate_earnings?.toFixed(2) || '0.00'}
              </p>
            </div>

            {/* Row 3 — My Total Withdrawn */}
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-sm text-yellow-600">Total Withdrawn</p>
              <p className="text-xl font-bold text-green-600">
                KES {withdrawalTotals?.total_success_withdrawn?.toFixed(2) || '0.00'}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Transaction History */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-yellow-900 mb-4">
          Transaction History
        </h2>

        {loadingHistory ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="h-12 bg-yellow-100 rounded animate-pulse" />
            ))}
          </div>
        ) : history?.history.length === 0 ? (
          <p className="text-yellow-600">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-yellow-100">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-2 text-xs text-yellow-600">Type</th>
                  <th className="px-4 py-2 text-xs text-yellow-600">Amount</th>
                  <th className="px-4 py-2 text-xs text-yellow-600">Method</th>
                  <th className="px-4 py-2 text-xs text-yellow-600">Status</th>
                  <th className="px-4 py-2 text-xs text-yellow-600">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-yellow-100">
                {history?.history.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50">
                    <td className="px-4 py-2 capitalize">{tx.type}</td>
                    <td className="px-4 py-2">
                      KES {tx.amount.toFixed(2)}
                      {tx.type === 'withdrawal' && tx.net_amount && (
                        <span className="text-xs text-yellow-600">
                          {' '}Net: {tx.net_amount.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">{tx.method || '-'}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        tx.status === 'success'
                          ? 'text-green-600'
                          : tx.status === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {tx.status}
                    </td>
                    <td className="px-4 py-2 text-yellow-600">
                      {format(new Date(tx.created_at), 'MMM dd, yyyy HH:mm')}
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
