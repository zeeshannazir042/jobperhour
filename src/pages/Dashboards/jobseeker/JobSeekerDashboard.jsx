import StatCard from "../../../components/dashboard/StatCard";
import Card from "../../../components/dashboard/Card";
import Button from "../../../components/dashboard/Button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const stats = [
  { label: "Applied Jobs", value: 24 },
  { label: "Interviews", value: 5 },
  { label: "Saved Jobs", value: 12 },
  { label: "Profile Views", value: 87 },
];

const applicationTrend = [
  { month: "Jan", Applications: 3 },
  { month: "Feb", Applications: 5 },
  { month: "Mar", Applications: 8 },
  { month: "Apr", Applications: 10 },
  { month: "May", Applications: 12 },
  { month: "Jun", Applications: 15 },
];

const recentApplications = [
  { title: "Frontend Developer – Amazon", status: "Under Review", color: "purple" },
  { title: "React Developer – Google", status: "Interview", color: "green" },
  { title: "UI/UX Designer – Meta", status: "Rejected", color: "red" },
];

const recommendedJobs = [
  { title: "Full Stack Developer" },
  { title: "Node.js Engineer" },
  { title: "React Developer" },
  { title: "Backend Engineer" },
];

export default function JobSeekerDashboard() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            className="hover:shadow-lg transition transform hover:scale-105"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart for Application Trend */}
        <Card title="Application Trend (Monthly)">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={applicationTrend} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Applications" stroke="#f97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart for Profile Views */}
        <Card title="Profile Views">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={applicationTrend} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Applications" fill="#10b981" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card title="Recent Applications">
        <ul className="space-y-4">
          {recentApplications.map((app, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-[1.02] ${app.color === "green"
                  ? "bg-green-50 dark:bg-green-900"
                  : app.color === "purple"
                    ? "bg-purple-50 dark:bg-purple-900"
                    : "bg-red-50 dark:bg-red-900"
                }`}
            >
              <span className="font-medium text-gray-900 dark:text-white">{app.title}</span>
              <span
                className={`text-sm font-semibold ${app.color === "green"
                    ? "text-green-700 dark:text-green-400"
                    : app.color === "purple"
                      ? "text-purple-700 dark:text-purple-400"
                      : "text-red-700 dark:text-red-400"
                  }`}
              >
                {app.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Recommended Jobs */}
      <Card title="Recommended Jobs">
        <div className="space-y-4">
          {recommendedJobs.map((job, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-[1.02] bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700"
            >
              <span className="font-medium text-gray-900 dark:text-white">{job.title}</span>
              <Button>Apply</Button>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}
