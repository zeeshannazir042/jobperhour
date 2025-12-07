import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-orange-400 overflow-hidden">

      {/* IMAGE */}
      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {blog.readTime && (
          <span className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg">
            {blog.readTime} min read
          </span>
        )}
      </div>

      {/* CONTENT */}
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

        <p className="text-gray-600 text-sm line-clamp-3">
          {blog.excerpt}
        </p>

        {/* BUTTON */}
        <Link
          to={blog.link}
          className="inline-block px-5 py-2 font-semibold rounded-lg text-white bg-orange-500 transition-all duration-300 hover:bg-orange-600 hover:shadow-lg hover:scale-105 text-center"
        >
          Read More ➜
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
