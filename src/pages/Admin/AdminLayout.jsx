// src/pages/Admin/AdminLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const navItems = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Jobs", path: "/admin/jobs" },
    { name: "Community", path: "/admin/community" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block p-3 rounded-lg transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet /> {/* Child pages will render here */}
      </main>
    </div>
  );
}
