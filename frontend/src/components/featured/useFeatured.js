import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useCart } from "../../context/CartContext";


export default function useFeatured() {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart()
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get("/books/getBooks");
        
        setBookList(response.data.books);
        
      } catch (error) {
        console.log("Failed Fetch Books", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, []);

  const featuredBooks = bookList.filter((book) => book.isFeatured === true);


    const handleAddToCart = async (bookId) => {
      const result = await addToCart(bookId);
      return result
    };


  return { featuredBooks, loading, handleAddToCart };
}
