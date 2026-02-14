import React, { useState } from 'react';
import { useGetAllActiveUsersQuery } from '../profile/profileAPI';

const AdminActiveMembers: React.FC = () => {
  const { data: activeUsers, isLoading, isError } = useGetAllActiveUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter users based on search term
  const filteredUsers = activeUsers?.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.level?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  // Pagination logic
  const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / itemsPerPage) : 0;
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Active Members</h1>
        <p className="text-sm mt-1">Total: {filteredUsers?.length || 0} active members</p>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by username, phone, or level..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
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
            Failed to load active members.
          </div>
        ) : paginatedUsers && paginatedUsers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Can Withdraw</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.username}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone_number}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.level?.name || 'No level'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.is_suspended ? 'bg-red-100 text-red-800' :
                          user.is_active ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.is_suspended ? 'Suspended' :
                           user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.can_withdraw ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.can_withdraw ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center p-4 bg-gray-50">
                <div className="text-sm text-gray-600">
                  Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredUsers?.length ?? 0)}-
                  {Math.min(currentPage * itemsPerPage, filteredUsers?.length ?? 0)} of {filteredUsers?.length ?? 0} members
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="px-3 py-1 text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className={`px-3 py-1 rounded ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-blue-600 hover:bg-blue-50'
                    }`}
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
            No active members found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActiveMembers;
