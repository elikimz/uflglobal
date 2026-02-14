


// import React, { useState } from 'react';
// import { useGetAllSuccessWithdrawalsQuery } from '../features/withdrawal/withdrawalAPI';

// const AdminSuccessWithdrawals: React.FC = () => {
//   const { data, isLoading, isError } = useGetAllSuccessWithdrawalsQuery();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterMethod, setFilterMethod] = useState('all');
//   const [filterDate, setFilterDate] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
//   const itemsPerPage = 10;

//   // Filter withdrawals based on search term and filters
//   const filteredWithdrawals = data?.filter(withdrawal => {
//     const matchesSearch =
//       withdrawal.user.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       withdrawal.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       withdrawal.user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesMethod = filterMethod === 'all' || withdrawal.method === filterMethod;

//     const matchesDate = filterDate === 'all' ||
//       (filterDate === 'today' && new Date(withdrawal.created_at).toDateString() === new Date().toDateString()) ||
//       (filterDate === 'week' && new Date(withdrawal.created_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

//     return matchesSearch && matchesMethod && matchesDate;
//   });

//   // Calculate total amount
//   const totalAmount = filteredWithdrawals?.reduce((sum, withdrawal) => sum + withdrawal.amount, 0) || 0;

//   // Pagination logic
//   const totalPages = filteredWithdrawals ? Math.ceil(filteredWithdrawals.length / itemsPerPage) : 0;
//   const paginatedWithdrawals = filteredWithdrawals?.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Modal close handler
//   const closeModal = () => {
//     setSelectedWithdrawal(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* Total Amount Header */}
//       <div className="bg-blue-600 text-white p-4 rounded-lg shadow mb-6">
//         <h1 className="text-xl md:text-2xl font-bold mb-2">Successful Withdrawals</h1>
//         <p className="text-lg md:text-xl">
//           Total: KES {totalAmount.toLocaleString()}
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <input
//             type="text"
//             placeholder="Search by phone, username, or name..."
//             className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//           <select
//             className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={filterMethod}
//             onChange={(e) => {
//               setFilterMethod(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="all">All Methods</option>
//             <option value="mpesa">M-Pesa</option>
//             <option value="bank">Bank</option>
//           </select>
//           <select
//             className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={filterDate}
//             onChange={(e) => {
//               setFilterDate(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="all">All Time</option>
//             <option value="today">Today</option>
//             <option value="week">Last 7 Days</option>
//           </select>
//         </div>
//       </div>

//       {/* Withdrawals Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         {isLoading ? (
//           <div className="p-6 text-center">
//             <div className="animate-pulse">
//               <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
//             </div>
//           </div>
//         ) : isError ? (
//           <div className="p-6 text-center text-red-600 font-semibold">
//             Failed to load withdrawals.
//           </div>
//         ) : filteredWithdrawals && filteredWithdrawals.length > 0 ? (
//           <>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {paginatedWithdrawals?.map((withdrawal) => (
//                     <tr key={withdrawal.withdrawal_id} className="hover:bg-gray-50">
//                       <td className="px-4 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{withdrawal.user.username}</div>
//                         <div className="text-xs text-gray-500">{withdrawal.user.full_name}</div>
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {withdrawal.user.phone_number}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">
//                         KES {withdrawal.amount.toLocaleString()}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {withdrawal.method === 'mpesa' ? 'M-Pesa' : 'Bank'}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(withdrawal.created_at).toLocaleDateString()}
//                       </td>
//                       <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <button
//                           className="text-blue-600 hover:text-blue-900 font-medium"
//                           onClick={() => setSelectedWithdrawal(withdrawal)}
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-between items-center p-4 bg-gray-50">
//                 <div className="text-sm text-gray-600">
//                   Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredWithdrawals.length)}-
//                   {Math.min(currentPage * itemsPerPage, filteredWithdrawals.length)} of {filteredWithdrawals.length} withdrawals
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                   >
//                     Previous
//                   </button>
//                   <span className="px-3 py-1 text-gray-700">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="p-6 text-center text-gray-500">
//             No withdrawals found.
//           </div>
//         )}
//       </div>

//       {/* User Details Modal */}
//       {selectedWithdrawal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">Withdrawal Details</h2>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div className="border-b pb-4">
//                   <h3 className="font-semibold text-gray-700 mb-2">User Information</h3>
//                   <div className="grid grid-cols-2 gap-2 text-sm">
//                     <div>
//                       <p className="text-gray-500">Username</p>
//                       <p className="font-medium">{selectedWithdrawal.user.username}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Full Name</p>
//                       <p className="font-medium">{selectedWithdrawal.user.full_name || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Phone</p>
//                       <p className="font-medium">{selectedWithdrawal.user.phone_number}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Level</p>
//                       <p className="font-medium">{selectedWithdrawal.user.level_name || 'N/A'}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-b pb-4">
//                   <h3 className="font-semibold text-gray-700 mb-2">Payment Information</h3>
//                   <div className="grid grid-cols-2 gap-2 text-sm">
//                     <div>
//                       <p className="text-gray-500">Method</p>
//                       <p className="font-medium">{selectedWithdrawal.method === 'mpesa' ? 'M-Pesa' : 'Bank'}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Amount</p>
//                       <p className="font-medium text-green-600">KES {selectedWithdrawal.amount.toLocaleString()}</p>
//                     </div>
//                     {selectedWithdrawal.method === 'mpesa' && (
//                       <div className="col-span-2">
//                         <p className="text-gray-500">M-Pesa Number</p>
//                         <p className="font-medium">{selectedWithdrawal.user.mpesa_number || 'N/A'}</p>
//                       </div>
//                     )}
//                     {selectedWithdrawal.method === 'bank' && (
//                       <>
//                         <div>
//                           <p className="text-gray-500">Bank Name</p>
//                           <p className="font-medium">{selectedWithdrawal.user.bank_name || 'N/A'}</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500">Account Number</p>
//                           <p className="font-medium">{selectedWithdrawal.user.bank_account_number || 'N/A'}</p>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div className="border-b pb-4">
//                   <h3 className="font-semibold text-gray-700 mb-2">Withdrawal Details</h3>
//                   <div className="grid grid-cols-2 gap-2 text-sm">
//                     <div>
//                       <p className="text-gray-500">Status</p>
//                       <p className="font-medium">{selectedWithdrawal.status}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Net Amount</p>
//                       <p className="font-medium text-green-600">KES {selectedWithdrawal.net_amount.toLocaleString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Date Requested</p>
//                       <p className="font-medium">{new Date(selectedWithdrawal.created_at).toLocaleString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Date Approved</p>
//                       <p className="font-medium">{selectedWithdrawal.approved_at ? new Date(selectedWithdrawal.approved_at).toLocaleString() : 'N/A'}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-4">
//                   <h3 className="font-semibold text-gray-700 mb-2">Wallet Information</h3>
//                   <div className="text-sm">
//                     <p className="text-gray-500">Current Balance</p>
//                     <p className="font-medium text-blue-600">KES {selectedWithdrawal.user.wallet_balance.toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSuccessWithdrawals;





import React, { useState } from 'react';
import { useGetAllSuccessWithdrawalsQuery } from '../features/withdrawal/withdrawalAPI';

const AdminSuccessWithdrawals: React.FC = () => {
  const { data: userWithdrawalsData, isLoading, isError } = useGetAllSuccessWithdrawalsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const itemsPerPage = 10;

  // Calculate total amount across all users
  const totalAmount = userWithdrawalsData?.reduce((sum, userData) => sum + userData.total_withdrawn, 0) || 0;

  // Filter users based on search term and method
  const filteredUsers = userWithdrawalsData?.filter(userData => {
    const matchesSearch =
      userData.user.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (userData.user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

    const matchesMethod = filterMethod === 'all' ||
      (filterMethod === 'mpesa' && userData.withdrawals.some((w: { method: string; }) => w.method === 'mpesa')) ||
      (filterMethod === 'bank' && userData.withdrawals.some((w: { method: string; }) => w.method === 'bank'));

    return matchesSearch && matchesMethod;
  });

  // Pagination logic
  const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / itemsPerPage) : 0;
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle user expansion
  const toggleUserExpansion = (userId: number) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Total Amount Header */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-xl md:text-2xl font-bold mb-2">Successful Withdrawals</h1>
        <p className="text-lg md:text-xl">
          Total: KES {totalAmount.toLocaleString()}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by phone, username, or name..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterMethod}
            onChange={(e) => {
              setFilterMethod(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Methods</option>
            <option value="mpesa">M-Pesa Only</option>
            <option value="bank">Bank Only</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : isError ? (
          <div className="p-6 text-center text-red-600 font-semibold">
            Failed to load withdrawals.
          </div>
        ) : paginatedUsers && paginatedUsers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Withdrawn</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Withdrawals</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((userData) => (
                    <React.Fragment key={userData.user.user_id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{userData.user.username}</div>
                          <div className="text-xs text-gray-500">{userData.user.full_name}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {userData.user.phone_number}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          KES {userData.total_withdrawn.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            className="text-blue-600 hover:text-blue-900 font-medium flex items-center"
                            onClick={() => toggleUserExpansion(userData.user.user_id)}
                          >
                            {userData.withdrawals.length} withdrawal{userData.withdrawals.length !== 1 ? 's' : ''}
                            <svg
                              className={`w-4 h-4 ml-1 transition-transform ${expandedUserId === userData.user.user_id ? 'transform rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {userData.user.level_name || 'N/A'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          KES {userData.user.wallet_balance.toLocaleString()}
                        </td>
                      </tr>

                      {/* Expanded row for withdrawal details */}
                      {expandedUserId === userData.user.user_id && (
                        <tr>
                          <td colSpan={6} className="px-4 py-2 bg-gray-50">
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Amount</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {userData.withdrawals.map((withdrawal: { withdrawal_id: React.Key | null | undefined; created_at: string | number | Date; amount: { toLocaleString: () => string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; method: string; net_amount: { toLocaleString: () => string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
                                    <tr key={withdrawal.withdrawal_id} className="hover:bg-gray-50">
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(withdrawal.created_at).toLocaleString()}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-600">
                                        KES {withdrawal.amount.toLocaleString()}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {withdrawal.method === 'mpesa' ? 'M-Pesa' : 'Bank'}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        KES {withdrawal.net_amount.toLocaleString()}
                                      </td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                          withdrawal.status === 'success' ? 'bg-green-100 text-green-800' :
                                          'bg-yellow-100 text-yellow-800'
                                        }`}>
                                          {withdrawal.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center p-4 bg-gray-50">
                <div className="text-sm text-gray-600">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredUsers?.length ?? 0)}-
                  {Math.min(currentPage * itemsPerPage, filteredUsers?.length ?? 0)} of {filteredUsers?.length ?? 0} users
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No withdrawals found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSuccessWithdrawals;
