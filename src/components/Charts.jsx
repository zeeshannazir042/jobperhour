import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Chart = () => {
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [20, 35, 40, 50, 65, 80],
        borderColor: "#FFA500",
        backgroundColor: "rgba(255,165,0,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const jobPostingsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Job Postings",
        data: [10, 25, 30, 40, 50, 60],
        backgroundColor: "#FFA500",
        borderRadius: 4,
      },
    ],
  };

  const revenueData = {
    labels: ["Job Seeker", "Job Poster", "Admin"],
    datasets: [
      {
        data: [5000, 4000, 3000],
        backgroundColor: ["#FFA500", "#FFB84D", "#FFD699"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { boxWidth: 12, padding: 15 } },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 10 } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* User Growth Line Chart */}
      <div className="bg-white shadow rounded-lg p-4 h-64">
        <h3 className="text-orange-500 font-semibold mb-2">User Growth</h3>
        <Line data={userGrowthData} options={options} />
      </div>

      {/* Job Postings Bar Chart */}
      <div className="bg-white shadow rounded-lg p-4 h-64">
        <h3 className="text-orange-500 font-semibold mb-2">Job Postings</h3>
        <Bar data={jobPostingsData} options={options} />
      </div>

      {/* Revenue Pie Chart */}
      <div className="bg-white shadow rounded-lg p-4 h-64 md:col-span-2">
        <h3 className="text-orange-500 font-semibold mb-2">Revenue Distribution</h3>
        <Pie data={revenueData} options={{ ...options, aspectRatio: 1 }} />
      </div>
    </div>
  );
};

export default Chart;
