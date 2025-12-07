// src/context/ThemeContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
export const ThemeContext = createContext();

// Provider
export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  // Optional: persist theme in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("dark");
    if (storedTheme) setDark(JSON.parse(storedTheme));
  }, []);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 🔹 Named export for the hook
export const useTheme = () => useContext(ThemeContext);
