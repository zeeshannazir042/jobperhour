import { Card, CardContent } from "../../components/admin/card";
import { Users, Briefcase, MessageSquare, Settings } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Total Users", value: "1,245", icon: Users },
  { label: "Total Jobs", value: "328", icon: Briefcase },
  { label: "Community Posts", value: "842", icon: MessageSquare },
  { label: "Settings Active", value: "12", icon: Settings },
];

const chartData = [
  { name: "Jan", users: 200 },
  { name: "Feb", users: 400 },
  { name: "Mar", users: 350 },
  { name: "Apr", users: 600 },
  { name: "May", users: 800 },
];

export default function DashboardPage() {
  return (
    <>
      <h2 className="text-3xl font-semibold mb-6 text-slate-900">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <stat.icon className="w-10 h-10 text-orange-500" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white rounded-lg shadow hover:shadow-lg transition">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-900">User Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
