import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // <-- backend port
  headers: { "Content-Type": "application/json" },
});

// Add token to request headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
