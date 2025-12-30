import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/dashboard/Sidebar";

export default function DashboardLayout({ role }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Sidebar */}
      <Sidebar role={role} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* Render the selected dashboard page here */}
      </main>
    </div>
  );
}
