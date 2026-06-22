import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useCart } from "../../context/CartContext";

export default function useSales() {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/books/getBooks");
        setBookList(response.data.books || []);
      } catch (error) {
        console.error("Failed to fetch books in Sales hook", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Filter books that are marked as On Sale (isOnSale === true)
  const saleBooks = bookList.filter((book) => book.isOnSale === true);

  const handleAddToCart = async (bookId) => {
    return await addToCart(bookId);
  };

  return { saleBooks, loading, handleAddToCart };
}
