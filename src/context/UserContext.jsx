// src/context/UserContext.jsx
import React, { createContext, useState, useContext } from "react";
import {
  getAllUsers as getAllUsersAPI,
  getUserById,
  updateUserProfile,
  deleteUser as deleteUserAPI,
  uploadUserDocument as uploadDocumentAPI,
  reviewUserDocument as reviewDocumentAPI,
} from "../api/userApi"; // make sure the path matches
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user: currentUser, refreshUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------------------ Fetch all users (Admin only) ------------------
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsersAPI();
      setUsers(data);
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ------------------ Get single user ------------------
  const getUser = async (userId) => {
    try {
      const data = await getUserById(userId);
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  // ------------------ Update user profile ------------------
  const updateProfile = async (userId, profileData) => {
    try {
      const updatedUser = await updateUserProfile(userId, profileData);
      if (userId === currentUser?.id) {
        refreshUser(); // refresh AuthContext user
      }
      return updatedUser;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  // ------------------ Delete user ------------------
  const deleteUser = async (userId) => {
    try {
      const data = await deleteUserAPI(userId, currentUser?.id);
      return data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  // ------------------ Upload document ------------------
  const uploadDocument = async (userId, file, type) => {
    try {
      const data = await uploadDocumentAPI(userId, file, type);
      return data;
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  };

  // ------------------ Admin review document ------------------
  const reviewDocument = async (userId, type, status, rejectionReason = "") => {
    try {
      const data = await reviewDocumentAPI(userId, type, status, rejectionReason);
      return data;
    } catch (error) {
      console.error("Error reviewing document:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        getAllUsers,
        getUser,
        updateProfile,
        deleteUser,
        uploadDocument,
        reviewDocument,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
