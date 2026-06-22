import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export default function useCheckoutPage() {
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    paymentMethod: "credit", // credit, paypal, cod
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.phone.trim()
    ) {
      toast.error("Please fill in all shipping details!");
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error("Your shopping cart is empty!");
      return;
    }

    try {
      setSubmitting(true);
      const orderData = {
        shippingAddress: {
          name: form.name,
          email: form.email,
          address: form.address,
          city: form.city,
          zipCode: form.zipCode,
          phone: form.phone,
        },
        paymentMethod: form.paymentMethod,
      };

      const response = await axiosInstance.post("/orders/create", orderData);
      
      if (response.data.success) {
        toast.success("Order Placed Successfully! Thank you! 🎉🛒");
        await refreshCart();
        navigate("/profile");
      } else {
        toast.error(response.data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return { cart, form, submitting, onChange, onSubmit };
}
