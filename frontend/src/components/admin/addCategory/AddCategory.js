import React from "react";
import useAddCategory from "./useAddCategory";
import { FolderPlus } from "lucide-react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function AddCategory() {
  const { name, submitting, message, onChange, onSubmit } = useAddCategory();

  // CLEAN CODE RATIONALE:
  // Using direct styling on alert states and form layouts enables easy visual customization
  // of alert colors (emerald vs red) dynamically in the code, without context switching.
  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <FolderPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Category</h1>
            <p className="text-gray-400 text-xs mt-1">Create genres or categories for grouping bookstore items</p>
          </div>
        </div>

        {/* Alerts */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl text-xs font-semibold border ${
            message.includes("Successfully") 
              ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
              : "bg-red-50 text-red-700 border-red-100"
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Category Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Category Name
            </label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="e.g. Artificial Intelligence"
              required
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={submitting}
            variant="primary"
            className="w-full bg-gray-900 hover:bg-gray-800"
          >
            {submitting ? "Creating..." : "Create Category"}
          </Button>
        </form>

      </div>
    </div>
  );
}

