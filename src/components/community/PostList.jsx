import React from "react";

const PostList = ({ posts, onSelect, selectedId }) => {
  return (
    <div className="bg-white w-full lg:w-1/3 p-4 border-r border-gray-200 rounded-2xl shadow-md h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Posts</h2>
      
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className={`
              p-4 mb-3 rounded-2xl shadow-sm cursor-pointer transition transform 
              hover:-translate-y-1 hover:shadow-md
              ${selectedId === post._id ? "bg-orange-50 border-2 border-orange-400" : "bg-white"}
            `}
            onClick={() => onSelect(post)}
          >
            <h3 className="font-bold text-lg text-orange-600 line-clamp-2">
              {post.title || "Untitled Post"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {post.user?.username || "Unknown User"}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {post.category && (
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {post.category}
                </span>
              )}
              {post.type && (
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
                  {post.type.toUpperCase()}
                </span>
              )}
            </div>
            <p className="text-gray-700 text-sm mt-2 line-clamp-3">
              {post.description || "No description available."}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-10">No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
