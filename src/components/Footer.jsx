import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaPhoneAlt, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Show Back-to-Top button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 relative">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-orange-500 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-orange-500 transition">Home</Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-orange-500 transition">Jobs</Link>
            </li>
            <li>
              <Link to="/post-job" className="hover:text-orange-500 transition">Post a Job</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500 transition">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-orange-500 mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2">
            <FaPhoneAlt className="text-orange-500" /> +49 157 83716538
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaEnvelope className="text-orange-500" /> contact@jobsperhourberlin.de
          </p>
          <p>Berlin, Germany</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold text-orange-500 mb-4">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-orange-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaLinkedin /></a>
            <a href="#" className="hover:text-orange-500 transition"><FaFacebook /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        © 2025 JobsPerHourBerlin — All rights reserved.
      </div>

      {/* Back-to-Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 hover:scale-110 transition transform z-50"
          aria-label="Back to Top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
