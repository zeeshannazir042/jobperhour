// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import pic from "../../assets/Images/signup/signup.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // Use AuthContext login method
      const data = await login(formData);

      // Navigate based on user role
      switch (data.user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "jobposter-private":
        case "jobposter-company":
          navigate("/poster");
          break;
        case "jobseeker":
          navigate("/seeker");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message || err.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Login with ${provider} coming soon!`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Left Image */}
      <div className="md:w-1/2 hidden md:flex relative overflow-hidden">
        <img
          src={pic}
          alt="Login Illustration"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="text-white text-4xl font-bold text-center animate-fade-up">
            Welcome to JobsPerHourBerlin
          </h1>
          <p className="text-white/80 mt-4 text-center animate-fade-up delay-200">
            Log in and manage your jobs efficiently.
          </p>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md animate-fade-right">
          <h2 className="text-4xl font-bold text-orange-500 mb-6 text-center">
            Login to Your Account
          </h2>

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
                className="w-full outline-none bg-transparent"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 relative focus-within:ring-2 focus-within:ring-orange-400 transition">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full outline-none bg-transparent pr-10"
              />
              <span
                className="absolute right-3 cursor-pointer text-gray-400 hover:text-orange-500 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-red-500 text-sm transition-opacity">{errorMessage}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 font-semibold rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 transform transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Social Login */}
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

          {/* Sign Up Link */}
          <p className="text-gray-500 text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
              Sign Up
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
      `}</style>
    </div>
  );
};

export default Login;
