import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function useHeader() {
  const { user, signout, isAuthentication, isAdmin } = useAuthContext();
  const { cart } = useCart();
  const cartItemsCount = cart?.totalItems || 0;
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignout = async () => {
    await signout();
    navigate('/');
  };

  return {
    user,
    isAuthentication,
    isAdmin,
    cartItemsCount,
    navLinks,
    isScrolled,
    isMenuOpen,
    setIsMenuOpen,
    navigate,
    handleSignout,
  };
}
