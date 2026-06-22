import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuthContext } from "./AuthContext";

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const { user } = useAuthContext();

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/cart");
      setCart(response?.data?.cart);
    } catch (error) {
      console.log("Failed to fetch cart", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const addToCart = async (bookId, quantity = 1) => {
    try {
      const response = await axiosInstance.post("/cart/add", {
        bookId,
        quantity,
      });
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to add product",
      };
    }
  };

  const updateCart = async (bookId, quantity) => {
    try {
      const response = await axiosInstance.put("/cart/update", {
        bookId,
        quantity,
      });
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update product",
      };
    }
  };

  const removeCart = async (bookId) => {
    try {
      const response = await axiosInstance.delete(`/cart/remove/${bookId}`);
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to remove product",
      };
    }
  };

  const value = {
    cart,
    addToCart,
    updateCart,
    removeCart,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
