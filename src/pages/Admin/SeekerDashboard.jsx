// src/pages/Admin/SeekerDashboard.jsx
import React, { useEffect, useState } from "react";
import { getJobs } from "../../api/jobApi";

const SeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-6 mt-20 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Job Seeker Dashboard</h1>
      <p>Welcome! Browse jobs below and apply to your favorite ones.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="p-4 border rounded shadow">
              <h2 className="font-bold text-lg">{job.jobTitle}</h2>
              <p>{job.companyName}</p>
              <p>{job.location}</p>
              <p>Type: {job.employmentType}</p>
            </div>
          ))
        ) : (
          <p>No jobs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default SeekerDashboard;
