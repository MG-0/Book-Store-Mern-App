import React from "react";
import useSales from "./useSales";
import { Flame } from "lucide-react";
import { toast } from "react-toastify";
import BookCard from "../ui/BookCard";

export default function Sales() {
  const { saleBooks, loading, handleAddToCart } = useSales();

  const onAddToCartClick = async (bookId, title) => {
    const result = await handleAddToCart(bookId);
    if (result && result.success) {
      toast.success(`"${title}" added to cart successfully! 🛒`);
    } else {
      toast.error(result?.error || "Failed to add book to cart!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // If there are no books on sale, do not render this section
  if (saleBooks.length === 0) return null;

  // CLEAN CODE COMMENT:
  // Reusable card styling is encapsulated inside our primitive BookCard component.
  // The outer sections are simply using grid and padding classes inlined to keep the markup flat and easy to read.
  return (
    <section className="py-16 bg-red-50/30 border-y border-red-100/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-current text-red-500 animate-pulse" />
            Limited Time Offers
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Special Book Deals 🏷️
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            Grab your favorite books at discounted prices. Deals are only available for a limited stock, buy now!
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {saleBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              variant="sale"
              onAddToCart={onAddToCartClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
