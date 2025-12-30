import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/dashboard/Sidebar";

export default function DashboardLayout({ role }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        role={role}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content */}
      <main
        className="
          pt-16
          p-6
          transition-all
          md:ml-72
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
