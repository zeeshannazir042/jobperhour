// src/pages/Admin/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6 mt-20 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage users, jobs, and the platform.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">Total Users</div>
        <div className="p-4 border rounded shadow">Total Jobs</div>
        <div className="p-4 border rounded shadow">Active Job Posters</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
