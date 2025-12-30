import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaLinkedin } from "react-icons/fa";
import { registerUser } from "../../api/userApi";
import heroVideo from "../../../public/videos/video.mp4";

const Register = () => {
  const [userType, setUserType] = useState("jobseeker"); // jobseeker or jobposter
  const [posterType, setPosterType] = useState("private"); // private or business
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    companyName: "",
    businessEmail: "",
    businessAddress: "",
    vat: "",
    website: "",
    agree: false,
  });
  const [isRegistered, setIsRegistered] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const role =
      userType === "jobseeker"
        ? "jobseeker"
        : posterType === "private"
        ? "jobposter-private"
        : "jobposter-company";

    const payload = {
      username:
        userType === "jobseeker"
          ? formData.username
          : posterType === "private"
          ? formData.username
          : formData.companyName,
      email:
        userType === "jobseeker"
          ? formData.email
          : posterType === "private"
          ? formData.email
          : formData.businessEmail,
      password: formData.password,
      role,
      companyName: posterType === "business" ? formData.companyName : undefined,
      businessAddress: posterType === "business" ? formData.businessAddress : undefined,
      vat: posterType === "business" ? formData.vat : undefined,
      website: posterType === "business" ? formData.website : undefined,
    };

    try {
      await registerUser(payload);
      setIsRegistered(true); // show verification message
    } catch (err) {
      console.error(err);
      alert(err.message || "Registration failed");
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Sign up with ${provider} coming soon!`);
  };

  // After successful signup
  if (isRegistered) {
    const email =
      userType === "jobseeker" ? formData.email : posterType === "private" ? formData.email : formData.businessEmail;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl font-bold text-orange-500 mb-6">Check Your Email</h2>
        <p className="text-gray-700 mb-4">
          A verification email has been sent to <strong>{email}</strong>. Please check your inbox (and spam folder) to verify your account before logging in.
        </p>
        <Link
          to="/login"
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Video */}
      <div className="md:w-1/2 hidden md:flex relative overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover transform scale-110 animate-parallax">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="text-white text-4xl font-bold text-center animate-fade-up">Join JobsPerHourBerlin</h1>
          <p className="text-white/80 mt-4 text-center animate-fade-up delay-200">Find or post hourly jobs in Berlin easily.</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-lg animate-fade-right">
          <h2 className="text-4xl font-bold text-orange-500 mb-6 text-center">Sign Up</h2>

          {/* User Type Selector */}
          <div className="flex justify-center mb-6 space-x-4">
            <button
              type="button"
              onClick={() => setUserType("jobseeker")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                userType === "jobseeker" ? "bg-orange-500 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setUserType("jobposter")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                userType === "jobposter" ? "bg-orange-500 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                  posterType === "private" ? "bg-orange-500 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Private
              </button>
              <button
                type="button"
                onClick={() => setPosterType("business")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  posterType === "business" ? "bg-orange-500 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Business / Company
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Contact Name */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="username"
                placeholder={userType === "jobposter" && posterType === "business" ? "Contact Person Name" : "Full Name"}
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-400 transition">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name={userType === "jobposter" && posterType === "business" ? "businessEmail" : "email"}
                placeholder={userType === "jobposter" && posterType === "business" ? "Business Email" : "Email"}
                value={userType === "jobposter" && posterType === "business" ? formData.businessEmail : formData.email}
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
                />
                <input
                  type="text"
                  name="businessAddress"
                  placeholder="Business Address"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                />
                <input
                  type="text"
                  name="vat"
                  placeholder="VAT / Tax ID (optional)"
                  value={formData.vat}
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

            {/* Agree */}
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="form-checkbox h-4 w-4 text-orange-500"
              />
              <span>I agree to share my info for job-related purposes.</span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition"
            >
              Sign Up
            </button>
          </form>

          {/* Social Login */}
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

      {/* Animations */}
      <style>{`
        @keyframes fadeRight { 0% { opacity: 0; transform: translateX(30px); } 100% { opacity: 1; transform: translateX(0); } }
        .animate-fade-right { animation: fadeRight 0.8s ease forwards; }
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fadeUp 1s ease forwards; }
        @keyframes parallax { 0%,100%{ transform: translateY(0) scale(1.1); } 50%{ transform: translateY(-20px) scale(1.12); } }
        .animate-parallax { animation: parallax 15s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Register;
