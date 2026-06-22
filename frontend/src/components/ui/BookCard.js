import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Tag, ShoppingBasket, Heart } from "lucide-react";
import Button from "./Button";
import { useWishlist } from "../../context/WishlistContext";
import { cn } from "../../utils/cn";

export default function BookCard({
  book,
  variant = "default", // default, sale, admin
  onAddToCart,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const originalPrice = Number(book?.price) || 0;
  const discountPercentage = Number(book?.discountPercentage) || 0;
  const hasDiscount = book?.isOnSale && discountPercentage > 0;
  const currentPrice = hasDiscount
    ? originalPrice - (originalPrice * discountPercentage) / 100
    : originalPrice;

  const navigateToDetails = () => {
    navigate(`/book/${book._id}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
      
      {/* Image & Badge Container */}
      <div 
        onClick={navigateToDetails}
        className="relative overflow-hidden aspect-[3/4] bg-gray-100 cursor-pointer"
      >
        <img
          src={`http://localhost:5000/images/${book.imageUrl}`}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Wishlist Heart Toggle */}
        {variant !== "admin" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(book);
            }}
            className="absolute top-3 right-3 p-2 bg-white/85 hover:bg-white text-gray-400 hover:text-red-500 rounded-full shadow-md z-10 backdrop-blur-sm transition-all duration-300 active:scale-90"
            title={isInWishlist(book._id) ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isInWishlist(book._id) ? "fill-red-500 text-red-500" : "text-gray-400"
              )}
            />
          </button>
        )}

        {/* Dynamic Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {book.isFeatured && (
            <span className="backdrop-blur-md bg-yellow-500/90 text-white text-[9px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className={`backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1 ${
              variant === "sale" ? "bg-red-500/90" : "bg-red-500/90"
            }`}>
              <Tag className="w-3 h-3 fill-current" />
              {discountPercentage}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <h3 
            onClick={navigateToDetails}
            className={`font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-1 cursor-pointer transition ${
              variant === "sale" ? "group-hover:text-red-600" : "group-hover:text-indigo-600"
            }`}
          >
            {book.title}
          </h3>
          <p className="text-gray-400 text-[10px] font-medium">By {book.author}</p>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 pt-0.5">
            {book.description}
          </p>
        </div>

        {/* Footer actions based on variant */}
        {variant === "admin" ? (
          <div className="space-y-2 pt-2 border-t border-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-bold text-gray-900 text-sm">${originalPrice.toFixed(2)}</span>
              <span>Stock: {book.stock}</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onEdit && onEdit(book._id)}
                className="w-full"
                size="sm"
              >
                Edit
              </Button>
              <Button
                onClick={() => onDelete && onDelete(book._id)}
                variant="danger"
                className="w-full"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
            {/* Prices */}
            <div className="flex flex-col font-mono text-xs">
              {hasDiscount ? (
                <>
                  <span className="text-[10px] text-gray-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                  <span className={`text-base font-black ${
                    variant === "sale" ? "text-red-600" : "text-indigo-600"
                  }`}>
                    ${currentPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-base font-black text-gray-900">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Cart Button */}
            <Button
              onClick={() => onAddToCart && onAddToCart(book._id, book.title)}
              variant={variant === "sale" ? "danger" : "primary"}
              size="icon"
              title="Add to Cart"
            >
              <ShoppingBasket className="w-4.5 h-4.5" />
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}
