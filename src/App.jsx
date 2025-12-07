import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Auth/Navigation";
import Home from "./pages/Home";
import Signup from "./pages/Auth/register";
import Login from "./pages/Auth/Login";
import PostJob from "./pages/PostJob";
import JobList from "./pages/JobList";
import CommunityPage from "./pages/CommunityPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PosterDashboard from "./pages/Admin/PosterDashboard";
import SeekerDashboard from "./pages/Admin/SeekerDashboard";
import ContactUs from "./pages/ContactUs";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
        <div className="pt-16"> {/* padding top to avoid navbar overlap */}
          <Routes>

            {/* ------------------- Public Routes ------------------- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<JobList />} /> {/* public job listing */}
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/community" element={<CommunityPage />} /> {/* public community page */}

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
                  <JobList /> {/* job poster view of their jobs */}
                </PrivateRoute>
              }
            />
            <Route
              path="/poster-dashboard"
              element={
                <PrivateRoute allowedRoles={["jobposter-private", "jobposter-company"]}>
                  <PosterDashboard />
                </PrivateRoute>
              }
            />

            {/* ---------------- Job Seeker Routes ---------------- */}
            <Route
              path="/seeker-dashboard"
              element={
                <PrivateRoute allowedRoles={["jobseeker"]}>
                  <SeekerDashboard />
                </PrivateRoute>
              }
            />

            {/* ------------------ Admin Routes ------------------ */}
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            {/* ------------------ 404 Page ------------------ */}
            <Route path="*" element={<h1 className="text-center mt-10">404 | Page Not Found</h1>} />

          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
