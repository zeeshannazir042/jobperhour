import React from "react";
import Hero from "../components/Hero";
import FeaturedJobs from "../components/FeaturedJobs";
import AboutUs from "../components/AboutUs";
import BlogSection from "../components/BlogSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="pt-20 bg-gray-50">
      <Hero />
      <FeaturedJobs />
      <AboutUs />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;
