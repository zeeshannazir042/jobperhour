import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaGoogle, FaLinkedin } from "react-icons/fa";

const Login = () => {
  const [userType, setUserType] = useState("jobseeker"); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Type:", userType);
    console.log(formData);
    // Add login logic here
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Integrate your Google/LinkedIn OAuth logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          Login to Your Account
        </h2>

        {/* User Type Selector */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            type="button"
            onClick={() => setUserType("jobseeker")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              userType === "jobseeker"
                ? "bg-orange-400 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setUserType("jobposter")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              userType === "jobposter"
                ? "bg-orange-400 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Job Poster
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-orange-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            Login
          </button>
        </form>

        {/* Social Login - Only for Job Seekers */}
        {userType === "jobseeker" && (
          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <FaGoogle className="text-red-500" /> Login with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("LinkedIn")}
              className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <FaLinkedin className="text-blue-700" /> Login with LinkedIn
            </button>
          </div>
        )}

        <p className="text-gray-600 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
