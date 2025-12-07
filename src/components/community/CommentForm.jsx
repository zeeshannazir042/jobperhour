import React, { useState, useEffect } from "react";
import { addCommentToPost, getPostPoints } from "../../api/communityApi";

const CommentForm = ({ postId, refresh }) => {
  const [comment, setComment] = useState("");
  const [points, setPoints] = useState(0);

  const fetchPoints = async () => {
    try {
      const res = await getPostPoints(postId);
      setPoints(res.points);
    } catch (err) {
      console.error("Failed to fetch points:", err);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await addCommentToPost(postId, comment);
    setComment("");
    refresh();
    fetchPoints();
  };

  return (
    <div>
      <div className="mb-2">
        <span className="font-semibold">Points: </span>{points}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Write a comment..."
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
