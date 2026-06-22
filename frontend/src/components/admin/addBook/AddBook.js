import React from "react";
import useAddBook from "./useAddBook";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";

export default function AddBook() {
  const {
    form,
    category,
    preview,
    loading,
    submiting,
    message,
    onChange,
    onSubmit,
  } = useAddBook();

  // CLEAN CODE RATIONALE:
  // Form structures are best designed when fields and labels are kept near each other visually.
  // By using utility-first classes inline, we avoid creating redundant wrapper class wrappers,
  // while modular primitives like Input keep code uniform across all pages.
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-8">Add New Book</h1>
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-gray-100">{message}</div>
        )}
        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Title & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block mb-2 font-medium">Book Title</label>
              <Input
                onChange={onChange}
                value={form.title}
                name="title"
                type="text"
                placeholder="Enter book title"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block mb-2 font-medium">Author</label>
              <Input
                type="text"
                name="author"
                onChange={onChange}
                value={form.author}
                placeholder="Enter author name"
              />
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block mb-2 font-medium">Price</label>
              <Input
                value={form.price}
                onChange={onChange}
                name="price"
                type="number"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block mb-2 font-medium">Stock</label>
              <Input
                onChange={onChange}
                name="stock"
                value={form.stock}
                type="number"
                placeholder="Available quantity"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            {loading && <h4>Loading...</h4>}
            <label className="block mb-2 font-medium">Category</label>
            <Select
              name="category"
              value={form.category}
              onChange={onChange}
            >
              <option value="">Select Category</option>
              {category.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block mb-2 font-medium">Description</label>
            <Textarea
              onChange={onChange}
              value={form.description}
              name="description"
              rows="5"
              placeholder="Write book description..."
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <label className="block mb-2 font-medium">Book Image</label>
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-40 h-52 object-cover rounded-lg border mb-4"
              />
            )}
            <input
              type="file"
              onChange={onChange}
              name="imageUrl"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Options */}
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                onChange={onChange}
                checked={form.isFeatured}
                name="isFeatured"
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>Featured Book</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
              <input
                name="isOnSale"
                onChange={onChange}
                checked={form.isOnSale}
                type="checkbox"
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>On Sale</span>
            </label>
          </div>

          {form.isOnSale && (
            <div className="space-y-1.5 animate-fadeIn">
              <label className="block mb-2 font-medium">Discount Percentage (%)</label>
              <Input
                type="number"
                name="discountPercentage"
                value={form.discountPercentage}
                onChange={onChange}
                min="0"
                max="100"
                placeholder="e.g. 15"
              />
            </div>
          )}

          {/* Submit */}
          <Button
            disabled={submiting}
            type="submit"
            className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white"
          >
            {submiting ? "Submitting..." : "Add Book"}
          </Button>
        </form>
      </div>
    </div>
  );
}

