// src/api/jobApi.js
import API from "./axios";

// Create a new job
export const createJob = async (jobData) => {
  const response = await API.post("/jobs", jobData);
  return response.data;
};

// Get all jobs
export const getJobs = async () => {
  const response = await API.get("/jobs");
  return response.data;
};

// Get jobs of the logged-in poster
export const getMyJobs = async () => {
  const response = await API.get("/jobs/my-jobs"); // if your backend has a dedicated route
  return response.data;
};

// Update job by ID
export const updateJob = async (jobId, jobData) => {
  const response = await API.patch(`/jobs/${jobId}`, jobData);
  return response.data;
};

// Delete job by ID
export const deleteJob = async (jobId) => {
  const response = await API.delete(`/jobs/${jobId}`);
  return response.data;
};
