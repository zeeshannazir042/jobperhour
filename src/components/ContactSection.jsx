import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-orange-50">
      
      {/* Glow Blur Background */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[350px] h-[350px] rounded-full bg-orange-300/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
        
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-10 shadow-xl hover:shadow-orange-300/40 transition">
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-4 animate-fade-in">
            {t("contact.title")}
          </h2>

          <p className="text-gray-700 text-lg mb-8 animate-fade-in delay-200">
            {t("contact.subtitle")}
          </p>

          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full shadow-lg hover:shadow-orange-600/50 transition-all hover:scale-110 active:scale-95"
          >
            {t("contact.button")}
          </Link>
        </div>
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes fadeInMove {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeInMove 1s ease-out forwards;
          }
          .delay-200 {
            animation-delay: .2s;
          }
        `}
      </style>
    </section>
  );
};

export default ContactSection;
