import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../assets/images/About/community.jpg"; 

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={aboutImg} // <-- use imported image here
            alt="Community helping"
            className="rounded-xl shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-orange-500 mb-6">
            About Us
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            JobsPerHourBerlin is Berlin's community-powered platform for micro-jobs. We connect students, newcomers, and locals with the everyday needs of their neighbors and small businesses.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500 mt-4 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-700 mb-6 text-lg">
            Strengthen Berlin's neighborhoods by creating a trusted, hyper-local network where time and skills are valued.
          </p>

          <h3 className="text-2xl font-semibold text-orange-500 mt-4 mb-3">
            Why Choose Us?
          </h3>
          <ul className="text-gray-700 list-disc list-inside space-y-2 mb-6 text-lg">
            <li>Community-driven — neighbors helping neighbors</li>
            <li>Hyper-local matching — work near you</li>
            <li>Your skills have value — monetize talents on your schedule</li>
            <li>Bilingual and easy-to-use platform</li>
          </ul>

          {/* CTA Buttons */}
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/jobs"
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transform hover:scale-105 transition"
            >
              Find Jobs
            </Link>
            <Link
              to="/post-job"
              className="px-6 py-3 border border-orange-500 text-orange-500 font-semibold rounded-lg shadow hover:bg-orange-500 hover:text-white transform hover:scale-105 transition"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
