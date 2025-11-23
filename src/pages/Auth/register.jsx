import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaLinkedin } from "react-icons/fa";

const Signup = () => {
  const [userType, setUserType] = useState("jobseeker"); // Job Seeker / Job Poster
  const [posterType, setPosterType] = useState("private"); // Private or Business for Job Poster
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileName: "", // for private poster
    companyName: "",
    businessEmail: "",
    businessAddress: "",
    vatId: "",
    website: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Type:", userType);
    if (userType === "jobposter") console.log("Poster Type:", posterType);
    console.log(formData);
    // Add signup logic here
  };

  const handleSocialLogin = (provider) => {
    console.log(`Sign up with ${provider}`);
    // Integrate your Google/LinkedIn OAuth logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
            Sign Up for an Accounts
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

        {/* Job Poster Subtype */}
        {userType === "jobposter" && (
          <div className="flex justify-center mb-6 space-x-4">
            <button
              type="button"
              onClick={() => setPosterType("private")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                posterType === "private" 
                  ? "bg-orange-400 text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Private
            </button>
            <button
              type="button"
              onClick={() => setPosterType("business")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                posterType === "business" 
                  ? "bg-orange-400 text-white shadow-lg" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Business / Commercial
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name / Profile Name */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder={
                userType === "jobseeker"
                  ? "Full Name"
                  : posterType === "private"
                  ? "Profile Name"
                  : "Contact Person Name"
              }
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Email / Business Email */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name={
                userType === "jobseeker"
                  ? "email"
                  : posterType === "business"
                  ? "businessEmail"
                  : "email"
              }
              placeholder={
                userType === "jobseeker"
                  ? "Email Address"
                  : posterType === "business"
                  ? "Business Email"
                  : "Email Address"
              }
              value={
                userType === "jobseeker"
                  ? formData.email
                  : posterType === "business"
                  ? formData.businessEmail
                  : formData.email
              }
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

          {/* Business Fields */}
          {userType === "jobposter" && posterType === "business" && (
            <>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />
              <input
                type="text"
                name="businessAddress"
                placeholder="Business Address"
                value={formData.businessAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                required
              />
              <input
                type="text"
                name="vatId"
                placeholder="VAT / Tax ID (optional)"
                value={formData.vatId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
              <input
                type="text"
                name="website"
                placeholder="Company Website (optional)"
                value={formData.website}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </>
          )}

          {/* Agree Checkbox */}
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
              className="form-checkbox h-4 w-4 text-orange-500"
            />
            <span>
              I agree that my information may be shared with third parties for job-related purposes.
            </span>
          </label>

          {/* Manual Signup Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            Sign Up
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
              <FaGoogle className="text-red-500" /> Sign Up with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("LinkedIn")}
              className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              <FaLinkedin className="text-blue-700" /> Sign Up with LinkedIn
            </button>
          </div>
        )}

        <p className="text-gray-600 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
