

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   BanknotesIcon,
//   PencilSquareIcon,
//   CheckCircleIcon,
//   XCircleIcon,
//   ArrowPathIcon,
//   MagnifyingGlassIcon
// } from '@heroicons/react/24/solid';
// import { useGetAllWalletsQuery, useUpdateWalletBalanceMutation } from '../withdrawal/withdrawalAPI';

// // Define TypeScript interfaces based on backend response
// interface Wallet {
//   id: number;
//   user_id: number;
//   recharge_wallet: number;
//   commission_wallet: number;
//   created_at: string;
//   updated_at: string;
// }

// interface WalletUpdateInput {
//   recharge_wallet?: number;
//   commission_wallet?: number;
// }

// interface Feedback {
//   type: 'success' | 'error' | null;
//   message: string;
// }

// const AdminWalletManagement: React.FC = () => {
//   const { data: wallets = [], isLoading, refetch } = useGetAllWalletsQuery();
//   const [updateWalletBalance] = useUpdateWalletBalanceMutation();
//   const [editingWalletId, setEditingWalletId] = useState<number | null>(null);
//   const [editValues, setEditValues] = useState<WalletUpdateInput>({ recharge_wallet: 0, commission_wallet: 0 });
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [feedback, setFeedback] = useState<Feedback>({ type: null, message: '' });

//   // Sort wallets by ID in ascending order
//   const sortedWallets: Wallet[] = [...(wallets as Wallet[])].sort((a, b) => a.id - b.id);

//   // Filter wallets based on search term
//   const filteredWallets: Wallet[] = sortedWallets.filter(wallet =>
//     wallet.user_id.toString().includes(searchTerm) ||
//     wallet.recharge_wallet.toString().includes(searchTerm) ||
//     wallet.commission_wallet.toString().includes(searchTerm) ||
//     wallet.id.toString().includes(searchTerm)
//   );

//   const handleEditClick = (wallet: Wallet) => {
//     setEditingWalletId(wallet.id);
//     setEditValues({
//       recharge_wallet: wallet.recharge_wallet,
//       commission_wallet: wallet.commission_wallet
//     });
//   };

//   const handleCancelEdit = () => {
//     setEditingWalletId(null);
//   };

//   const handleUpdateWallet = async () => {
//     if (!editingWalletId) return;

//     try {
//       await updateWalletBalance({
//         wallet_id: editingWalletId,
//         ...editValues
//       }).unwrap();

//       setFeedback({ type: 'success', message: 'Wallet balance updated successfully!' });
//       refetch();
//       setEditingWalletId(null);
//     } catch (error: any) {
//       setFeedback({ type: 'error', message: error.data?.detail || 'Failed to update wallet balance' });
//     }
//   };

//   const handleInputChange = (field: keyof WalletUpdateInput, value: string) => {
//     setEditValues({
//       ...editValues,
//       [field]: parseFloat(value) || 0
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gray-50 p-6"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-indigo-800 flex items-center gap-3">
//             <BanknotesIcon className="h-8 w-8 text-indigo-600" />
//             Wallet Management
//           </h1>
//           <button
//             onClick={() => refetch()}
//             className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
//           >
//             <ArrowPathIcon className="h-5 w-5" />
//             Refresh
//           </button>
//         </div>

//         {/* Search */}
//         <div className="mb-6 max-w-md">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search wallets by ID, User ID, or amount..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>
//         </div>

//         {/* Feedback */}
//         {feedback.message && (
//           <div className={`mb-6 p-4 rounded-lg ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//             <div className="flex items-center gap-2">
//               {feedback.type === 'success' ? (
//                 <CheckCircleIcon className="h-5 w-5 text-green-600" />
//               ) : (
//                 <XCircleIcon className="h-5 w-5 text-red-600" />
//               )}
//               <span>{feedback.message}</span>
//             </div>
//           </div>
//         )}

//         {/* Wallet Table */}
//         <div className="bg-white shadow-sm rounded-xl overflow-hidden">
//           {isLoading ? (
//             <div className="p-8 text-center text-gray-500">Loading wallets...</div>
//           ) : filteredWallets.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">No wallets found</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-indigo-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">User ID</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Recharge Wallet</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Commission Wallet</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Created At</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredWallets.map((wallet: Wallet) => (
//                     <tr key={wallet.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{wallet.id}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{wallet.user_id}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         KES {wallet.recharge_wallet.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         KES {wallet.commission_wallet.toFixed(2)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(wallet.created_at).toLocaleString('en-KE', {
//                           year: 'numeric',
//                           month: 'short',
//                           day: 'numeric',
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         })}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         {editingWalletId === wallet.id ? (
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={handleUpdateWallet}
//                               className="text-green-600 hover:text-green-800 flex items-center gap-1"
//                             >
//                               <CheckCircleIcon className="h-4 w-4" />
//                               Save
//                             </button>
//                             <button
//                               onClick={handleCancelEdit}
//                               className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
//                             >
//                               <XCircleIcon className="h-4 w-4" />
//                               Cancel
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             onClick={() => handleEditClick(wallet)}
//                             className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
//                           >
//                             <PencilSquareIcon className="h-4 w-4" />
//                             Edit
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Edit Modal */}
//         {editingWalletId && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
//             >
//               <h2 className="text-xl font-bold text-indigo-800 mb-4">Edit Wallet Balance</h2>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Recharge Wallet</label>
//                   <input
//                     type="number"
//                     value={editValues.recharge_wallet}
//                     onChange={(e) => handleInputChange('recharge_wallet', e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     step="0.01"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Commission Wallet</label>
//                   <input
//                     type="number"
//                     value={editValues.commission_wallet}
//                     onChange={(e) => handleInputChange('commission_wallet', e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     step="0.01"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end gap-3">
//                 <button
//                   onClick={handleCancelEdit}
//                   className="px-4 py-2 text-gray-700 hover:text-gray-900"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdateWallet}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-750 transition-colors"
//                 >
//                   Save
//                    Changes
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default AdminWalletManagement;






import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BanknotesIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/solid';
import { useGetAllWalletsQuery, useUpdateWalletBalanceMutation } from '../withdrawal/withdrawalAPI';

// Define TypeScript interfaces based on backend response
interface Wallet {
  id: number;
  user_id: number;
  recharge_wallet: number;
  commission_wallet: number;
  created_at: string;
  updated_at: string;
  username: string;
  level_name: string | null;
}

interface WalletUpdateInput {
  recharge_wallet?: number;
  commission_wallet?: number;
}

interface Feedback {
  type: 'success' | 'error' | null;
  message: string;
}

const AdminWalletManagement: React.FC = () => {
  const { data: wallets = [], isLoading, refetch } = useGetAllWalletsQuery();
  const [updateWalletBalance] = useUpdateWalletBalanceMutation();
  const [editingWalletId, setEditingWalletId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<WalletUpdateInput>({ recharge_wallet: 0, commission_wallet: 0 });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [feedback, setFeedback] = useState<Feedback>({ type: null, message: '' });

  // Sort wallets by ID in ascending order
  const sortedWallets: Wallet[] = [...(wallets as Wallet[])].sort((a, b) => a.id - b.id);

  // Filter wallets based on search term
  const filteredWallets: Wallet[] = sortedWallets.filter(wallet =>
    wallet.id.toString().includes(searchTerm) ||
    wallet.user_id.toString().includes(searchTerm) ||
    wallet.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (wallet.level_name && wallet.level_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    wallet.recharge_wallet.toString().includes(searchTerm) ||
    wallet.commission_wallet.toString().includes(searchTerm)
  );

  const handleEditClick = (wallet: Wallet) => {
    setEditingWalletId(wallet.id);
    setEditValues({
      recharge_wallet: wallet.recharge_wallet,
      commission_wallet: wallet.commission_wallet
    });
  };

  const handleCancelEdit = () => {
    setEditingWalletId(null);
  };

  const handleUpdateWallet = async () => {
    if (!editingWalletId) return;

    try {
      await updateWalletBalance({
        wallet_id: editingWalletId,
        ...editValues
      }).unwrap();

      setFeedback({ type: 'success', message: 'Wallet balance updated successfully!' });
      refetch();
      setEditingWalletId(null);
    } catch (error: any) {
      setFeedback({ type: 'error', message: error.data?.detail || 'Failed to update wallet balance' });
    }
  };

  const handleInputChange = (field: keyof WalletUpdateInput, value: string) => {
    setEditValues({
      ...editValues,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 flex items-center gap-3">
            <BanknotesIcon className="h-8 w-8 text-indigo-600" />
            Wallet Management
          </h1>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Refresh
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search wallets by ID, User ID, username, level, or amount..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Feedback */}
        {feedback.message && (
          <div className={`mb-6 p-4 rounded-lg ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-600" />
              )}
              <span>{feedback.message}</span>
            </div>
          </div>
        )}

        {/* Wallet Table */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Loading wallets...</div>
          ) : filteredWallets.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No wallets found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">User ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Recharge Wallet</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Commission Wallet</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredWallets.map((wallet: Wallet) => (
                    <tr key={wallet.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{wallet.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{wallet.user_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{wallet.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {wallet.level_name || 'None'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        KES {wallet.recharge_wallet.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        KES {wallet.commission_wallet.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(wallet.created_at).toLocaleString('en-KE', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingWalletId === wallet.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleUpdateWallet}
                              className="text-green-600 hover:text-green-800 flex items-center gap-1"
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            >
                              <XCircleIcon className="h-4 w-4" />
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(wallet)}
                            className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingWalletId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-indigo-800 mb-4">Edit Wallet Balance</h2>
              <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm font-medium text-indigo-800">
                  Editing wallet for: <span className="font-bold">{wallets.find(w => w.id === editingWalletId)?.username}</span>
                </p>
                <p className="text-sm text-indigo-700">
                  Level: <span className="font-medium">{wallets.find(w => w.id === editingWalletId)?.level_name || 'None'}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recharge Wallet</label>
                  <input
                    type="number"
                    value={editValues.recharge_wallet}
                    onChange={(e) => handleInputChange('recharge_wallet', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commission Wallet</label>
                  <input
                    type="number"
                    value={editValues.commission_wallet}
                    onChange={(e) => handleInputChange('commission_wallet', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateWallet}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminWalletManagement;
