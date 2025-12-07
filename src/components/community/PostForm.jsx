import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { createPost, getUserPoints } from "../../api/communityApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const categories = [
  { value: "free-stuff", label: "Free Stuff 🎁" },
  { value: "donations", label: "Donations & Giving Back ❤️" },
  { value: "community-events", label: "Community & Events 🗓️" },
  { value: "skills-knowledge", label: "Skills & Knowledge Sharing 🧠" },
  { value: "food-garden", label: "Food & Garden 🌱" },
];

const subcategories = {
  "free-stuff": [
    "Furniture & Home Appliances",
    "Tech Gadgets & Electronics",
    "Clothes, Shoes & Accessories",
    "Kids' Stuff, Toys & Baby Gear",
    "Books, Movies, Music & Games",
    "Home Decor, Art & Crafts",
    "Sports, Fitness & Outdoor Gear",
    "Garden Plants, Seeds & Supplies",
    "Building Materials & DIY Tools",
    "Vehicles & Bicycle Parts",
    "Pet Supplies & Pet Items",
    "Other Free Stuff",
  ],
  donations: ["Charity Donations", "Food & Essentials", "Clothing & Accessories"],
  "community-events": ["Workshops", "Meetups", "Fundraisers"],
  "skills-knowledge": ["Tutoring", "Mentoring", "Workshops"],
  "food-garden": ["Plant Swaps", "Gardening Help", "Food Sharing"],
};

const participantTypes = [
  { value: "anyone", label: "Anyone in the community" },
  { value: "specific", label: "Specific group (describe in description)" },
  { value: "invitation", label: "By invitation only" },
];

const postTypes = [
  { value: "offer", label: "Offer" },
  { value: "request", label: "Request" },
];

const PostForm = ({ onCreated, onClose }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    type: "",
    category: "",
    subcategory: "",
    title: "",
    description: "",
    points: 0,
    startDate: null,
    endDate: null,
    virtual: false,
    location: "",
    participants: "anyone",
    maxParticipants: null,
    additionalInfo: "",
  });

  const [userPoints, setUserPoints] = useState(0); // total points user has
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const availableSubcategories = subcategories[formData.category] || [];

  // Fetch user points on mount
  useEffect(() => {
    if (user?.id) {
      getUserPoints(user.id)
        .then((pts) => setUserPoints(pts))
        .catch((err) => console.error("Failed to fetch user points:", err));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to create a post!");

    setLoading(true);
    setError("");

    try {
      const payload = {
        user: user.id,
        type: formData.type,
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        title: formData.title,
        description: formData.description || undefined,
        points: Number(formData.points) || 0,
        startDate: formData.startDate,
        endDate: formData.endDate,
        virtual: formData.virtual,
        location: formData.virtual ? "" : formData.location,
        participants: formData.participants,
        maxParticipants: formData.maxParticipants
          ? Number(formData.maxParticipants)
          : 0,
        additionalInfo: formData.additionalInfo || undefined,
      };

      await createPost(payload);

      setLoading(false);
      onCreated?.();
      onClose?.();
      alert("Community post created successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create post");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <h1 className="text-2xl font-bold mb-6 text-orange-600 text-center">
        Create a Community Exchange
      </h1>

      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type */}
        <div>
          <label className="block mb-2 font-semibold">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">Select type</option>
            {postTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        {availableSubcategories.length > 0 && (
          <div>
            <label className="block mb-2 font-semibold">Subcategory</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Select a subcategory</option>
              {availableSubcategories.map((sc) => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
            </select>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a clear title"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe your offer/request"
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        {/* Points Slider */}
        <div>
          <label className="block mb-2 font-semibold">
            Community Points (You have {userPoints})
          </label>
          <input
            type="range"
            name="points"
            min={0}
            max={userPoints}
            value={formData.points}
            onChange={handleChange}
            className="w-full"
          />
          <p className="text-right text-sm text-gray-600">
            Selected Points: {formData.points}
          </p>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold">Start Date</label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
              showTimeSelect
              dateFormat="Pp"
              className="w-full border px-4 py-2 rounded"
              placeholderText="Select start date"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">End Date</label>
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
              showTimeSelect
              dateFormat="Pp"
              className="w-full border px-4 py-2 rounded"
              placeholderText="Select end date"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-semibold">Location</label>
          <div className="flex items-center gap-4 mb-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!formData.virtual}
                onChange={() => setFormData((prev) => ({ ...prev, virtual: false }))}
              />
              In person
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={formData.virtual}
                onChange={() => setFormData((prev) => ({ ...prev, virtual: true }))}
              />
              Virtual
            </label>
          </div>
          {!formData.virtual && (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border px-4 py-2 rounded"
              required={!formData.virtual}
            />
          )}
        </div>

        {/* Participants */}
        <div>
          <label className="block mb-2 font-semibold">Who can participate?</label>
          <select
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            {participantTypes.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Max participants */}
        <div>
          <label className="block mb-2 font-semibold">Participant Limit (optional)</label>
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants || ""}
            onChange={handleChange}
            min={1}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold transition"
        >
          {loading ? "Creating..." : "Create Exchange Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
