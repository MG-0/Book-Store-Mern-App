import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import useBookDetails from "./useBookDetails";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

export default function BookDetails() {
  const navigate = useNavigate();

  // Consume logic, state, and handlers from our custom hook
  const { book, loading, quantity, adding, handleQuantityChange, handleAddToCartClick } = useBookDetails();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 mt-20 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16 mt-16 font-sans">
        <Card className="text-center max-w-md p-8 border-gray-100 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found! 📚</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">The book you are looking for does not exist or has been removed.</p>
          <Button
            onClick={() => navigate(-1)}
            className="w-full py-3"
          >
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  // Calculate pricing based on discount properties
  const originalPrice = Number(book.price) || 0;
  const discountPercentage = Number(book.discountPercentage) || 0;
  const hasDiscount = book.isOnSale && discountPercentage > 0;
  const currentPrice = hasDiscount
    ? originalPrice - (originalPrice * discountPercentage) / 100
    : originalPrice;

  // CLEAN CODE COMMENT:
  // Styling classes are kept inline here. We utilize reusable card layouts and primary 
  // UI buttons to avoid massive inline styles repetition.
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Navigation */}
        <Button
          variant="link"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-400 hover:text-gray-700 text-xs font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Main Grid */}
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8 border-gray-100 hover:shadow-md transition duration-300">
          
          {/* Left Column: Image Cover */}
          <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="relative w-full max-w-[280px] aspect-[3/4] shadow-md hover:shadow-lg rounded-xl overflow-hidden transition group">
              <img
                src={`http://localhost:5000/images/${book.imageUrl}`}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              {book.isFeatured && (
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Book Details */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category Tag */}
              {book.category?.name && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider self-start">
                  {book.category.name}
                </span>
              )}

              {/* Title & Author */}
              <div className="space-y-1.5">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                  {book.title}
                </h1>
                <p className="text-gray-500 text-sm font-medium">By {book.author}</p>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline gap-2 font-mono">
                {hasDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-indigo-600">
                      ${currentPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-150">
                      -{discountPercentage}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Description</h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-sans">
                  {book.description}
                </p>
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className={`w-2 h-2 rounded-full ${book.stock > 0 ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}></span>
                <span className="text-gray-500">
                  {book.stock > 0 ? `In Stock (${book.stock} available)` : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Actions: Quantity Selector & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-gray-50">
              {/* Quantity selector */}
              {book.stock > 0 && (
                <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50 self-start sm:self-auto">
                  <Button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-lg bg-transparent text-gray-500 hover:bg-white active:scale-90"
                  >
                    -
                  </Button>
                  <span className="px-4 text-sm font-bold text-gray-900 w-8 text-center font-mono">
                    {quantity}
                  </span>
                  <Button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= book.stock}
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-lg bg-transparent text-gray-500 hover:bg-white active:scale-90"
                  >
                    +
                  </Button>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCartClick}
                disabled={book.stock <= 0 || adding}
                className="flex-1 py-3.5 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {adding ? "Adding..." : "Add to Cart"}
              </Button>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}
