import React, { useState } from "react";
import { sendMessage } from "../../api/communityApi";

const MessageForm = ({ receiverId }) => {
  const [content, setContent] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await sendMessage(receiverId, content);
    setContent("");
    alert("Message sent!");
  };

  return (
    <form onSubmit={handleSend} className="mb-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Send a message..."
      />
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Send
      </button>
    </form>
  );
};

export default MessageForm;
