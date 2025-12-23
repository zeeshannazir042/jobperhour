import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegFileAlt } from "react-icons/fa";
import heroBg from "../assets/Images/Contact/contact.jpg"; // replace with your image path
import Navbar from "./Auth/Navigation";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Data:", formData);
    alert("Your message has been sent!");
  };

  return (
    <div className="bg-orange-50 pt-16">
      {/* Intro Section */}
      <div
        className={`relative w-full h-64 flex items-center justify-center text-center text-white transition-all duration-1000 ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center rounded-lg shadow-lg"
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
        <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Let’s Connect! Contact Us
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mt-2 drop-shadow">
            We’re here to help you find or post jobs easily. You can either fill out our Google Job Posting Form or reach out via the contact details below.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-4 py-12">
        {/* Left Column - Info */}
        <div
          className={`flex flex-col justify-center space-y-6 transition-all duration-1000 delay-200 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Google Form */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow hover:shadow-lg transition">
            <FaRegFileAlt className="text-orange-500 text-2xl" />
            <a
              href="https://forms.gle/your-google-form-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 font-semibold hover:underline"
            >
              Post a Job via Google Form / Jobformular ausfüllen
            </a>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex items-center gap-2">
              <FaPhone className="text-orange-500" /> +49 157 83716538 whatsapp
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-orange-500" /> contact@jobsperhourberlin.de
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-500" /> Berlin, Germany
            </div>

            {/* Google Map */}
            <div className="mt-4 rounded-lg overflow-hidden h-64 shadow-lg">
              <iframe
                title="Berlin Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.278164511098!2d13.376819316039565!3d52.51627497981208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c8f0a16b15%3A0x4b57b50e106f4d0a!2sBerlin%2C%20Germany!5e0!3m2!1sen!2sde!4v1701038416000!5m2!1sen!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div
          className={`bg-white rounded-lg p-6 shadow-lg transition-all duration-1000 delay-400 hover:shadow-2xl ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name*"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email*"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            />
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded hover:scale-105 hover:from-orange-500 hover:to-orange-600 transform transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
   <Footer />
    </div>
  );
};

export default ContactUs;
