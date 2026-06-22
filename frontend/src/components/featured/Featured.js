import useFeatured from "./useFeatured";
import { Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import BookCard from "../ui/BookCard";

export default function Featured() {
  const { featuredBooks, loading, handleAddToCart } = useFeatured();

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
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // CLEAN CODE COMMENT:
  // We use utility-first inline classes because this Featured layout is direct and simple.
  // Reusable card styling is encapsulated inside our primitive BookCard component,
  // which prevents JSX cluttering here.
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Selection
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Featured Books ⭐
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Discover our best-selling and most popular books. Handpicked to elevate your reading experience.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              variant="default"
              onAddToCart={onAddToCartClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
