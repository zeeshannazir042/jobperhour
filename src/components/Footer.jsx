import React, { useState, useEffect } from "react";
import { FaInstagram, FaLinkedin, FaFacebook, FaPhoneAlt, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#0d0d0d] pt-20 pb-10 overflow-hidden">
      
      {/* Animated Background glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-orange-500 opacity-20 blur-[140px]"></div>

      {/* Glass Container */}
      <div className="container mx-auto px-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 shadow-lg transition hover:border-orange-400/30">
          
          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold text-orange-400 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                {[
                  { label: "Home", to: "/" },
                  { label: "Jobs", to: "/jobs" },
                  { label: "Post a Job", to: "/post-job" },
                  { label: "Contact", to: "/contact" },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-semibold text-orange-400 mb-4">Contact</h3>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300 mb-2">
                <FaPhoneAlt className="text-orange-500" /> +49 157 83716538 whatsapp
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-300 mb-2">
                <FaEnvelope className="text-orange-500" /> contact@jobsperhourberlin.de
              </p>
              <p className="text-gray-500">Berlin, Germany</p>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-xl font-semibold text-orange-400 mb-4">Follow Us</h3>
              <div className="flex justify-center md:justify-start gap-5 text-2xl">
                {[FaInstagram, FaLinkedin, FaFacebook].map((Icon, index) => (
                  <Icon
                    key={index}
                    className="cursor-pointer text-gray-300 hover:text-orange-500 hover:scale-125 transition duration-300"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8"></div>

          {/* Copyright */}
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-orange-500">JobsPerHourBerlin</span> — All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-orange-600/50 transition-all z-50"
        >
          <FaArrowUp className="animate-pulse" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
