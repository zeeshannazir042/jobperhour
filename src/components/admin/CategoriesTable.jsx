import React, { useState, useMemo } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

const CategoriesTable = ({
  categories = [],
  loading = false,
  openAddCategoryModal,
  openEditCategoryModal,
  handleDeleteCategory,
}) => {
  // ✅ Hooks must be declared at the top
  const [search, setSearch] = useState("");

  // ✅ Filter categories based on search
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Header & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-orange-500">Categories</h2>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
          </div>

          {/* Add Category Button */}
          <button
            onClick={openAddCategoryModal}
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            <FaPlus /> Add Category
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center p-6 text-gray-500">Loading categories...</div>
      ) : filteredCategories.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No categories found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-gray-600 uppercase text-sm">
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat) => (
                <tr
                  key={cat._id}
                  className="bg-gray-50 hover:bg-gray-100 transition rounded-lg"
                >
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() => openEditCategoryModal(cat)}
                      className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;
