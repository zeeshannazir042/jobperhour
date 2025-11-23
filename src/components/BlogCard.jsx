import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 duration-300 overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col justify-between h-full">
        <span className="text-sm text-orange-500 font-semibold mb-2">{blog.category}</span>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
        <p className="text-gray-500 text-sm mb-4">{blog.date} | {blog.author}</p>
        <p className="text-gray-700 mb-4">{blog.excerpt}</p>
        <Link
          to={blog.link}
          className="mt-auto px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition transform hover:scale-105 text-center"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
