import React from "react";
import { CreditCard, Tag } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";

// CLEAN CODE COMMENT:
// Isolating the checkout summary cards keeps calculations separate from product rows.
// The Tailwind classes are declared inline inside this component, which makes adjustments 
// to shadows, buttons, or border colors highly direct and visual.
export default function CartOrderSummary({
  subtotal,
  discount,
  promoDiscountAmount,
  shipping,
  total,
  promoCode,
  setPromoCode,
  isApplyingPromo,
  handleApplyPromo,
  onCheckout,
}) {
  return (
    <Card className="p-6 border-gray-100 space-y-6">
      <h3 className="text-xl font-bold text-gray-900 pb-4 border-b">Order Summary</h3>

      {/* Promo Code Input */}
      <form onSubmit={handleApplyPromo} className="space-y-2">
        <label className="text-xs font-semibold text-gray-500 block">Have a promo code?</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="E.g. BOOK20"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            type="submit"
            disabled={isApplyingPromo}
            className="px-4 py-2 text-xs"
          >
            {isApplyingPromo ? "Applying..." : "Apply"}
          </Button>
        </div>
      </form>

      {/* Calculations */}
      <div className="space-y-3 text-sm text-gray-600 font-mono">
        <div className="flex justify-between font-sans">
          <span>Subtotal:</span>
          <span className="font-semibold text-gray-900 font-mono">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-sans">
            <span>Promo Discount ({discount}%):</span>
            <span className="font-semibold">-${promoDiscountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between font-sans">
          <span>Shipping Cost:</span>
          {shipping === 0 ? (
            <span className="text-green-600 font-semibold font-sans">FREE</span>
          ) : (
            <span className="font-semibold text-gray-900 font-mono">${shipping.toFixed(2)}</span>
          )}
        </div>

        {shipping > 0 && (
          <p className="text-[10px] text-gray-400 bg-gray-50 p-2 rounded-lg leading-relaxed font-sans">
            💡 Add <strong>${(150 - subtotal).toFixed(2)}</strong> more to get free shipping!
          </p>
        )}

        <div className="pt-4 border-t flex justify-between text-gray-900 font-bold text-lg font-sans">
          <span>Total:</span>
          <span className="text-indigo-600 font-mono">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={onCheckout}
        className="w-full flex items-center justify-center gap-2 py-3.5"
      >
        <CreditCard className="w-5 h-5" />
        Proceed to Checkout
      </Button>
    </Card>
  );
}
