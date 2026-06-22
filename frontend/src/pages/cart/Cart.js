import React from "react";
import useCart from "./useCart";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import CartItemRow from "./CartItemRow";
import CartOrderSummary from "./CartOrderSummary";

export default function Cart() {
  const navigate = useNavigate();
  // Destructure logic, states, and handlers from our custom hook
  const {
    cart,
    promoCode,
    setPromoCode,
    discount,
    isApplyingPromo,
    subtotal,
    shipping,
    promoDiscountAmount,
    total,
    handleQuantityChange,
    handleRemoveItem,
    handleApplyPromo
  } = useCart();

  // Empty Cart View
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
        <Card className="text-center max-w-md p-8 border-gray-100 shadow-md">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-500 animate-bounce">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-sans">Your Cart is Empty! 📚</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            It looks like you haven't added any books to your shopping cart yet. Start exploring our collection!
          </p>
          <Button
            onClick={() => navigate("/")}
            className="w-full py-3 inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Button>
        </Card>
      </div>
    );
  }

  // CLEAN CODE COMMENT:
  // By splitting the shopping cart into CartItemRow and CartOrderSummary,
  // we keep this core coordinator file under 90 lines of extremely clean, semantic React code.
  // Tailwind layout classes remain inline here for high styling control and visual feedback.
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart 🛒</h1>
            <p className="text-gray-500 text-sm mt-1">You have {cart.totalItems} books in your cart</p>
          </div>
          <Button
            variant="link"
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartItemRow
                key={item._id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Checkout Summary Panel */}
          <CartOrderSummary
            subtotal={subtotal}
            discount={discount}
            promoDiscountAmount={promoDiscountAmount}
            shipping={shipping}
            total={total}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            isApplyingPromo={isApplyingPromo}
            handleApplyPromo={handleApplyPromo}
            onCheckout={() => navigate("/checkout")}
          />
        </div>
      </div>
    </div>
  );
}