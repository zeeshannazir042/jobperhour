import React from "react";
import { Link } from "react-router-dom";
import heroVideo from "../../public/videos/video.mp4"; // Make sure video is in public folder

const Hero = () => {
  const scrollToFeatured = () => {
    const section = document.getElementById("featured-jobs");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden -mt-16">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-down">
          Explore flexible and local job opportunities in Berlin
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-6 animate-fade-down delay-200">
          Find the right role for you!
        </p>
        <div className="flex justify-center gap-4 flex-wrap animate-fade-up delay-400">
          <Link
            to="/jobs"
            className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg shadow-lg hover:scale-105 transform transition"
          >
            Find Jobs
          </Link>
          <Link
            to="/post-job"
            className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition transform hover:scale-105"
          >
            Post a Job
          </Link>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div
        onClick={scrollToFeatured}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
      >
        <svg
          className="w-8 h-8 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Animations */}
      <style>
        {`
          .animate-fade-down {
            animation: fadeDown 1s ease forwards;
          }
          .animate-fade-up {
            animation: fadeUp 1s ease forwards;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
          @keyframes fadeDown {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
