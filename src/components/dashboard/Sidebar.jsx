import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaRegNewspaper,
  FaClipboardList,
  FaBookmark,
  FaEnvelope,
  FaUsers,
  FaCogs,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar({ role, mobileOpen, setMobileOpen }) {
  const location = useLocation();

  const jobseekerMenu = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/seeker" },
    { name: "My Profile", icon: <FaUser />, path: "/seeker/profile" },
    { name: "My Community Posts", icon: <FaRegNewspaper />, path: "/seeker/community-posts" },
    { name: "Applications", icon: <FaClipboardList />, path: "/seeker/applications" },
    { name: "Saved Community Posts", icon: <FaBookmark />, path: "/seeker/saved-community" },
    { name: "Saved Jobs", icon: <FaBookmark />, path: "/seeker/saved-jobs" },
    { name: "Messages", icon: <FaEnvelope />, path: "/seeker/messages" },
    { name: "Settings", icon: <FaCogs />, path: "/seeker/settings" },
  ];

  const jobposterMenu = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/poster" },
    { name: "My Profile", icon: <FaUser />, path: "/poster/profile" },
    { name: "Job Posts", icon: <FaClipboardList />, path: "/poster/job-posts" },
    { name: "My Community Posts", icon: <FaRegNewspaper />, path: "/poster/community-posts" },
    { name: "Saved Community Posts", icon: <FaBookmark />, path: "/poster/saved-community" },
    { name: "Applicants", icon: <FaUsers />, path: "/poster/applicants" },
    { name: "Messages", icon: <FaEnvelope />, path: "/poster/messages" },
    { name: "Settings", icon: <FaCogs />, path: "/poster/settings" },
  ];

  const menu = role === "jobseeker" ? jobseekerMenu : jobposterMenu;

  return (
    <>
      {/* ---------------- Overlay for mobile ---------------- */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ---------------- Sidebar Drawer ---------------- */}
      <aside
        className={`
          fixed top-0 left-0 z-50 w-72 h-full bg-white shadow-xl flex flex-col
          transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:top-16 md:h-[calc(100vh-4rem)]
        `}
      >
        {/* ---------------- Close button for mobile ---------------- */}
        <div className="p-4 flex justify-between items-center md:hidden">
          <span className="text-lg font-semibold">{role === "jobseeker" ? "Job Seeker" : "Job Poster"}</span>
          <button onClick={() => setMobileOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* ---------------- Profile ---------------- */}
        <div className="p-4 text-center hidden md:block">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold">
            Z
          </div>
          <h3 className="mt-2 font-semibold">Zeeshan</h3>
          <p className="text-sm text-gray-500">
            {role === "jobseeker" ? "Job Seeker" : "Job Poster"}
          </p>
        </div>

        {/* ---------------- Menu ---------------- */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                ${location.pathname === item.path
                  ? "bg-orange-100 text-orange-600"
                  : "text-gray-700 hover:bg-orange-50"}
              `}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ---------------- Logout ---------------- */}
        <div className="p-3">
          <button className="w-full py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
            <FaSignOutAlt className="inline mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

{/* ---------------- Mobile Drawer Arrow ---------------- */}
{!mobileOpen && (
  <div className="md:hidden fixed top-1/2 left-0 z-50 flex items-center">
    <button
      className="flex items-center justify-center w-8 h-16 bg-orange-500 text-white rounded-r-full shadow-lg"
      onClick={() => setMobileOpen(true)}
    >
      {/* Right arrow icon */}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
)}


    </>
  );
}
