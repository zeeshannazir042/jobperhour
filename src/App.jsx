import React from "react";
import { Routes, Route } from "react-router-dom";

/* ---------------- Pages ---------------- */
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

/* ---------------- Job Seeker Pages ---------------- */
import JobSeekerDashboard from "./pages/Dashboards/jobseeker/JobSeekerDashboard";
import Profile from "./pages/Dashboards/jobseeker/Profile";
import SeekerCommunity from "./pages/Dashboards/jobseeker/CommunityPosts";
import Applications from "./pages/Dashboards/jobseeker/Applications";
import SavedCommunity from "./pages/Dashboards/jobseeker/SavedCommunity";
import SavedJobs from "./pages/Dashboards/jobseeker/SavedJobs";
import Messages from "./pages/Dashboards/jobseeker/Messages";
import Settings from "./pages/Dashboards/jobseeker/Settings";
import JobSeekerDashboardLayout from "./pages/Dashboards/jobseeker/DashboardLayout";

/* ---------------- Job Poster Pages ---------------- */
import JobPosterDashboard from "./pages/Dashboards/jobposter/JobPosterDashboard";
import JobPosts from "./pages/Dashboards/jobposter/JobPosts";
import Applicants from "./pages/Dashboards/jobposter/Applicants";
import PosterCommunity from "./pages/Dashboards/jobposter/CommunityPosts";
import PosterSavedCommunity from "./pages/Dashboards/jobposter/SavedCommunity";
import PosterMessages from "./pages/Dashboards/jobposter/Messages";
import PosterSettings from "./pages/Dashboards/jobposter/Settings";
import JobPosterDashboardLayout from "./pages/Dashboards/jobposter/DashboardLayout";

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

              {/* ---------------- Job Seeker Dashboard Routes ---------------- */}
              <Route
                path="/seeker"
                element={
                  <PrivateRoute allowedRoles={["jobseeker"]}>
                    <JobSeekerDashboardLayout role="jobseeker" />
                  </PrivateRoute>
                }
              >
                <Route index element={<JobSeekerDashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="applications" element={<Applications />} />
                <Route path="community-posts" element={<SeekerCommunity />} />
                <Route path="saved-community" element={<SavedCommunity />} />
                <Route path="saved-jobs" element={<SavedJobs />} />
                <Route path="messages" element={<Messages />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* ---------------- Job Poster Dashboard Routes ---------------- */}
              <Route
                path="/poster"
                element={
                  <PrivateRoute allowedRoles={["jobposter-private", "jobposter-company"]}>
                    <JobPosterDashboardLayout role="jobposter" />
                  </PrivateRoute>
                }
              >
                <Route index element={<JobPosterDashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="job-posts" element={<JobPosts />} />
                <Route path="community-posts" element={<PosterCommunity />} />
                <Route path="saved-community" element={<PosterSavedCommunity />} />
                <Route path="applicants" element={<Applicants />} />
                <Route path="messages" element={<PosterMessages />} />
                <Route path="settings" element={<PosterSettings />} />
                <Route path="post-job" element={<PostJob />} />
                <Route path="my-jobs" element={<JobList />} />
              </Route>

              {/* ---------------- Admin Routes ---------------- */}
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
