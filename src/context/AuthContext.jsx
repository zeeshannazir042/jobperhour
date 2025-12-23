import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser, verifyEmail as verifyEmailAPI, getCurrentUser, updateUserProfile } from "../api/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
      fetchCurrentUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch current logged-in user
  const fetchCurrentUser = async (tokenValue) => {
    try {
      const userData = await getCurrentUser(tokenValue);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Fetch Current User Error:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (credentials) => {
    const { access_token } = await loginUser(credentials);
    setToken(access_token);
    localStorage.setItem("access_token", access_token);

    const userData = await getCurrentUser(access_token);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    return { access_token, user: userData };
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  // Signup
  const signup = async (userData) => {
    return await registerUser(userData);
  };

  // Verify email
  const verifyEmail = async (token) => {
    return await verifyEmailAPI(token);
  };

  // Refresh user
  const refreshUser = async () => {
    if (!token) return;
    const updatedUser = await getCurrentUser(token);
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Update profile
  const updateProfile = async (profileData) => {
    if (!token) throw new Error("No token available");
    const updatedUser = await updateUserProfile(profileData, token);
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        signup,
        verifyEmail,
        refreshUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
