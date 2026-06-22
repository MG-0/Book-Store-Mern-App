import React from "react";

// CLEAN CODE COMMENT:
// Isolating the category filters keeps layout logic separate from grid render blocks.
// Styling states (active vs inactive pills) are handled cleanly with simple ternary conditions.
export default function CategoryFilterPills({ categories, selectedCategory, setSelectedCategory }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button
        onClick={() => setSelectedCategory("")}
        className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
          selectedCategory === ""
            ? "bg-indigo-600 text-white shadow-sm"
            : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200/60"
        }`}
      >
        All Categories
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => setSelectedCategory(cat._id)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
            selectedCategory === cat._id
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200/60"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
