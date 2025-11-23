import React from "react";
import BlogCard from "./BlogCard";

// Import your local images
import blog1Img from "../assets/images/Blogs/student.jpg";
import blog2Img from "../assets/images/Blogs/visa.jpg";
import blog3Img from "../assets/images/Blogs/guide.jpg";
import blog4Img from "../assets/images/Blogs/advice.jpg";

const blogPosts = [
  {
    category: "Student Jobs",
    title: "Hourly Jobs for Students in Berlin",
    date: "31.10.2025",
    author: "Admin",
    excerpt:
      "Discover the top hourly jobs suitable for students in Berlin — from hospitality, tutoring, delivery, and office work. Learn how to balance study and work effectively.",
    image: blog1Img,
    link: "/blog/hourly-jobs-students-berlin",
  },
  {
    category: "Visa & Work",
    title: "Visa & Work Options for International Students",
    date: "20.10.2025",
    author: "Admin",
    excerpt:
      "Learn how international students and non-German speakers can find highly paid hourly jobs in Berlin and understand visa & work regulations.",
    image: blog2Img,
    link: "/blog/visa-work-options",
  },
  {
    category: "Tips & Guides",
    title: "Top Apps to Find Micro-Jobs in Berlin",
    date: "15.09.2025",
    author: "Admin",
    excerpt:
      "A list of must-have apps for students and locals to find flexible, hourly jobs in Berlin — from delivery to tutoring and creative gigs.",
    image: blog3Img,
    link: "/blog/top-apps-micro-jobs",
  },
  {
    category: "Career Advice",
    title: "Balancing Study and Work Effectively",
    date: "05.09.2025",
    author: "Admin",
    excerpt:
      "Tips and strategies for students to manage hourly jobs while keeping up with academic commitments — stay productive and stress-free.",
    image: blog4Img,
    link: "/blog/balancing-study-work",
  },
];

const BlogSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-6">
          Read Our Blog
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
          Helpful tips and guides for students and job seekers in Berlin. Explore hourly jobs, visa information, and opportunities for international students.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
