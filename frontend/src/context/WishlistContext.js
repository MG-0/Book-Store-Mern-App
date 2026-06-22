// CLEAN CODE RATIONALE:
// Creating a WishlistContext isolates favorite items state, making it accessible 
// across any component (BookCard, Header, etc.) without API calls or complex database tables.
// It persists the array of favorite books inside the browser's localStorage for instant performance.
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside a WishlistProvider");
  }
  return context;
};

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error);
    }
  }, []);

  // Helper to persist wishlist state
  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    try {
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  };

  const addToWishlist = (book) => {
    if (wishlist.some((item) => item._id === book._id)) return;
    const newWishlist = [...wishlist, book];
    saveWishlist(newWishlist);
    toast.success(`"${book.title}" added to wishlist! ❤️`);
  };

  const removeFromWishlist = (bookId) => {
    const newWishlist = wishlist.filter((item) => item._id !== bookId);
    saveWishlist(newWishlist);
    toast.info("Removed from wishlist.");
  };

  const isInWishlist = (bookId) => {
    return wishlist.some((item) => item._id === bookId);
  };

  const toggleWishlist = (book) => {
    if (isInWishlist(book._id)) {
      removeFromWishlist(book._id);
    } else {
      addToWishlist(book);
    }
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    wishlistCount: wishlist.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
