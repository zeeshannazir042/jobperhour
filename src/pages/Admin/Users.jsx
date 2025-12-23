import { useEffect, useState } from "react";
import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUser,
  registerUser,
} from "../../api/userApi";

export default function Users({ token, adminId }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("jobseeker");

  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 10 users per page

  const roles = ["jobseeker", "jobposter-private", "jobposter-company", "admin"];
  const statuses = ["active", "pending", "blocked"];

  // ---------------- Fetch Users ----------------
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers(token);
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error("Fetch Users Error:", err);
      alert(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------- Filter & Search ----------------
  useEffect(() => {
    let filtered = [...users];
    if (filterRole !== "all") filtered = filtered.filter(u => u.role === filterRole);
    if (filterStatus !== "all") filtered = filtered.filter(u => u.status === filterStatus);

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        u =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset page on filter/search change
  }, [users, filterRole, filterStatus, searchTerm]);

  // ---------------- Pagination ----------------
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ---------------- View, Add, Update, Delete Handlers ----------------
  const handleView = async (userId) => {
    try {
      const user = await getUserById(userId, token);
      setViewUser(user);
    } catch (err) {
      console.error("Get User Error:", err);
      alert(err.message || "Failed to fetch user");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newUser = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
      status: form.status.value,
    };

    if (form.role.value === "jobposter-company") {
      newUser.companyName = form.companyName?.value || "";
      newUser.businessAddress = form.businessAddress?.value || "";
      newUser.vat = form.vat?.value || "";
      newUser.website = form.website?.value || "";
    }

    try {
      await registerUser(newUser);
      fetchUsers();
      setAddModalOpen(false);
      alert("User added successfully!");
    } catch (err) {
      console.error("Add User Error:", err);
      alert(err.message || "Failed to add user");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      username: form.username.value,
      email: form.email.value,
      role: form.role.value,
      status: form.status.value,
    };

    if (form.password && form.password.value.trim() !== "") {
      updatedData.password = form.password.value;
    }

    if (adminId && form.points) {
      updatedData.points = Number(form.points.value);
    }

    if (form.role.value === "jobposter-company") {
      updatedData.companyName = form.companyName?.value || "";
      updatedData.businessAddress = form.businessAddress?.value || "";
      updatedData.vat = form.vat?.value || "";
      updatedData.website = form.website?.value || "";
    }

    try {
      await updateUserProfile(editUser._id, updatedData, token);
      fetchUsers();
      setEditUser(null);
      alert("User updated successfully!");
    } catch (err) {
      console.error("Update Profile Error:", err);
      alert(err.message || "Failed to update user");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId, adminId, token);
      fetchUsers();
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Delete User Error:", err);
      alert(err.message || "Failed to delete user");
    }
  };

  // ---------------- Sync role when editing ----------------
  useEffect(() => {
    if (editUser) setSelectedRole(editUser.role);
  }, [editUser]);

  // ---------------- Conditional fields for View modal ----------------
  const getViewFields = (user) => {
    const basicFields = ["username", "email", "role", "status", "points"];
    const companyFields = ["companyName", "businessAddress", "vat", "website"];
    const extraFields = ["isVerified", "phoneVerified", "emailVerifyToken", "phoneOtp"];
    let fields = [...basicFields];
    if (user.role === "jobposter-company") fields = [...fields, ...companyFields];
    fields = [...fields, ...extraFields];
    fields.push("password"); // masked
    return fields;
  };

  // ---------------- Reset Filters ----------------
  const handleResetFilters = () => {
    setFilterRole("all");
    setFilterStatus("all");
    setSearchTerm("");
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header + Filters + Search */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Users Management</h1>
        <div className="flex gap-2 items-center flex-wrap">
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Roles</option>
            {roles.map((r) => <option key={r} value={r}>{r.toUpperCase()}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">All Statuses</option>
            {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            onClick={handleResetFilters}
            className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Reset Filters
          </button>
          <button
            className="px-5 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition duration-300"
            onClick={() => {
              setAddModalOpen(true);
              setSelectedRole("jobseeker");
            }}
          >
            Add User
          </button>
        </div>
      </div>

      {/* Loading + Table + Pagination */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading users...</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  {["_id", "username", "email", "role", "status", "points", "actions"].map(
                    (field) => (
                      <th
                        key={field}
                        className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                          field === "actions" ? "text-right" : ""
                        }`}
                      >
                        {field.toUpperCase()}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-4 py-3 text-sm text-gray-700">{user._id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{user.username}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{user.role}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{user.status}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{user.points}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                        onClick={() => handleView(user._id)}
                      >
                        View
                      </button>
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                        onClick={() => {
                          setEditUser(user);
                          setSelectedRole(user.role);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1 ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* ---------------- View Modal ---------------- */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">
              User Details
            </h2>
            <div className="space-y-3 text-sm text-gray-800">
              {getViewFields(viewUser).map((field) =>
                viewUser[field] !== undefined && viewUser[field] !== "" ? (
                  <div key={field} className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </span>
                    <span>{field === "password" ? "••••••" : String(viewUser[field])}</span>
                  </div>
                ) : null
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow transition"
                onClick={() => setViewUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Add/Edit Modal ---------------- */}
      {(addModalOpen || editUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-center mb-6 text-green-500">
              {editUser ? "Update User" : "Add New User"}
            </h2>
            <form onSubmit={editUser ? handleUpdate : handleAddUser} className="space-y-4">
              <input
                type="text"
                name="username"
                defaultValue={editUser?.username || ""}
                placeholder="Username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <input
                type="email"
                name="email"
                defaultValue={editUser?.email || ""}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <input
                type="password"
                name="password"
                placeholder={editUser ? "New Password (leave blank to keep current)" : "Password"}
                required={!editUser}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              {editUser && adminId && (
                <input
                  type="number"
                  name="points"
                  defaultValue={editUser?.points || 0}
                  placeholder="Points"
                  min={0}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              )}
              <select
                name="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role.toUpperCase()}
                  </option>
                ))}
              </select>
              <select
                name="status"
                defaultValue={editUser?.status || "active"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {selectedRole === "jobposter-company" && (
                <>
                  <input
                    type="text"
                    name="companyName"
                    defaultValue={editUser?.companyName || ""}
                    placeholder="Company Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  />
                  <input
                    type="text"
                    name="businessAddress"
                    defaultValue={editUser?.businessAddress || ""}
                    placeholder="Business Address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  />
                  <input
                    type="text"
                    name="vat"
                    defaultValue={editUser?.vat || ""}
                    placeholder="VAT Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  />
                  <input
                    type="text"
                    name="website"
                    defaultValue={editUser?.website || ""}
                    placeholder="Website"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  />
                </>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  onClick={() => (editUser ? setEditUser(null) : setAddModalOpen(false))}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg shadow transition ${
                    editUser
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {editUser ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
