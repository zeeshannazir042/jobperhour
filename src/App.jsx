import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./pages/Auth/Navigation";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Signup from "./pages/Auth/register";
import Login from "./pages/Auth/Login";
import EmailVerified from "./pages/EmailVerification";
import PostJob from "./pages/PostJob";
import JobList from "./pages/JobList";
import CommunityPage from "./pages/CommunityPage";
import ContactUs from "./pages/ContactUs";

/* ---------------- Admin Pages ---------------- */
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminJobs from "./pages/Admin/Jobs";
import AdminCommunity from "./pages/Admin/Community";
import AdminSettings from "./pages/Admin/Settings";

/* ---------------- Auth & Context ---------------- */
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <Navbar />

          <div className="pt-16">
            <Routes>
              {/* ---------------- Public Routes ---------------- */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<EmailVerified />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} /> 

              {/* ---------------- Job Poster Routes ---------------- */}
              <Route
                path="/post-job"
                element={
                  <PrivateRoute allowedRoles={["jobposter-private", "jobposter-company"]}>
                    <PostJob />
                  </PrivateRoute>
                }
              />

              <Route
                path="/my-jobs"
                element={
                  <PrivateRoute allowedRoles={["jobposter-private", "jobposter-company"]}>
                    <JobList />
                  </PrivateRoute>
                }
              />

              {/* ---------------- Admin Routes with Persistent Sidebar ---------------- */}
              <Route
                element={
                  <PrivateRoute allowedRoles={["admin"]}>
                    <AdminLayout />
                  </PrivateRoute>
                }
              >
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/jobs" element={<AdminJobs />} />
                <Route path="/admin/community" element={<AdminCommunity />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>

              {/* ---------------- 404 ---------------- */}
              <Route
                path="*"
                element={
                  <h1 className="text-center mt-10 text-2xl font-semibold">
                    404 | Page Not Found
                  </h1>
                }
              />
            </Routes>
          </div>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
