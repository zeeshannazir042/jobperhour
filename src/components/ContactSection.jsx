import React from "react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <section className="bg-orange-50 py-16">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6">
          Send us a message
        </h2>
        <p className="text-gray-700 mb-6">
          Have a question or need assistance? Our team is here to help.
        </p>
        <Link
          to="/contact"
          className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg shadow-lg hover:scale-105 transform transition"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default ContactSection;
