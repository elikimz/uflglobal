


// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { motion } from "framer-motion";
// import {
//   CheckCircleIcon,
//   ExclamationCircleIcon,
// } from "@heroicons/react/24/solid";
// import { BanIcon } from "lucide-react";
// import {
//   useGetAllUsersQuery,
//   useToggleUserWithdrawMutation,
// } from "../profile/profileAPI";

// const AdminManageUsers: React.FC = () => {
//   const { data: users = [], isLoading, refetch } = useGetAllUsersQuery();
//   const [toggleWithdraw] = useToggleUserWithdrawMutation();
//   const [feedback, setFeedback] = useState<{
//     type: "success" | "error" | "info";
//     message: string;
//   } | null>(null);
//   const [isProcessing, setIsProcessing] = useState<Record<number, boolean>>({});
//   const [selectedLevel, setSelectedLevel] = useState<string>("all");

//   // Collect unique levels for filter dropdown
//   const userLevels = useMemo(() => {
//     const levelsSet = new Set<string>();
//     users.forEach((user) => {
//       user.user_levels.forEach((level) => levelsSet.add(level.name));
//     });
//     return Array.from(levelsSet);
//   }, [users]);

//   // Filtered users by selected level
//   const filteredUsers = useMemo(() => {
//     if (selectedLevel === "all") return users;
//     return users.filter((user) =>
//       user.user_levels.some((level) => level.name === selectedLevel)
//     );
//   }, [users, selectedLevel]);

//   useEffect(() => {
//     console.log("Fetched users data:", users);
//   }, [users]);

//   const showFeedback = useCallback(
//     (type: "success" | "error" | "info", message: string) => {
//       setFeedback({ type, message });
//       const timer = setTimeout(() => setFeedback(null), 5000);
//       return () => clearTimeout(timer);
//     },
//     []
//   );

//   const handleToggleWithdrawals = async (
//     userId: number,
//     canWithdraw: boolean
//   ) => {
//     setIsProcessing((prev) => ({ ...prev, [userId]: true }));
//     try {
//       const response = await toggleWithdraw({
//         user_id: userId,
//         can_withdraw: !canWithdraw,
//       }).unwrap();
//       showFeedback(
//         "success",
//         response.message || "Withdrawal privileges updated successfully"
//       );
//       await refetch();
//     } catch (error: any) {
//       const errorMessage =
//         error.data?.detail || "Failed to update withdrawal privileges";
//       showFeedback("error", errorMessage);
//       console.error("Error toggling withdrawals:", error);
//     } finally {
//       setIsProcessing((prev) => ({ ...prev, [userId]: false }));
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen px-4 py-6 text-white bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950"
//     >
//       <h1 className="text-3xl font-bold text-yellow-400 mb-6">All Users</h1>

//       {/* Filter */}
//       <div className="mb-4 flex items-center gap-4">
//         <label
//           htmlFor="levelFilter"
//           className="text-yellow-100 font-semibold text-sm"
//         >
//           Filter by Level:
//         </label>
//         <select
//           id="levelFilter"
//           value={selectedLevel}
//           onChange={(e) => setSelectedLevel(e.target.value)}
//           className="bg-gray-800 text-yellow-100 px-3 py-1 rounded-lg"
//         >
//           <option value="all">All Levels</option>
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
//               : feedback.type === "error"
//               ? "bg-red-900/50 text-red-100"
//               : "bg-blue-900/50 text-blue-100"
//           }`}
//         >
//           {feedback.type === "success" ? (
//             <CheckCircleIcon className="h-5 w-5" />
//           ) : (
//             <ExclamationCircleIcon className="h-5 w-5" />
//           )}
//           <span>{feedback.message}</span>
//         </div>
//       )}

//       {isLoading ? (
//         <p className="text-yellow-100 text-center">Loading users...</p>
//       ) : filteredUsers.length === 0 ? (
//         <p className="text-yellow-100 text-center">No users found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           {/* Large screens: table layout */}
//           <table className="hidden md:table min-w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow">
//             <thead>
//               <tr className="border-b border-white/20">
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Username
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Phone
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Invite Code
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Role
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Active
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Suspended
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Can Withdraw
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   User Levels
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Created At
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-yellow-100 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="border-b border-white/10 hover:bg-white/5"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                     {user.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                     {user.username}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                     {user.phone_number}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                     {user.invite_code || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                     {user.role}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                     {user.is_active ? "Yes" : "No"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                     {user.is_suspended ? "Yes" : "No"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                     {user.can_withdraw ? "Yes" : "No"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100 flex flex-wrap gap-1">
//                     {user.user_levels.length > 0 ? (
//                       user.user_levels.map((ul) => (
//                         <span
//                           key={ul.id}
//                           className="bg-blue-700/50 px-2 py-1 rounded-full text-blue-100 text-xs"
//                         >
//                           {ul.name}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-gray-400">No levels</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-100">
//                     {new Date(user.created_at).toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm">
//                     <button
//                       onClick={() =>
//                         handleToggleWithdrawals(user.id, user.can_withdraw)
//                       }
//                       disabled={isProcessing[user.id]}
//                       className={`px-3 py-1 rounded-lg text-white font-semibold text-xs ${
//                         user.can_withdraw
//                           ? "bg-red-600 hover:bg-red-700"
//                           : "bg-green-600 hover:bg-green-700"
//                       } ${
//                         isProcessing[user.id]
//                           ? "opacity-70 cursor-not-allowed"
//                           : ""
//                       }`}
//                     >
//                       {isProcessing[user.id]
//                         ? "Processing..."
//                         : user.can_withdraw
//                         ? "Block"
//                         : "Unblock"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Mobile cards */}
//           <div className="md:hidden flex flex-col gap-4">
//             {filteredUsers.map((user) => (
//               <div
//                 key={user.id}
//                 className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow flex flex-col gap-2"
//               >
//                 <div>
//                   <strong>ID:</strong> {user.id}
//                 </div>
//                 <div>
//                   <strong>Username:</strong> {user.username}
//                 </div>
//                 <div>
//                   <strong>Phone:</strong> {user.phone_number}
//                 </div>
//                 <div>
//                   <strong>Invite Code:</strong> {user.invite_code || "N/A"}
//                 </div>
//                 <div>
//                   <strong>Role:</strong> {user.role}
//                 </div>
//                 <div>
//                   <strong>Active:</strong> {user.is_active ? "Yes" : "No"}
//                 </div>
//                 <div>
//                   <strong>Suspended:</strong> {user.is_suspended ? "Yes" : "No"}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <strong>Can Withdraw:</strong>
//                   {user.can_withdraw ? (
//                     <span className="bg-green-700/50 px-2 py-1 rounded-full text-green-100 text-xs flex items-center gap-1">
//                       <CheckCircleIcon className="h-4 w-4" /> Yes
//                     </span>
//                   ) : (
//                     <span className="bg-red-700/50 px-2 py-1 rounded-full text-red-100 text-xs flex items-center gap-1">
//                       <BanIcon className="h-4 w-4" /> No
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex flex-wrap gap-1">
//                   <strong>User Levels:</strong>
//                   {user.user_levels.length > 0 ? (
//                     user.user_levels.map((ul) => (
//                       <span
//                         key={ul.id}
//                         className="bg-blue-700/50 px-2 py-1 rounded-full text-blue-100 text-xs"
//                       >
//                         {ul.name}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-gray-400">No levels</span>
//                   )}
//                 </div>
//                 <div>
//                   <strong>Created At:</strong>{" "}
//                   {new Date(user.created_at).toLocaleString()}
//                 </div>
//                 <button
//                   onClick={() =>
//                     handleToggleWithdrawals(user.id, user.can_withdraw)
//                   }
//                   disabled={isProcessing[user.id]}
//                   className={`mt-2 px-3 py-1 rounded-lg text-white font-semibold text-xs ${
//                     user.can_withdraw
//                       ? "bg-red-600 hover:bg-red-700"
//                       : "bg-green-600 hover:bg-green-700"
//                   } ${
//                     isProcessing[user.id] ? "opacity-70 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {isProcessing[user.id]
//                     ? "Processing..."
//                     : user.can_withdraw
//                     ? "Block"
//                     : "Unblock"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default AdminManageUsers;




import React, {  useState, useCallback, useMemo } from "react";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { BanIcon } from "lucide-react";
import {
  useGetAllUsersQuery,
  useToggleUserWithdrawMutation,
} from "../profile/profileAPI";

const AdminManageUsers: React.FC = () => {
  const { data: users = [], isLoading, refetch } = useGetAllUsersQuery();
  const [toggleWithdraw] = useToggleUserWithdrawMutation();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState<Record<number, boolean>>({});
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

  // Collect unique levels for filter dropdown
  const userLevels = useMemo(() => {
    const levelsSet = new Set<string>();
    users.forEach((user) => {
      user.user_levels.forEach((level) => levelsSet.add(level.name));
    });
    return Array.from(levelsSet);
  }, [users]);

  // Filtered users by selected level and search term
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesLevel =
        selectedLevel === "all" ||
        user.user_levels.some((level) => level.name === selectedLevel);
      const matchesSearch =
        searchTerm === "" ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone_number.includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.invite_code &&
          user.invite_code.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesLevel && matchesSearch;
    });
  }, [users, selectedLevel, searchTerm]);

  const showFeedback = useCallback(
    (type: "success" | "error" | "info", message: string) => {
      setFeedback({ type, message });
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    },
    []
  );

  const handleToggleWithdrawals = async (
    userId: number,
    canWithdraw: boolean
  ) => {
    setIsProcessing((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = await toggleWithdraw({
        user_id: userId,
        can_withdraw: !canWithdraw,
      }).unwrap();

      showFeedback(
        "success",
        response.message || "Withdrawal privileges updated successfully"
      );
      await refetch();
    } catch (error: any) {
      const errorMessage =
        error.data?.detail || "Failed to update withdrawal privileges";
      showFeedback("error", errorMessage);
      console.error("Error toggling withdrawals:", error);
    } finally {
      setIsProcessing((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const toggleUserExpansion = (userId: number) => {
    setExpandedUserId((prev) => (prev === userId ? null : userId));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                User Management
              </h1>
              <p className="text-sm text-gray-500">
                Manage user accounts and withdrawal privileges
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Users
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name, phone, or role..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="levelFilter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Level
              </label>
              <select
                id="levelFilter"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Levels</option>
                {userLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Feedback Notification */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-md flex items-center gap-3 ${
              feedback.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : feedback.type === "error"
                ? "bg-red-50 border border-red-200 text-red-800"
                : "bg-blue-50 border border-blue-200 text-blue-800"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <ExclamationCircleIcon className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No users found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Withdrawals
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <React.Fragment key={user.id}>
                      <tr
                        className={
                          expandedUserId === user.id ? "bg-indigo-50" : ""
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {user.username}
                              </span>
                              <span className="text-xs text-gray-500">
                                {user.invite_code || "No invite code"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.phone_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "manager"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {user.is_active ? (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                Active
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                Inactive
                              </span>
                            )}
                            {user.is_suspended && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                Suspended
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.can_withdraw ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              <CheckCircleIcon className="h-4 w-4 text-green-600" />{" "}
                              Allowed
                            </span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                              <BanIcon className="h-4 w-4 text-red-600" />{" "}
                              Blocked
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => toggleUserExpansion(user.id)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              {expandedUserId === user.id ? (
                                <ChevronUpIcon className="h-5 w-5" />
                              ) : (
                                <ChevronDownIcon className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleToggleWithdrawals(
                                  user.id,
                                  user.can_withdraw
                                )
                              }
                              disabled={isProcessing[user.id]}
                              className={`px-3 py-1 rounded-md text-sm font-medium ${
                                user.can_withdraw
                                  ? "bg-red-100 text-red-800 hover:bg-red-200"
                                  : "bg-green-100 text-green-800 hover:bg-green-200"
                              } ${
                                isProcessing[user.id]
                                  ? "opacity-70 cursor-not-allowed"
                                  : ""
                              }`}
                            >
                              {isProcessing[user.id] ? (
                                <span className="flex items-center gap-1">
                                  <svg
                                    className="animate-spin h-3 w-3 text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Processing...
                                </span>
                              ) : user.can_withdraw ? (
                                "Block"
                              ) : (
                                "Allow"
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Row */}
                      {expandedUserId === user.id && (
                        <tr>
                          <td colSpan={7} className="p-0">
                            <div className="bg-gray-50 p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                                    User Details
                                  </h3>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">
                                        Created:
                                      </span>
                                      <span className="text-gray-900">
                                        {new Date(
                                          user.created_at
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                                    User Levels
                                  </h3>
                                  {user.user_levels &&
                                  user.user_levels.length > 0 ? (
                                    <div className="space-y-2">
                                      {user.user_levels.map((level) => (
                                        <div
                                          key={level.id}
                                          className="bg-white p-3 rounded-lg border border-gray-200"
                                        >
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <div className="font-medium text-gray-900">
                                                {level.name}
                                              </div>
                                              <div className="text-xs text-gray-500">
                                                ID: {level.id}
                                              </div>
                                            </div>
                                            <span
                                              className={`text-xs px-2 py-1 rounded-full ${
                                                level.status === "active"
                                                  ? "bg-green-100 text-green-800"
                                                  : "bg-red-100 text-red-800"
                                              }`}
                                            >
                                              {level.status}
                                            </span>
                                          </div>
                                          <div className="mt-2 text-sm">
                                            <div className="text-gray-500">
                                              Invested: KES{" "}
                                              {level.invested_amount?.toLocaleString()}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500 text-sm">
                                      No levels found
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white p-4 border-b border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {user.username}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {user.phone_number}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.can_withdraw ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <CheckCircleIcon className="h-4 w-4 text-green-600" />{" "}
                          Allowed
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <BanIcon className="h-4 w-4 text-red-600" /> Blocked
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Role</p>
                      <p className="font-medium">{user.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p
                        className={`font-medium ${
                          user.is_active ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => toggleUserExpansion(user.id)}
                      className="w-full flex items-center justify-between py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      <span>User Details</span>
                      {expandedUserId === user.id ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </button>

                    {expandedUserId === user.id && (
                      <div className="mt-2 space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">
                            Created:{" "}
                            {new Date(user.created_at).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Invite Code: {user.invite_code || "N/A"}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">
                            User Levels
                          </h4>
                          {user.user_levels && user.user_levels.length > 0 ? (
                            <div className="space-y-2">
                              {user.user_levels.map((level) => (
                                <div
                                  key={level.id}
                                  className="p-2 bg-white rounded border border-gray-200"
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="font-medium text-gray-900">
                                        {level.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        ID: {level.id}
                                      </div>
                                    </div>
                                    <span
                                      className={`text-xs px-2 py-1 rounded-full ${
                                        level.status === "active"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {level.status}
                                    </span>
                                  </div>
                                  <div className="mt-1 text-sm text-gray-500">
                                    Invested: KES{" "}
                                    {level.invested_amount?.toLocaleString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              No levels found
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            handleToggleWithdrawals(user.id, user.can_withdraw)
                          }
                          disabled={isProcessing[user.id]}
                          className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                            user.can_withdraw
                              ? "bg-red-100 text-red-800 hover:bg-red-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          } ${
                            isProcessing[user.id]
                              ? "opacity-70 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {isProcessing[user.id] ? (
                            <span className="flex items-center justify-center gap-1">
                              <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Processing...
                            </span>
                          ) : user.can_withdraw ? (
                            "Block Withdrawals"
                          ) : (
                            "Allow Withdrawals"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageUsers;
