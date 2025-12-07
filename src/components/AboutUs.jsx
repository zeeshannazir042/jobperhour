import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../assets/images/About/community.jpg"; 

const AboutUs = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${aboutImg})`,
          filter: "brightness(40%)"
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-orange-500/40"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-28 flex flex-col md:flex-row items-center gap-12 animate-fadeIn">
        
        {/* Text Section */}
        <div className="md:w-1/2 text-white space-y-6">
          <h2 className="text-5xl font-extrabold tracking-wide">
            About <span className="text-orange-400">Us</span>
          </h2>

          <p className="text-lg leading-relaxed">
            JobsPerHourBerlin is Berlin's community-driven platform for micro jobs — connecting locals, newcomers and students with meaningful tasks around the neighborhood.
          </p>

          <h3 className="text-2xl font-bold text-orange-300">Our Mission</h3>
          <p className="text-lg leading-relaxed">
            To empower people by creating opportunities within walking distance — where skills, time and trust truly matter.
          </p>

          <h3 className="text-2xl font-bold text-orange-300">Why Choose Us?</h3>

          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2">🔥 Hyper-local matching</li>
            <li className="flex items-center gap-2">🤝 Trusted community exchange</li>
            <li className="flex items-center gap-2">💼 Work when you want</li>
            <li className="flex items-center gap-2">🌍 Bilingual platform</li>
          </ul>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4">
            <Link
              to="/jobs"
              className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:scale-110 hover:bg-orange-600 transition-all"
            >
              Find Jobs
            </Link>
            <Link
              to="/post-job"
              className="px-8 py-3 border-2 border-orange-400 text-orange-300 font-semibold rounded-full hover:bg-orange-500 hover:text-white hover:scale-110 transition-all"
            >
              Post a Job
            </Link>
          </div>
        </div>

        {/* Right Image Box */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={aboutImg}
            alt="Community"
            className="rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 transform hover:scale-105 hover:rotate-1 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
