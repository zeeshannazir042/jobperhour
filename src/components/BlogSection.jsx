import React from "react";
import BlogCard from "./BlogCard";

import blog1Img from "../assets/images/Blogs/student.jpg";
import blog2Img from "../assets/images/Blogs/visa.jpg";
import blog4Img from "../assets/images/Blogs/advice.jpg";

const blogPosts = [
  {
    category: "Student Jobs",
    title: "Hourly Jobs for Students in Berlin",
    date: "31.10.2025",
    author: "Admin",
    excerpt:
      "Discover the top hourly jobs suitable for students in Berlin — from hospitality, tutoring, delivery, and office work.",
    image: blog1Img,
    link: "/blog/hourly-jobs-students-berlin",
  },
  {
    category: "Visa & Work",
    title: "Visa & Work Options for International Students",
    date: "20.10.2025",
    author: "Admin",
    excerpt:
      "Learn how international students can legally work, earn, and find hourly jobs without hassle.",
    image: blog2Img,
    link: "/blog/visa-work-options",
  },
  {
    category: "Career Advice",
    title: "Balancing Study and Work Effectively",
    date: "05.09.2025",
    author: "Admin",
    excerpt:
      "Learn how to manage college life while earning money—without burning out.",
    image: blog4Img,
    link: "/blog/balancing-study-work",
  },
];

const BlogSection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0e0e0e]">
      {/* Background Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[400px] h-[400px] bg-orange-500 opacity-20 blur-[160px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Read Our Blog
        </h2>

        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mb-8 animate-pulse"></div>

        <p className="text-center text-gray-400 mb-14 max-w-3xl mx-auto text-lg leading-relaxed">
          Helpful guides for job seekers, students, and newcomers in Berlin — stay updated and prepared.
        </p>

        {/* Blog Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((blog, index) => (
            <div
              key={index}
              className="animate-slide-up opacity-0"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp .8s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
