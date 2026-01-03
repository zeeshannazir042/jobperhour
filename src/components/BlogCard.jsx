import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, index }) => {
  return (
    <div
      className="group bg-white rounded-xl shadow-md border border-transparent overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-orange-400"
      style={{
        animationDelay: `${index * 0.15}s`,
        animationName: "slideUp",
        animationDuration: "0.8s",
        animationFillMode: "forwards",
        opacity: 0
      }}
    >
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-6 space-y-4">
        <span className="text-xs uppercase font-semibold tracking-wider text-orange-600">
          {blog.category}
        </span>

        <h3 className="text-2xl font-semibold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors duration-200">
          {blog.title}
        </h3>

        <div className="text-gray-500 text-sm flex justify-between">
          <span>{blog.date}</span>
          <span>• {blog.author}</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">{blog.excerpt}</p>

        <Link
          to={blog.link}
          className="inline-block px-5 py-2 font-semibold rounded-lg text-white bg-orange-500 transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:scale-105 text-center"
        >
          {blog.readMore}
        </Link>
      </div>

      <style>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BlogCard;
