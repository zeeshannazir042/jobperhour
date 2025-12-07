import React, { useState, useMemo } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const UsersTable = ({
  users,
  loading,
  openAddUserModal,
  openEditUserModal,
  handleDeleteUser,
}) => {
  const [search, setSearch] = useState("");

  if (loading) {
    return <div className="text-center p-6 text-gray-500">Loading users...</div>;
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter users based on search input
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.username?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.role?.toLowerCase().includes(search.toLowerCase()) ||
        (user.companyName && user.companyName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [users, search]);

  const formatRole = (role) => {
    switch (role) {
      case "jobseeker":
        return "Job Seeker";
      case "jobposter-private":
        return "Job Poster Private";
      case "jobposter-company":
        return "Job Poster Company";
      case "admin":
        return "Admin";
      default:
        return role;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Header & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-orange-500">Users</h2>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
          </div>
          <button
            onClick={openAddUserModal}
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            <FaPlus /> Add User
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-gray-600 uppercase text-sm">
                <th className="px-4 py-3">Username</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="bg-gray-50 hover:bg-gray-100 transition rounded-lg"
                >
                  <td className="px-4 py-3 font-medium">{user.username || "-"}</td>
                  <td className="px-4 py-3">{user.email || "-"}</td>
                  <td className="px-4 py-3">{formatRole(user.role)}</td>
                  <td className="px-4 py-3">
                    {user.role === "jobposter-company" ? user.companyName || "-" : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                        user.status
                      )}`}
                    >
                      {user.status || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() => openEditUserModal(user)}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
