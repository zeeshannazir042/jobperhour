import React, { useState, useEffect } from "react";
import PostDetail from "../components/community/PostDetail";
import PostForm from "../components/community/PostForm";
import { getAllPosts } from "../api/communityApi";
import { useAuth } from "../context/AuthContext";

const categoryColors = {
  "Free Stuff 🎁": "bg-yellow-100 text-yellow-800",
  "Donations & Giving Back ❤️": "bg-pink-100 text-pink-700",
  "Community & Events 🗓️": "bg-blue-100 text-blue-700",
  "Skills & Knowledge Sharing 🧠": "bg-purple-100 text-purple-700",
  "Food & Garden 🌱": "bg-green-100 text-green-700",
};

const postTypes = [
  { value: "", label: "All Types" },
  { value: "offer", label: "Offer" },
  { value: "request", label: "Request" },
];

const benefitsData = [
  {
    title: "Building Trust",
    description: "Collect points and earn trust badges for credibility.",
    color: "text-orange-500",
    icon: "fa-solid fa-shield-check",
  },
  {
    title: "Local Networking",
    description: "Meet like-minded people and create local connections.",
    color: "text-orange-500",
    icon: "fa-solid fa-users",
  },
  {
    title: "Sustainability",
    description: "Reduce waste by sharing and reusing resources.",
    color: "text-orange-500",
    icon: "fa-solid fa-leaf",
  },
];

const CommunityPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ category: "", type: "" });

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
      if (data.length > 0 && !selectedPost) setSelectedPost(data[0]);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = () => fetchPosts();

  const filteredPosts = posts.filter((post) => {
    const matchCategory = filters.category ? post.category === filters.category : true;
    const matchType = filters.type ? post.type === filters.type : true;
    return matchCategory && matchType;
  });

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      {/* ---------- PAGE TITLE ---------- */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-orange-500 mb-12 animate-fade-in">
        🌟 Community Exchanges
      </h1>

      {/* ---------- EXCHANGE CATEGORIES ---------- */}
<section className="max-w-6xl mx-auto mb-20">
  <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
    Exchange Categories
  </h2>

  <div className="grid md:grid-cols-3 gap-8">
    {Object.keys(categoryColors).map((cat) => (
      <div
        key={cat}
        className="border border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 bg-white"
      >
        <h3 className={`font-bold text-lg mb-4 ${categoryColors[cat].split(" ")[1]}`}>
          {cat}
        </h3>
        <ul className="text-gray-600 text-sm space-y-2">
          {cat === "Free Stuff 🎁" && (
            <>
              <li>🛋️ Furniture & Home Appliances</li>
              <li>💻 Tech Gadgets & Electronics</li>
              <li>👕 Clothes, Shoes & Accessories</li>
              <li>🧸 Baby Gear & Kids' Stuff</li>
              <li>📚 Books, Movies, Music & Games</li>
            </>
          )}
          {cat === "Donations & Giving Back ❤️" && (
            <>
              <li>🍲 Food Donations</li>
              <li>🧥 Clothes & Essentials Donation</li>
              <li>🎁 Charity Fundraisers</li>
              <li>🏠 Community Support Activities</li>
            </>
          )}
          {cat === "Community & Events 🗓️" && (
            <>
              <li>🎉 Local Meetups & Socials</li>
              <li>🛠️ Workshops & Classes</li>
              <li>🤝 Volunteer Opportunities</li>
              <li>📅 Community Gatherings</li>
            </>
          )}
          {cat === "Skills & Knowledge Sharing 🧠" && (
            <>
              <li>💡 Tutorials & How-Tos</li>
              <li>📚 Study Groups & Learning Circles</li>
              <li>🖥️ Tech & Coding Help</li>
              <li>🎨 Art, Music & Creative Classes</li>
            </>
          )}
          {cat === "Food & Garden 🌱" && (
            <>
              <li>🥦 Share & Swap Produce</li>
              <li>🌿 Gardening Tips & Seeds</li>
              <li>🍳 Recipes & Cooking Advice</li>
              <li>🐝 Sustainable Gardening Practices</li>
            </>
          )}
        </ul>
      </div>
    ))}
  </div>
</section>

      {/* ---------- COMMUNITY BENEFITS ---------- */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Why Join?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {benefitsData.map((benefit) => (
            <div
              key={benefit.title}
              className="p-6 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-white"
            >
              <div className={`text-3xl mb-4 ${benefit.color}`}>
                <i className={benefit.icon}></i>
              </div>
              <h3 className="font-bold text-xl mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CURRENT ACTIVITIES & FILTERS ---------- */}
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Current Activities
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          className="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition"
          value={filters.category}
          onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {Object.keys(categoryColors).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition"
          value={filters.type}
          onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
        >
          {postTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {user && (
        <div className="flex justify-center mb-8">
          <button
            className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:from-orange-500 hover:to-orange-600 transition transform font-semibold"
            onClick={() => setShowForm(true)}
          >
            + Create New Post
          </button>
        </div>
      )}

      {/* ---------- POSTS LIST & DETAIL ---------- */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        {/* Posts List */}
        <div className="w-full lg:w-1/3 h-[70vh] overflow-y-auto border border-gray-200 rounded-2xl p-3 flex flex-col gap-3 bg-white shadow-md scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100">
          {filteredPosts.map((post) => {
            const categoryColor =
              categoryColors[post.category] || "bg-gray-100 text-gray-700";
            return (
              <div
                key={post._id}
                onClick={() => setSelectedPost(post)}
                className={`p-4 rounded-2xl shadow hover:shadow-xl cursor-pointer transition transform hover:-translate-y-1 ${
                  selectedPost?._id === post._id
                    ? "border-2 border-orange-500 bg-orange-50"
                    : "bg-white"
                }`}
              >
                <h2 className="text-lg font-bold text-orange-600 line-clamp-2">
                  {post.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2 mb-1">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColor}`}
                  >
                    {post.category}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-700">
                    {post.type?.toUpperCase() || "N/A"}
                  </span>
                </div>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {post.description || "No description"}
                </p>
              </div>
            );
          })}
        </div>

        {/* Post Detail */}
        <div className="w-full lg:w-2/3 h-[70vh] overflow-y-auto border border-gray-200 rounded-2xl p-6 bg-white shadow-md scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100">
          {!selectedPost ? (
            <p className="text-gray-600 text-center mt-20">
              Select a post to view details.
            </p>
          ) : (
            <PostDetail
              post={selectedPost}
              onEdit={() => {
                setSelectedPost(null);
                setShowForm(true);
              }}
              onDelete={() => {
                setSelectedPost(null);
                handleRefresh();
              }}
              refresh={handleRefresh}
            />
          )}
        </div>
      </div>

      {/* ---------- NEW POST MODAL ---------- */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-y-auto max-h-[90vh] p-6 relative animate-fade-in-up">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <PostForm
              onCreated={() => {
                handleRefresh();
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
