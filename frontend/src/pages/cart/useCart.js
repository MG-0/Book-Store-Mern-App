import { useState } from "react";
import { useCart as useCartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

export default function useCart() {
  const { cart, updateCart, removeCart } = useCartContext();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Calculate prices
  const subtotal = cart?.totalAmount || 0;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 15; // Free shipping above 150
  const promoDiscountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping - promoDiscountAmount;

  // Handle quantity changes
  const handleQuantityChange = async (bookId, currentQty, stock, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    if (delta > 0 && newQty > stock) {
      toast.warn("Sorry, you have exceeded the available stock!");
      return;
    }
    const res = await updateCart(bookId, newQty);
    if (!res.success) {
      toast.error(res.error || "Failed to update quantity");
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (bookId) => {
    const res = await removeCart(bookId);
    if (res.success) {
      toast.success("Book removed from cart successfully!");
    } else {
      toast.error(res.error || "Failed to remove book");
    }
  };

  // Apply promo code logic
  const handleApplyPromo = (e) => {
    if (e) e.preventDefault();
    if (!promoCode.trim()) return;
    setIsApplyingPromo(true);

    setTimeout(() => {
      if (promoCode.toUpperCase() === "BOOK20") {
        setDiscount(20);
        toast.success("Promo code applied! 20% discount added.");
      } else {
        toast.error("Invalid promo code!");
      }
      setIsApplyingPromo(false);
    }, 800);
  };

  return {
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
  };
}
