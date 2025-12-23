import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PostDetail from "../components/community/PostDetail";
import PostForm from "../components/community/PostForm";
import HeroCommunity from "../components/community/HeroCommunity";
import { getAllPosts } from "../api/communityApi";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

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
    title: "Earn Community Trust",
    description:
      "Gain verified Community Points and Trust Badges by helping neighbors. Every successful exchange boosts your credibility within our network.",
    color: "from-orange-400 to-orange-600",
    icon: "fa-solid fa-shield-check",
  },
  {
    title: "Forge Local Connections",
    description:
      "Meet like-minded neighbors in your Kiez. Share skills, lend resources, and build meaningful relationships that strengthen your local community.",
    color: "from-orange-400 to-orange-600",
    icon: "fa-solid fa-users",
  },
  {
    title: "Promote Sustainability",
    description:
      "Minimize waste by sharing and reusing items. Contribute to a greener, more resourceful community.",
    color: "from-orange-400 to-orange-600",
    icon: "fa-solid fa-leaf",
  },
];

const categoryCards = [
  {
    title: "Free Stuff 🎁",
    description:
      "Find new owners for things you no longer need and discover treasures for free.",
    color: "bg-orange-500",
    items: [
      { icon: "🛋️", text: "Furniture & Home Appliances" },
      { icon: "💻", text: "Tech Gadgets & Electronics" },
      { icon: "👕", text: "Clothes, Shoes & Accessories" },
      { icon: "🧸", text: "Kids' Stuff, Toys & Baby Gear" },
      { icon: "📚", text: "Books, Movies, Music & Games" },
      { icon: "🎨", text: "Home Decor, Art & Crafts" },
      { icon: "🏋️", text: "Sports, Fitness & Outdoor Gear" },
      { icon: "🌱", text: "Garden Plants, Seeds & Supplies" },
      { icon: "🛠️", text: "Building Materials & DIY Tools" },
      { icon: "🚲", text: "Vehicles & Bicycle Parts" },
      { icon: "🐾", text: "Pet Supplies & Pet Items" },
      { icon: "✨", text: "Other Free Stuff", bold: true },
    ],
  },
  {
    title: "Donations & Giving Back ❤️",
    description:
      "Support local causes and connect those in need with the generosity of the community.",
    color: "bg-orange-500",
    items: [
      { icon: "🍴", text: "Food & Supplies for Food Banks" },
      { icon: "👕", text: "Clothing & Toy Drives" },
      { icon: "🏠", text: "Support for Local Shelters (Animal/Homeless)" },
      { icon: "🎓", text: "School & Library Donations" },
      {
        icon: "🌳",
        text: "Community Project Support (e.g., gardens, parks)",
      },
      { icon: "🩸", text: "Blood Donation Drives & Medical Donations" },
      { icon: "🚨", text: "Emergency & Crisis Support" },
      { icon: "✨", text: "Other Donation Causes", bold: true },
    ],
  },
  {
    title: "Help & Tasks 🤝",
    description:
      "Lend a hand or get help with everyday tasks and projects.",
    color: "bg-orange-500",
    items: [
      { icon: "🚚", text: "Help Moving & Transport" },
      { icon: "🛠️", text: "Home Repairs & Assembly" },
      { icon: "🌿", text: "Gardening & Yard Work" },
      { icon: "🐶", text: "Pet Care, Dog Walking & Pet Sitting" },
      { icon: "💻", text: "Tech Help (Phone/PC Setup, Wi-Fi, Software)" },
      { icon: "🎨", text: "Creative & Repair Skills" },
      { icon: "🏪", text: "Setting Up a Stall at Kiez Flow Markt ✨" },
      { icon: "🧹", text: "Cleaning, Organizing & Decluttering" },
      { icon: "👵", text: "Senior & Elderly Support" },
      { icon: "👶", text: "Childcare & Babysitting" },
      { icon: "✨", text: "Other Help & Tasks", bold: true },
    ],
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
    <div className="bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <HeroCommunity />

      {/* ---------- EXCHANGE CATEGORIES ---------- */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800 dark:text-gray-100">
          Exchange Categories
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {categoryCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-transform hover:shadow-2xl hover:-translate-y-1"
            >
              <div
                className={`${card.color} text-white font-bold px-6 py-4 text-lg md:text-xl flex items-center justify-between`}
              >
                {card.title}
                <motion.span
                  className="ml-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🎉
                </motion.span>
              </div>
              <div className="px-6 py-6 space-y-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  {card.description}
                </p>
                <ul className="space-y-3">
                  {card.items.map((item, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-3 text-gray-700 dark:text-gray-200 ${
                        item.bold ? "font-semibold" : "font-normal"
                      }`}
                    >
                      <span className="text-orange-500 text-lg">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- BENEFITS ---------- */}
      <section className="max-w-7xl mx-auto py-24 px-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800 dark:text-gray-100 relative">
          Why Join?
          <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transform -translate-x-1 animate-pulse"></span>
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="p-8 rounded-3xl shadow-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-white/30 dark:border-gray-700/30 transition-transform duration-300 flex flex-col items-center text-center hover:shadow-3xl hover:-translate-y-2"
            >
              <motion.div
                className={`text-6xl mb-5 bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <i className={benefit.icon}></i>
              </motion.div>
              <h3 className="font-bold text-2xl mb-3 text-gray-900 dark:text-gray-100">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- CURRENT ACTIVITIES ---------- */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-gray-100">
          Current Activities
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 sticky top-24 z-20 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl shadow-md">
          <select
            className="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 transition"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
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
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, type: e.target.value }))
            }
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-8 py-3 rounded-full shadow-lg transition font-semibold"
              onClick={() => setShowForm(true)}
            >
              + Create New Post
            </motion.button>
          </div>
        )}

        {/* POSTS LIST & DETAIL */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Posts List */}
          <div className="w-full lg:w-1/3 h-[70vh] overflow-y-auto border border-gray-200 rounded-2xl p-3 flex flex-col gap-3 bg-white dark:bg-gray-800 shadow-md scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100">
            {filteredPosts.map((post) => {
              const categoryColor =
                categoryColors[post.category] || "bg-gray-100 text-gray-700";
              return (
                <motion.div
                  key={post._id}
                  onClick={() => setSelectedPost(post)}
                  whileHover={{ scale: 1.03 }}
                  className={`p-4 rounded-2xl shadow cursor-pointer transition transform hover:-translate-y-1 ${
                    selectedPost?._id === post._id
                      ? "border-2 border-orange-500 bg-orange-50 dark:bg-gray-700 shadow-lg"
                      : "bg-white dark:bg-gray-800"
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
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                    {post.description || "No description"}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Post Detail */}
          <div className="w-full lg:w-2/3 h-[70vh] overflow-y-auto border border-gray-200 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-md scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 transition-all">
            {!selectedPost ? (
              <p className="text-gray-600 dark:text-gray-300 text-center mt-20">
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
      </section>

      {/* ---------- NEW POST MODAL ---------- */}
      {showForm && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-y-auto max-h-[90vh] p-6 relative"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-2xl font-bold"
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
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default CommunityPage;
