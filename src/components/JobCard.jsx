import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition duration-300">
      <img
        src={job.image}
        alt={job.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="text-4xl mb-3">{job.emoji}</div>
        <h3 className="text-xl font-semibold mb-1 text-orange-500">{job.title}</h3>
        <p className="text-gray-500 mb-3 italic">{job.subtitle}</p>
        <p className="text-gray-700 mb-4">{job.description}</p>
        <div className="flex gap-3">
          <Link
            to="/jobs"
            className="px-4 py-2 bg-orange-100 text-orange-500 rounded-lg font-semibold hover:bg-orange-200 transition transform hover:scale-105"
          >
            Find Jobs
          </Link>
          <Link
            to="/post-job"
            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition transform hover:scale-105"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
