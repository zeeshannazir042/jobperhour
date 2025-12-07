import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
    Filler
);

const Chart = () => {
  const [userGrowth, setUserGrowth] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [roleDistribution, setRoleDistribution] = useState({});

  useEffect(() => {
    // Fetch user data
    const fetchUsers = async () => {
      const res = await axios.get("/api/users");
      const monthlyCounts = Array(12).fill(0);
      res.data.forEach((u) => {
        const month = new Date(u.createdAt).getMonth(); // 0 = Jan
        monthlyCounts[month] += 1;
      });
      setUserGrowth(monthlyCounts);
    };

    // Fetch job data
    const fetchJobs = async () => {
      const res = await axios.get("/api/jobs");
      const monthlyJobs = Array(12).fill(0);
      res.data.forEach((job) => {
        const month = new Date(job.createdAt).getMonth();
        monthlyJobs[month] += 1;
      });
      setJobPostings(monthlyJobs);
    };

    // Fetch role distribution
    const fetchRoles = async () => {
      const res = await axios.get("/api/users");
      const counts = { jobseeker: 0, "jobposter-private": 0, "jobposter-company": 0, admin: 0 };
      res.data.forEach((u) => {
        counts[u.role] = (counts[u.role] || 0) + 1;
      });
      setRoleDistribution(counts);
    };

    fetchUsers();
    fetchJobs();
    fetchRoles();
  }, []);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const userGrowthData = {
    labels: months,
    datasets: [
      {
        label: "New Users",
        data: userGrowth,
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.2)",
        tension: 0.3,
      },
    ],
  };

  const jobPostingsData = {
    labels: months,
    datasets: [
      {
        label: "Job Postings",
        data: jobPostings,
        backgroundColor: "orange",
      },
    ],
  };

  const roleDistributionData = {
    labels: ["Job Seeker", "Job Poster Private", "Job Poster Company", "Admin"],
    datasets: [
      {
        label: "Users by Role",
        data: [
          roleDistribution.jobseeker,
          roleDistribution["jobposter-private"],
          roleDistribution["jobposter-company"],
          roleDistribution.admin,
        ],
        backgroundColor: ["#FFA500", "#FFB84D", "#FFD699", "#FFE5CC"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-orange-500 mb-2">User Growth</h3>
        <Line data={userGrowthData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-orange-500 mb-2">Job Postings</h3>
        <Bar data={jobPostingsData} />
      </div>
      <div className="bg-white p-4 rounded shadow md:col-span-2">
        <h3 className="font-semibold text-orange-500 mb-2">Role Distribution</h3>
        <Pie data={roleDistributionData} />
      </div>
    </div>
  );
};

export default Chart;
