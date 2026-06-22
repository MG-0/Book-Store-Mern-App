import React from "react";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

// CLEAN CODE COMMENT:
// Separating the right-side summary calculations and place-order button 
// ensures we can test and refine the checkout submit process independently.
export default function CheckoutOrderSummarySide({
  cart,
  cartTotal,
  shippingCost,
  orderTotal,
  submitting,
  onSubmit,
}) {
  return (
    <Card className="p-6 border-gray-100 space-y-6">
      <h3 className="text-xl font-bold text-gray-900 pb-4 border-b">
        Order Summary 📝
      </h3>

      {/* Items List */}
      <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 pr-2 space-y-4">
        {cart.items.map((item) => {
          const book = item.book;
          const originalPrice = Number(book?.price) || 0;
          const discountPercentage = Number(book?.discountPercentage) || 0;
          const hasDiscount = book?.isOnSale && discountPercentage > 0;
          const itemPrice = hasDiscount
            ? originalPrice - (originalPrice * discountPercentage) / 100
            : originalPrice;

          return (
            <div key={item._id} className="flex gap-4 pt-4 first:pt-0 items-center">
              <img
                src={`http://localhost:5000/images/${book?.imageUrl}`}
                alt={book?.title}
                className="w-12 h-16 object-cover rounded border shadow-sm"
              />
              <div className="flex-grow min-w-0">
                <div className="text-gray-900 font-bold text-sm truncate">{book?.title}</div>
                <div className="text-gray-400 text-xs mt-0.5">Qty: {item.quantity}</div>
                <div className="text-indigo-600 font-mono text-xs font-bold mt-1">${itemPrice.toFixed(2)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Price Details */}
      <div className="border-t pt-4 space-y-3 text-sm text-gray-600 font-mono">
        <div className="flex justify-between font-sans">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-sans">
          <span>Shipping Cost</span>
          <span className="font-semibold text-gray-900">
            {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        
        <div className="pt-4 border-t flex justify-between text-gray-900 font-bold text-base font-sans">
          <span>Total Order Amount</span>
          <span className="text-indigo-600 font-mono">${orderTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Submit button inside summary */}
      <Button
        onClick={onSubmit}
        type="submit"
        disabled={submitting}
        className="w-full py-3.5"
      >
        {submitting ? "Placing Order..." : `Place Order ($${orderTotal.toFixed(2)})`}
      </Button>
    </Card>
  );
}
