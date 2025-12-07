import React from "react";

const CommentList = ({ comments }) => {
  if (!comments?.length) return <p className="text-gray-500 mb-4">No comments yet</p>;

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Comments</h3>
      {comments.map((c) => (
        <div key={c._id} className="mb-2 border-b border-gray-200 pb-1">
          <p className="text-sm text-gray-600">{c.user.username}</p>
          <p>{c.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
