import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // updated hook
import { createJob } from "../api/jobApi";

const PostJob = () => {
  const { user, token } = useAuth(); // get token for auth if needed
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    location: "",
    salary: "",
    employmentType: "Micro Job / Hourly",
    jobCategory: "",
    workLocationType: "Remote",
    applicationDeadline: "",
    jobForPensioners: false,
    contactEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    if (!user) {
      navigate("/login"); // redirect if not logged in
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Include token for authentication if required by backend
      await createJob(formData, token);
      setLoading(false);
      navigate("/my-jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job");
      setLoading(false);
    }
  };

  const employmentOptions = [
    "Micro Job / Hourly",
    "Project Based",
    "One Hand to the Other",
    "Jobs for Pensioners",
  ];

  return (
    <div
      className={`max-w-4xl mx-auto mt-24 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-xl transition-all duration-700 transform ${
        fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center animate-fadeInDown">
        Post a New Job
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded animate-fadeIn">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Details */}
        <SectionCard title="Job Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g. Frontend Developer" required />
            <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. ABC Technologies" required />
            <InputField label="Job Category" name="jobCategory" value={formData.jobCategory} onChange={handleChange} placeholder="e.g. IT, Marketing" required />
            <InputField label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Berlin, Germany" required />
            <InputField label="Salary (Optional)" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. €20/hour" />
            <InputField label="Application Deadline (Optional)" name="applicationDeadline" type="date" value={formData.applicationDeadline} onChange={handleChange} />
          </div>
        </SectionCard>

        {/* Employment Type */}
        <SectionCard title="Employment Type">
          <div className="flex flex-wrap gap-4 mt-2">
            {employmentOptions.map((type) => (
              <label
                key={type}
                className={`flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-orange-50 dark:hover:bg-gray-800 ${
                  formData.employmentType === type
                    ? "border-orange-500 bg-orange-100 dark:bg-orange-600/20"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="employmentType"
                  value={type}
                  checked={formData.employmentType === type}
                  onChange={handleChange}
                  className="accent-orange-500"
                  required
                />
                <span className="text-gray-700 dark:text-gray-200">{type}</span>
              </label>
            ))}
          </div>
        </SectionCard>

        {/* Work Location */}
        <SectionCard title="Work Location">
          <SelectField label="Work Location Type" name="workLocationType" value={formData.workLocationType} onChange={handleChange} options={["Remote", "On-site", "Hybrid"]} />
        </SectionCard>

        {/* Job Description */}
        <SectionCard title="Job Description">
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows={6}
            placeholder="Describe responsibilities, requirements, and perks..."
            className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 transition-all duration-300 hover:shadow-md"
            required
          />
        </SectionCard>

        {/* Contact & Pensioners */}
        <SectionCard title="Contact Information">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <InputField label="Contact Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" placeholder="e.g. hr@abc.com" required />
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <input type="checkbox" name="jobForPensioners" checked={formData.jobForPensioners} onChange={handleChange} className="w-4 h-4" />
              <span className="text-gray-700 dark:text-gray-200">Job for Pensioners</span>
            </div>
          </div>
        </SectionCard>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 font-semibold transition-all duration-300 transform hover:scale-105"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

// Section Card Wrapper
const SectionCard = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-xl animate-fadeInUp">
    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h2>
    {children}
  </div>
);

const InputField = ({ label, name, value, onChange, placeholder, type = "text", required = false }) => (
  <div className="flex flex-col">
    <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 transition-all duration-300 hover:shadow-md"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-gray-100 transition-all duration-300 hover:shadow-md"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default PostJob;
