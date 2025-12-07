import React from "react";

const PostList = ({ posts, onSelect, selectedId }) => {
  return (
    <div className="bg-white w-1/3 p-4 border-r border-gray-200 overflow-y-auto">
      <h2 className="text-xl font-bold text-orange-600 mb-4">Posts</h2>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            className={`p-3 mb-2 rounded cursor-pointer ${
              selectedId === post._id ? "bg-orange-100" : "hover:bg-orange-50"
            }`}
            onClick={() => onSelect(post)}
          >
            <h3 className="font-semibold">{post.title || "Untitled Post"}</h3>
            <p className="text-sm text-gray-600">
              {post.user?.username || "Unknown User"}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default PostList;
