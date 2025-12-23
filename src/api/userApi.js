// src/api/userApi.js
import API from "./axios";

// ------------------ AUTH ROUTES ------------------

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data; // { access_token: "..." }
  } catch (error) {
    console.error("Login Error:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error.response?.data || { message: "Registration failed" };
  }
};

// Verify email
export const verifyEmail = async (token) => {
  try {
    const response = await API.get(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error) {
    console.error("Email Verification Error:", error);
    throw error.response?.data || { message: "Email verification failed" };
  }
};

// ------------------ USER ROUTES ------------------

// Get all users (Admin only)
export const getAllUsers = async (token) => {
  try {
    const response = await API.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Get All Users Error:", error);
    throw error.response?.data || { message: "Fetching users failed" };
  }
};

// Get single user by ID
export const getUserById = async (userId, token) => {
  try {
    const response = await API.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Get User Error:", error);
    throw error.response?.data || { message: "Fetching user failed" };
  }
};

// Get currently logged-in user
export const getCurrentUser = async (token) => {
  if (!token) throw new Error("Access token is required to fetch current user");

  try {
    const response = await API.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Get Current User Error:", error);
    throw error.response?.data || { message: "Fetching current user failed" };
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData, token) => {
  try {
    const response = await API.patch(`/users/${userId}`, profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Update Profile Error:", error);
    throw error.response?.data || { message: "Updating profile failed" };
  }
};

// Delete user (Admin)
export const deleteUser = async (userId, requesterId, token) => {
  try {
    const response = await API.delete(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { requesterId },
    });
    return response.data;
  } catch (error) {
    console.error("Delete User Error:", error);
    throw error.response?.data || { message: "Deleting user failed" };
  }
};

// ------------------ DOCUMENT ROUTES ------------------

// Upload user document
export const uploadUserDocument = async (userId, file, type, token) => {
  if (!file) throw new Error("File is required");

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const response = await API.post(`/users/${userId}/documents`, formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Upload Document Error:", error);
    throw error.response?.data || { message: "Uploading document failed" };
  }
};

// Admin review user document
export const reviewUserDocument = async (userId, type, status, token, rejectionReason = "") => {
  try {
    const response = await API.patch(
      `/users/${userId}/documents/${type}/review`,
      { status, rejectionReason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Review Document Error:", error);
    throw error.response?.data || { message: "Reviewing document failed" };
  }
};
