import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

export default function useBookDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  // Fetch book details automatically on mount or when book ID changes
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        // Fix: Use correct URL path (/books instead of /book) and remove literal colon (:)
        const response = await axiosInstance.get(`/books/${id}`);
        // Fix: Save fetched book data to the local state so it can be displayed in the UI
        setBook(response.data.book);
      } catch (error) {
        console.error("Book Fetch Failed!", error);
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (book && newQty >= 1 && newQty <= book.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCartClick = async () => {
    if (!book) return;
    try {
      setAdding(true);
      const result = await addToCart(book._id, quantity);
      if (result && result.success) {
        toast.success(`"${book.title}" added to cart successfully! 🛒`);
      } else {
        toast.error(result?.error || "Failed to add book to cart!");
      }
    } catch (error) {
      console.error("Add to cart error in Details hook", error);
      toast.error("Failed to add book to cart!");
    } finally {
      setAdding(false);
    }
  };

  return { book, loading, quantity, adding, handleQuantityChange, handleAddToCartClick };
}