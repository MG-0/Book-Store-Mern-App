import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

// CLEAN CODE COMMENT:
// By extracting a single cart item row into its own component, 
// we keep the JSX in Cart.js extremely simple and readable.
// This is exactly the Component-Driven Architecture taught by industry leaders like Max.
export default function CartItemRow({ item, onQuantityChange, onRemove }) {
  const book = item.book;
  const hasDiscount = book.isOnSale && book.discountPercentage > 0;
  const originalPrice = book.price;
  const currentPrice = hasDiscount
    ? originalPrice - (originalPrice * book.discountPercentage) / 100
    : originalPrice;

  return (
    <Card className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border-gray-100 hover:shadow-md transition duration-300 group">
      {/* Book Cover and Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={`http://localhost:5000/images/${book.imageUrl}`}
          alt={book.title}
          className="w-20 h-28 object-cover rounded-lg border shadow-sm group-hover:scale-105 transition duration-300"
        />
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase mb-1">
            Book
          </span>
          <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-1">
            {book.title}
          </h3>
          <p className="text-gray-500 text-xs mt-0.5">By {book.author}</p>
          <p className="text-gray-400 text-xs mt-1">Stock Available: {book.stock}</p>
        </div>
      </div>

      {/* Quantity and Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-4 sm:mt-0 border-t sm:border-t-0 pt-4 sm:pt-0">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50">
          <Button
            onClick={() => onQuantityChange(book._id, item.quantity, book.stock, -1)}
            disabled={item.quantity <= 1}
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-lg bg-transparent text-gray-500 hover:bg-white active:scale-90"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-4 text-sm font-bold text-gray-900 w-8 text-center font-mono">
            {item.quantity}
          </span>
          <Button
            onClick={() => onQuantityChange(book._id, item.quantity, book.stock, 1)}
            disabled={item.quantity >= book.stock}
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-lg bg-transparent text-gray-500 hover:bg-white active:scale-90"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Price Info */}
        <div className="flex flex-col text-right items-end min-w-[70px] font-mono">
          {hasDiscount ? (
            <>
              <span className="text-xs text-gray-400 line-through">
                ${(originalPrice * item.quantity).toFixed(2)}
              </span>
              <span className="font-bold text-indigo-600 text-lg">
                ${(currentPrice * item.quantity).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-gray-900 text-lg">
              ${(currentPrice * item.quantity).toFixed(2)}
            </span>
          )}
        </div>

        {/* Delete button */}
        <Button
          onClick={() => onRemove(book._id)}
          variant="outline"
          size="icon"
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition rounded-xl border-gray-200"
          title="Remove Item"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}
