import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "react-toastify";

export default function useUpdateBook() {
  const [book, setBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch book details and categories from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await axiosInstance.get(`/books/${id}`);
        setBook(bookResponse.data.book);

        const categoriesResponse = await axiosInstance.get("/categories/getCategories");
        setCategories(categoriesResponse.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch data for update", error);
        toast.error("Failed to load details or categories");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle local state updates when user types or toggles checkboxes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setBook((prev) => ({ ...prev, [name]: finalValue }));
  };

  // Submit updated book details to the backend
  const handleUpdateBook = async (e) => {
    if (e) e.preventDefault();
    try {
      // Ensure we extract category ID if it is populated as an object
      const payload = {
        ...book,
        category: book.category && typeof book.category === "object" ? book.category._id : book.category
      };

      await axiosInstance.put(`/admin/update/${id}`, payload);
      toast.success("Book updated successfully! 🎉");
      navigate("/admin");
    } catch (error) {
      console.error("Failed to update book", error);
      toast.error(error.response?.data?.message || "Failed to update book");
    }
  };

  return { book, categories, loading, handleChange, handleUpdateBook };
}