import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import MessageForm from "./MessageForm";
import { likePost, deletePost } from "../../api/communityApi";
import { useAuth } from "../../context/AuthContext";

const categoryColors = {
  "Free Stuff 🎁": "bg-yellow-100 text-yellow-800",
  "Donations & Giving Back ❤️": "bg-pink-100 text-pink-700",
  "Community & Events 🗓️": "bg-blue-100 text-blue-700",
  "Skills & Knowledge Sharing 🧠": "bg-purple-100 text-purple-700",
  "Food & Garden 🌱": "bg-green-100 text-green-700",
};

const PostDetail = ({ post, onEdit, onDelete, refresh }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post?.likes?.length || 0);

  useEffect(() => {
    setLikes(post?.likes?.length || 0);
  }, [post]);

  const handleLike = async () => {
    if (!user) return alert("Login to like posts!");
    try {
      const updated = await likePost(post._id);
      setLikes(updated?.likes?.length || likes);
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const handleDelete = async () => {
    if (!user || user.id !== post?.user?._id) return;
    if (window.confirm("Delete this post?")) {
      try {
        await deletePost(post._id);
        onDelete();
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 italic">
        Select a post to view details
      </div>
    );
  }

  const username = post.user?.username || "Unknown User";
  const email = post.user?.email || "No email";

  return (
    <div className="p-6 w-full overflow-y-auto space-y-6">
      {/* Header */}
<div className="flex justify-between items-start">
  <div>
    <h2 className="text-3xl font-bold text-orange-600 mb-1">{post.title}</h2>
    <p className="text-sm text-gray-500">
      By <span className="font-semibold text-gray-700">{post.user?.username || "Unknown User"}</span>
    </p>
    <p className="text-xs text-gray-400 mt-1">
      Posted: {new Date(post.createdAt).toLocaleString()}
    </p>
  </div>
  {user && user.id === post?.user?._id && (
    <div className="flex gap-2">
      <button
        className="bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded hover:bg-orange-50 transition"
        onClick={() => onEdit(post)}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )}
</div>

      {/* Post Metadata */}
      <div className="flex flex-wrap gap-3">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
          {post.category || "N/A"}
        </span>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
          {post.type?.toUpperCase() || "N/A"}
        </span>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
          Subcategory: {post.subcategory || "N/A"}
        </span>
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
          Points: {post.points || 0}
        </span>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-lg mb-1">Description</h3>
        <p className="text-gray-700">{post.description || "No description available."}</p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-sm">Begins</h3>
          <p className="text-gray-700">{post.startDate ? new Date(post.startDate).toLocaleString() : "N/A"}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Ends</h3>
          <p className="text-gray-700">{post.endDate ? new Date(post.endDate).toLocaleString() : "N/A"}</p>
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold text-sm">Location</h3>
        <p className="text-gray-700">
          {post.virtual ? "Virtual / Online" : post.location || "N/A"}
        </p>
      </div>

      {/* Participants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-sm">Who can participate?</h3>
          <p className="text-gray-700">{post.participants || "Anyone in the community"}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Participant Limit</h3>
          <p className="text-gray-700">{post.maxParticipants || "No limit"}</p>
        </div>
      </div>

      {/* Additional Info */}
      {post.additionalInfo && (
        <div>
          <h3 className="font-semibold text-sm">Additional Info</h3>
          <p className="text-gray-700">{post.additionalInfo}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 shadow-md transition"
          onClick={handleLike}
        >
          👍 Like ({likes})
        </button>
      </div>

      {/* Comments & Forms */}
      <div className="space-y-6 mt-6">
        <CommentList comments={post?.comments || []} />
        {user && <CommentForm postId={post._id} refresh={refresh} />}
        {user && user.id !== post?.user?._id && <MessageForm receiverId={post?.user?._id} />}
      </div>
    </div>
  );
};

export default PostDetail;
