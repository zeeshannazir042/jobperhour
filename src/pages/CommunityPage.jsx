import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeroCommunity from "../components/community/HeroCommunity";
import Footer from "../components/Footer";
import HelpPopup from "../components/HelpPopup";
import PostDetail from "../components/community/PostDetail";
import PostForm from "../components/community/PostForm";
import { useAuth } from "../context/AuthContext";

// ---------- HELP BUTTON ITEMS ----------
const helpButtonItems = {
 "Free Stuff": {
    title: { en: "Free Stuff 🎁", de: "Kostenlos 🎁" },

    items: {
      "Furniture & Home Appliances": "🛋️",
      "Tech Gadgets & Electronics": "💻",
      "Clothes, Shoes & Accessories": "👕",
      "Kids' Stuff, Toys & Baby Gear": "🧸",
      "Books, Movies, Music & Games": "📚",
      "Home Decor, Art & Crafts": "🎨",
      "Sports, Fitness & Outdoor Gear": "🏋️",
      "Garden Plants, Seeds & Supplies": "🌱",
      "Building Materials & DIY Tools": "🛠️",
      "Board Games & Hobby Kits": "🎮",
      "Posters, Prints & Small Artwork": "🖼️",
      "Stationery & Office Supplies": "🖊️",
      "Musical Instruments (non-motorized)": "🎵",
      "Other Free Stuff": "✨"
    },

    sdgs: {
      "Furniture & Home Appliances": ["SDG 12"],
      "Tech Gadgets & Electronics": ["SDG 12"],
      "Clothes, Shoes & Accessories": ["SDG 12"],
      "Kids' Stuff, Toys & Baby Gear": ["SDG 4", "SDG 12"],
      "Books, Movies, Music & Games": ["SDG 4"],
      "Home Decor, Art & Crafts": ["SDG 11"],
      "Sports, Fitness & Outdoor Gear": ["SDG 3"],
      "Garden Plants, Seeds & Supplies": ["SDG 15"],
      "Building Materials & DIY Tools": ["SDG 11", "SDG 12"],
      "Board Games & Hobby Kits": ["SDG 4"],
      "Posters, Prints & Small Artwork": ["SDG 11"],
      "Stationery & Office Supplies": ["SDG 4"],
      "Musical Instruments (non-motorized)": ["SDG 4"],
      "Other Free Stuff": ["SDG 12"]
    }
  },

  Donations: {
    title: { en: "Donations & Giving Back ❤️", de: "Spenden & Helfen ❤️" },

    items: {
      "Food & Supplies for Food Banks": "🍴",
      "Clothing & Toy Drives": "✨",
      "Support for Local Shelters (Animal/Homeless)": "🎨",
      "School & Library Donations": "📦",
      "Community Project Support (gardens, parks, murals, public space beautification)": "🌱",
      "Donation Drives for NGOs": "📦",
      "Book & Educational Material Donations": "📦",
      "Recycling & Upcycling Projects for the community": "🌳",
      "Public Awareness Campaigns (sustainability, literacy, social causes)": "🖼️",
      "Other Donation Causes": "📦"
    },

    sdgs: {
      "Food & Supplies for Food Banks": ["SDG 2"],
      "Clothing & Toy Drives": ["SDG 12"],
      "Support for Local Shelters (Animal/Homeless)": ["SDG 11"],
      "School & Library Donations": ["SDG 4"],
      "Community Project Support (gardens, parks, murals, public space beautification)": ["SDG 11"],
      "Donation Drives for NGOs": ["SDG 17"],
      "Book & Educational Material Donations": ["SDG 4"],
      "Recycling & Upcycling Projects for the community": ["SDG 12", "SDG 13"],
      "Public Awareness Campaigns (sustainability, literacy, social causes)": ["SDG 13", "SDG 4"],
      "Other Donation Causes": ["SDG 10"]
    }
  },

  "Help & Tasks": {
    title: { en: "Help & Tasks 🤝", de: "Hilfe & Aufgaben 🤝" },

    items: {
      "Gardening & Yard Work": "🌱",
      "Tech Help": "💻",
      "Creative & Repair Skills": "🛠️",
      "Cleaning & Organizing": "🧹",
      "Assistance with Moving Small Items": "✨",
      "Furniture Assembly & Repairs": "🛋️",
      "Event Setup & Community Activities": "🌳",
      "Tutoring & Homework Help": "🎨",
      "Idea Sharing & Civic Initiatives": "🌳",
      "Skill & Craft Circles": "🧵",
      "Urban Gardening & Tree Planting": "🌱",
      "Community Supply Libraries": "🌳",
      "Local History & Heritage Projects": "🖼️",
      "Other Help & Tasks": "✨"
    },

    sdgs: {
      "Gardening & Yard Work": ["SDG 15", "SDG 13"],
      "Tech Help": ["SDG 4", "SDG 8"],
      "Creative & Repair Skills": ["SDG 12", "SDG 8"],
      "Cleaning & Organizing": ["SDG 11", "SDG 12"],
      "Assistance with Moving Small Items": ["SDG 11"],
      "Furniture Assembly & Repairs": ["SDG 12", "SDG 11"],
      "Event Setup & Community Activities": ["SDG 11"],
      "Tutoring & Homework Help": ["SDG 4"],
      "Idea Sharing & Civic Initiatives": ["SDG 11"],
      "Skill & Craft Circles": ["SDG 4", "SDG 8"],
      "Urban Gardening & Tree Planting": ["SDG 13", "SDG 15"],
      "Community Supply Libraries": ["SDG 12", "SDG 11"],
      "Local History & Heritage Projects": ["SDG 11", "SDG 4"],
      "Other Help & Tasks": ["SDG 11"]
    }
  },

  Impact: {
    title: { en: "Impact 🌟", de: "Wirkung 🌟" },
    items: {
      "Items Reused": { emoji: "♻️", sdg: "SDG 12", count: 0 },
      "Help Tasks Completed": { emoji: "🤝", sdg: "SDG 11", count: 0 },
      "Donation Drives Supported": { emoji: "❤️", sdg: "SDG 10", count: 0 },
      "Community Projects": { emoji: "🌱", sdg: "SDG 13", count: 0 }
    }
  }
};

// ---------- QUICK HELP BUTTONS ----------
const helpButtons = [
  { label: "Free Stuff" },
  { label: "Donations" },
  { label: "Help & Tasks" },
  { label: "Impact" },
];

// ---------- COMMUNITY PAGE COMPONENT ----------
const CommunityPage = () => {
  const { i18n, t } = useTranslation();
  const { user } = useAuth();

  const [activeHelpCategory, setActiveHelpCategory] = useState(null);
  const [filters, setFilters] = useState({ category: "", type: "" });
  const [selectedPost, setSelectedPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Placeholder data
  const postTypes = [{ value: "offer", label: "Offer" }, { value: "request", label: "Request" }];
  const filteredPosts = []; // Replace with API data
  const categoryColors = {
    "Free Stuff": "bg-green-100 text-green-800",
    Donations: "bg-red-100 text-red-800",
    "Help & Tasks": "bg-blue-100 text-blue-800",
  };
const benefitsData = [
  {
    icon: "⭐", // optional icon
    title: "Earn Community Trust",
    description:
      "Gain verified Community Points and Trust Badges by helping neighbors. Every successful exchange boosts your credibility within our network.",
    color: "from-yellow-400 to-yellow-500",
  },
  {
    icon: "💡",
    title: "Forge Local Connections",
    description:
      "Meet like-minded neighbors in your Kiez. Share skills, lend resources, and build meaningful relationships that strengthen your local community.",
    color: "from-pink-400 to-pink-500",
  },
  {
    icon: "🌱",
    title: "Promote Sustainability",
    description:
      "Minimize waste by sharing and reusing items. Contribute to a greener, more resourceful community.",
    color: "from-green-400 to-green-500",
  },
];
  const handleRefresh = () => {}; // Placeholder

  // Map main categories to SDG badges
  const mainCategorySDGs = {
    "Free Stuff": "SDG 12",
    Donations: "SDG 10",
    "Help & Tasks": "SDG 11",
    Impact: "SDG 13",
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      <HeroCommunity />

      {/* ---------- QUICK ACTION BUTTONS ---------- */}
      <section className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-30 py-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 px-4">
          {helpButtons.map((btn, idx) => (
            <motion.div
              key={idx}
              onClick={() =>
                setActiveHelpCategory({
                  ...helpButtonItems[btn.label],
                  type: btn.label === "Impact" ? "impact" : "community",
                })
              }
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center justify-center w-32 h-32 rounded-2xl shadow-lg cursor-pointer p-4 transition-all text-center ${
                activeHelpCategory?.title?.en === helpButtonItems[btn.label]?.title?.en
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  : "bg-orange-100 text-orange-800 hover:bg-orange-200"
              }`}
            >
              <div className="text-4xl mb-2">
              
                {btn.label === "Free Stuff" && "🎁"}
                {btn.label === "Donations" && "❤️"}
                {btn.label === "Help & Tasks" && "🤝"}
                {btn.label === "Impact" && "🌟"}
              </div>
              <div className="font-semibold text-sm md:text-base">{btn.label}</div>

              {/* SDG Badge */}
              {mainCategorySDGs[btn.label] && (
                <a
                  href="https://www.undp.org/sustainable-development-goals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 px-2 py-1 text-xs rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
                >
                  {mainCategorySDGs[btn.label]}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- BENEFITS ---------- */}
      <section className="max-w-7xl mx-auto py-24 px-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800 dark:text-gray-100 relative">
          {t("whyJoin")}
          <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-500 rounded-full transform -translate-x-1 animate-pulse"></span>
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
          {t("currentActivities")}
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
            <option value="">{t("allCategories")}</option>
            {Object.keys(categoryColors).map((cat) => (
              <option key={cat} value={cat}>
                {t(cat)}
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
            {postTypes.map((tType) => (
              <option key={tType.value} value={tType.value}>
                {t(tType.label)}
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
              {t("createNewPost")}
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
                    {post.description || t("noDescription")}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Post Detail */}
          <div className="w-full lg:w-2/3 h-[70vh] overflow-y-auto border border-gray-200 rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-md scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 transition-all">
            {!selectedPost ? (
              <p className="text-gray-600 dark:text-gray-300 text-center mt-20">
                {t("selectPostToView")}
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

      {/* ---------- HELP POPUP ---------- */}
      {activeHelpCategory && (
        <HelpPopup
          data={activeHelpCategory}
          lang={i18n.language}
          type={activeHelpCategory.type}
          onClose={() => setActiveHelpCategory(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default CommunityPage;
