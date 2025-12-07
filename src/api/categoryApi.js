// categoryApi.js
import API from "./axios";

// Get all categories
export const getAllCategories = async () => {
  const response = await API.get("/categories");
  return response.data;
};

// Create category
export const createCategory = async (data) => {
  const response = await API.post("/categories", data);
  return response.data;
};

// Update category by ID
export const updateCategoryById = async (id, data) => {
  const response = await API.put(`/categories/${id}`, data);
  return response.data;
};

// Delete category by ID
export const deleteCategoryById = async (id) => {
  // Note: DELETE with data payload requires axios config
  const response = await API.delete(`/categories/${id}`);
  return response.data;
};
