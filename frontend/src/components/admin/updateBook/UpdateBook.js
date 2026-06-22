import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import useUpdateBook from './useUpdateBook.js';
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";

export default function UpdateBook() {
  const navigate = useNavigate();
  const { book, categories, loading, handleChange, handleUpdateBook } = useUpdateBook();

  if (loading || !book) {
    return (
      <div className="flex justify-center items-center py-20 mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // CLEAN CODE RATIONALE:
  // Using direct styling on forms keeps visual context co-located with controls.
  // Standard UI components like Select or Input control unified visual theme automatically.
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Update Book 📝
            </h1>
            <p className="text-gray-500 text-xs mt-1">
              Modify essential book properties
            </p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-1 text-gray-400 hover:text-gray-700 text-xs font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <form onSubmit={handleUpdateBook} className="space-y-5">
            {/* Title / Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-650 uppercase tracking-wider block">
                Book Title
              </label>
              <Input
                type="text"
                name="title"
                value={book.title || ""}
                onChange={handleChange}
                required
                placeholder="e.g. Clean Code"
              />
            </div>

            {/* Author */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-650 uppercase tracking-wider block">
                Author
              </label>
              <Input
                type="text"
                name="author"
                value={book.author || ""}
                onChange={handleChange}
                required
                placeholder="e.g. Robert C. Martin"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-650 uppercase tracking-wider block">
                  Price ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  name="price"
                  value={book.price || 0}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  className="font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-650 uppercase tracking-wider block">
                  Stock
                </label>
                <Input
                  type="number"
                  name="stock"
                  value={book.stock || 0}
                  onChange={handleChange}
                  required
                  placeholder="Quantity"
                  className="font-mono"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-650 uppercase tracking-wider block">
                Category
              </label>
              <Select
                name="category"
                value={book.category && typeof book.category === "object" ? book.category._id : (book.category || "")}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-655 uppercase tracking-wider block">
                Description
              </label>
              <Textarea
                name="description"
                rows="4"
                value={book.description || ""}
                onChange={handleChange}
                required
                placeholder="Enter description..."
              />
            </div>

            {/* Options */}
            <div className="flex flex-col sm:flex-row gap-6 pt-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={!!book.isFeatured}
                  onChange={handleChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>Featured Book</span>
              </label>

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="isOnSale"
                  checked={!!book.isOnSale}
                  onChange={handleChange}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>On Sale</span>
              </label>
            </div>

            {/* Discount Percentage (Only visible if On Sale is checked) */}
            {book.isOnSale && (
              <div className="space-y-1.5 animate-fadeIn">
                <label className="text-xs font-bold text-gray-650 uppercase tracking-wider block">
                  Discount Percentage (%)
                </label>
                <Input
                  type="number"
                  name="discountPercentage"
                  value={book.discountPercentage || 0}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="e.g. 15"
                  className="font-mono"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/admin")}
                className="flex items-center gap-1 text-xs"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                className="flex items-center gap-1 text-xs"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

