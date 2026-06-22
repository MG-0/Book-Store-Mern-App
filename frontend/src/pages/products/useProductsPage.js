import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import useDebounce from "../../utils/useDebounce";

export default function useProductsPage() {
  const [bookList, setBookList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [addingId, setAddingId] = useState(null);
  
  const { addToCart } = useCart();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const booksResponse = await axiosInstance.get("/books/getBooks");
        setBookList(booksResponse.data.books || []);

        const categoriesResponse = await axiosInstance.get("/categories/getCategories");
        setCategories(categoriesResponse.data.categories || []);
      } catch (error) {
        console.error("Failed to fetch products page data", error);
        toast.error("Failed to load books or categories");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter sections
  const featuredBooks = bookList.filter((book) => book.isFeatured === true);
  const saleBooks = bookList.filter((book) => book.isOnSale === true);

  // Filtered list of all books based on category and search
  const filteredAllBooks = bookList.filter((book) => {
    const matchesCategory = selectedCategory
      ? (book.category && (typeof book.category === "object" ? book.category._id === selectedCategory : book.category === selectedCategory))
      : true;
    const matchesSearch = debouncedSearchQuery
      ? book.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Sort filtered books
  const sortedFilteredBooks = [...filteredAllBooks].sort((a, b) => {
    const getActivePrice = (book) => {
      return book.isOnSale
        ? book.price * (1 - book.discountPercentage / 100)
        : book.price;
    };

    if (sortBy === "price-asc") {
      return getActivePrice(a) - getActivePrice(b);
    }
    if (sortBy === "price-desc") {
      return getActivePrice(b) - getActivePrice(a);
    }
    if (sortBy === "title-asc") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleAddToCart = async (bookId, title) => {
    try {
      setAddingId(bookId);
      const result = await addToCart(bookId, 1);
      if (result && result.success) {
        toast.success(`"${title}" added to cart successfully! 🛒`);
      } else {
        toast.error(result?.error || "Failed to add book to cart!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book to cart!");
    } finally {
      setAddingId(null);
    }
  };

  return {
    bookList,
    featuredBooks,
    saleBooks,
    filteredAllBooks: sortedFilteredBooks,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    addingId,
    handleAddToCart,
  };
}
