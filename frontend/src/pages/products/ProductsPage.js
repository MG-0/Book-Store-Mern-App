import React from "react";
import { Search, Sparkles, Filter, BookOpen } from "lucide-react";
import useProductsPage from "./useProductsPage";
import BookCard from "../../components/ui/BookCard";
import ProductsHeaderBanner from "./ProductsHeaderBanner";
import CategoryFilterPills from "./CategoryFilterPills";
import Skeleton from "../../components/ui/Skeleton";

function BookCardSkeleton() {
  return (
    <div className="space-y-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <Skeleton className="h-52 w-full rounded-xl" />
      <Skeleton className="h-4 w-20 rounded" />
      <Skeleton className="h-6 w-3/4 rounded" />
      <Skeleton className="h-4 w-1/2 rounded" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const {
    loading,
    featuredBooks,
    saleBooks,
    filteredAllBooks,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    handleAddToCart,
  } = useProductsPage();

  // CLEAN CODE COMMENT:
  // We use component splitting for the Header Banner and the Category Pills.
  // We also replace the generic loading spinner with pulsing card Skeletons inside grids.
  // This drastically improves perceived loading speeds (Perceived Performance).
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header banner */}
        <ProductsHeaderBanner />

        {/* SECTION 1: Featured Masterpieces */}
        {(loading || featuredBooks.length > 0) && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Featured Masterpieces ⭐
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <BookCardSkeleton key={i} />)
              ) : (
                featuredBooks.map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    variant="default"
                    onAddToCart={handleAddToCart}
                  />
                ))
              )}
            </div>
          </section>
        )}

        {/* SECTION 2: Limited Sale Deals */}
        {(loading || saleBooks.length > 0) && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-500" />
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Hot Sales & Offers 🏷️
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => <BookCardSkeleton key={i} />)
              ) : (
                saleBooks.map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    variant="sale"
                    onAddToCart={handleAddToCart}
                  />
                ))
              )}
            </div>
          </section>
        )}

        {/* SECTION 3: All Available Books */}
        <section className="space-y-8 pt-8 border-t border-gray-150">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-700" />
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                All Tech Library 💻
              </h2>
            </div>

            {/* Filter / Search Bar & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg md:justify-end">
              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto border border-gray-200 px-3 py-2 text-xs rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer font-medium text-gray-600"
              >
                <option value="">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Title: A to Z</option>
              </select>

              {/* Search Input Bar */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-200 pl-9 pr-4 py-2 text-xs rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition bg-white"
                />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <CategoryFilterPills
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Filtered Books Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)}
            </div>
          ) : filteredAllBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAllBooks.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  variant={book.isOnSale ? "sale" : "default"}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 font-bold text-base mb-1">No books found</h3>
              <p className="text-gray-400 text-xs">Try adjusting your search criteria or categories filter.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
