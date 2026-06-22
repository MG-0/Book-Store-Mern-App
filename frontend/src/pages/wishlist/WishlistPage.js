// CLEAN CODE RATIONALE:
// This page renders all book cards currently saved in the browser's localStorage wishlist.
// Reusing the BookCard layout maintains the app's component-driven design integrity.
import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import BookCard from "../../components/ui/BookCard";
import Button from "../../components/ui/Button";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (bookId, title) => {
    try {
      const result = await addToCart(bookId, 1);
      if (result && result.success) {
        toast.success(`"${title}" added to cart successfully! 🛒`);
      } else {
        toast.error(result?.error || "Failed to add book to cart!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book to cart!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            My Wishlist
          </h1>
          <span className="bg-red-50 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-100 font-mono">
            {wishlist.length} Items
          </span>
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                variant={book.isOnSale ? "sale" : "default"}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto space-y-6">
            <div className="text-8xl select-none text-gray-200">❤️</div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-900">Your wishlist is empty</h2>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
                Explore our catalog of programming books and click the heart icon to save your favorites!
              </p>
            </div>
            <Link to="/products" className="block px-6">
              <Button className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md">
                Discover Tech Books
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
