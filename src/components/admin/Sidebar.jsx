import { Link } from "react-router-dom";
import { MdDashboard, MdWork, MdPostAdd, MdSettings } from "react-icons/md";
import { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-white dark:bg-gray-900 border-r dark:border-gray-700 transition-all duration-300 h-screen fixed top-0 left-0 z-40 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 bg-orange-500 text-white rounded-full w-6 h-6 text-xs"
      >
        {collapsed ? ">" : "<"}
      </button>

      <ul className="mt-20 flex flex-col gap-3 px-4">
        <MenuItem collapsed={collapsed} icon={<MdDashboard />} label="Dashboard" to="/admin-dashboard" />
        <MenuItem collapsed={collapsed} icon={<MdPostAdd />} label="Post Job" to="/post-job" />
        <MenuItem collapsed={collapsed} icon={<MdWork />} label="Jobs" to="/jobs" />
        <MenuItem collapsed={collapsed} icon={<MdSettings />} label="Settings" to="/settings" />
      </ul>
    </aside>
  );
};

const MenuItem = ({ icon, label, to, collapsed }) => (
  <Link
    to={to}
    className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-orange-500 hover:bg-orange-100 dark:hover:bg-gray-700 rounded-lg p-3 transition"
  >
    <span className="text-xl">{icon}</span>
    {!collapsed && <span>{label}</span>}
  </Link>
);

export default Sidebar;
