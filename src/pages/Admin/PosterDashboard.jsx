// src/pages/Admin/PosterDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const PosterDashboard = () => {
  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Job Poster Dashboard</h1>
      <p>Welcome! You can post jobs and manage your listings here.</p>

      <div className="mt-6 flex space-x-4">
        <Link
          to="/post-job"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Post a New Job
        </Link>
        <Link
          to="/my-jobs"
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          My Jobs
        </Link>
      </div>
    </div>
  );
};

export default PosterDashboard;
