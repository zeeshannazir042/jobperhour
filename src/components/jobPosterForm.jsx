import React, { useState, useEffect } from "react";
import axios from "axios";

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    location: "",
    salary: "",
    employmentType: "Micro Job / Hourly", // default value
    jobCategory: "",
    workLocationType: "Remote",           // default value
    applicationDeadline: "",
    contactEmail: "",
    jobForPensioners: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // --------------- Get user location automatically ---------------
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Convert coords to human-readable address using OpenStreetMap
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            if (data.display_name) {
              setFormData((prev) => ({ ...prev, location: data.display_name }));
            }
          } catch (err) {
            console.error("Reverse geocoding error:", err);
          }
        },
        (err) => console.error("Geolocation error:", err)
      );
    }
  }, []);

  // --------------- Handle input changes ---------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --------------- Handle form submit ---------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        formData,
        { withCredentials: true } // send JWT cookie
      );
      setMessage("Job posted successfully!");
      setFormData({
        jobTitle: "",
        companyName: "",
        jobDescription: "",
        location: "",
        salary: "",
        employmentType: "Micro Job / Hourly",
        jobCategory: "",
        workLocationType: "Remote",
        applicationDeadline: "",
        contactEmail: "",
        jobForPensioners: false,
      });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error posting job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title*</label>
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />

        <label>Company Name*</label>
        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />

        <label>Job Description*</label>
        <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} required />

        <label>Location*</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Salary</label>
        <input type="text" name="salary" value={formData.salary} onChange={handleChange} />

        <label>Employment Type*</label>
        <select name="employmentType" value={formData.employmentType} onChange={handleChange} required>
          <option value="Micro Job / Hourly">Micro Job / Hourly</option>
          <option value="Project Based">Project Based</option>
        </select>

        <label>Job Category*</label>
        <input type="text" name="jobCategory" value={formData.jobCategory} onChange={handleChange} required />

        <label>Work Location*</label>
        <select name="workLocationType" value={formData.workLocationType} onChange={handleChange} required>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <label>Application Deadline</label>
        <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} />

        <label>Contact Email*</label>
        <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} required />

        <label>
          <input type="checkbox" name="jobForPensioners" checked={formData.jobForPensioners} onChange={handleChange} />
          Job for Pensioners
        </label>

        <button type="submit" disabled={loading}>{loading ? "Posting..." : "Post Job"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default JobPostForm;
