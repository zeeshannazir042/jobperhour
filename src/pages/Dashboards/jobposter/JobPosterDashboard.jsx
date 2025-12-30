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

const jobStats = [
  { name: "Active Jobs", value: 8 },
  { name: "Applicants", value: 146 },
  { name: "Shortlisted", value: 22 },
  { name: "Closed Jobs", value: 5 },
];

const applicantTrend = [
  { month: "Jan", Applicants: 20 },
  { month: "Feb", Applicants: 35 },
  { month: "Mar", Applicants: 50 },
  { month: "Apr", Applicants: 65 },
  { month: "May", Applicants: 90 },
  { month: "Jun", Applicants: 120 },
];

const jobPosts = [
  { title: "Frontend Developer", applicants: 40 },
  { title: "Backend Developer", applicants: 35 },
  { title: "Full Stack Developer", applicants: 28 },
  { title: "UI/UX Designer", applicants: 22 },
];

export default function JobPosterDashboard() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {jobStats.map((stat) => (
          <StatCard
            key={stat.name}
            label={stat.name}
            value={stat.value}
            className="hover:shadow-lg transition transform hover:scale-105"
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart for Job Posts */}
        <Card title="Applicants per Job">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={jobPosts} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applicants" fill="#f97316" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Line Chart for Applicant Trend */}
        <Card title="Applicant Trend (Monthly)">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={applicantTrend} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Applicants" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Job Posts List */}
      <Card title="Your Job Posts">
        <ul className="space-y-4">
          {jobPosts.map((job, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-[1.02] bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700"
            >
              <div>
                <span className="font-semibold text-lg text-gray-900 dark:text-white">{job.title}</span>
                <p className="text-sm text-gray-500 dark:text-gray-300">Applicants: {job.applicants}</p>
              </div>
              <Button>View Applicants</Button>
            </li>
          ))}
        </ul>
      </Card>

    </div>
  );
}
