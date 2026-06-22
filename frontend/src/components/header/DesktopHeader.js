import React from "react";
import Button from "../ui/Button";
import { Heart, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

export default function DesktopHeader({
  isScrolled,
  navLinks,
  isAuthentication,
  user,
  isAdmin,
  cartItemsCount,
  navigate,
  handleSignout,
}) {
  const { wishlistCount } = useWishlist();

  return (
    <>
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8 font-semibold">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700 hover:text-indigo-600" : "text-white hover:text-indigo-105"
            }`}
          >
            {link.name}
            <div
              className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                isScrolled ? "bg-indigo-600" : "bg-white"
              }`}
            />
          </a>
        ))}
      </div>

      {/* Desktop Auth Actions & Cart/Wishlist */}
      <div className="hidden md:flex items-center gap-4">
        {!isAuthentication ? (
          <div className="flex items-center gap-4">
            <svg
              className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <Button
              variant={isScrolled ? "primary" : "secondary"}
              onClick={() => navigate("/signup")}
              className="w-48 py-2.5 rounded-full"
              size="sm"
            >
              Signup
            </Button>
            <Button
              variant={isScrolled ? "outline" : "secondary"}
              onClick={() => navigate("/signin")}
              className={`w-48 py-2.5 rounded-full ${
                !isScrolled ? "bg-white/20 text-white hover:bg-white/30 border-transparent" : ""
              }`}
              size="sm"
            >
              Signin
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className={`text-sm font-semibold hover:underline ${
                isScrolled ? "text-gray-700 hover:text-indigo-600" : "text-white hover:text-indigo-200"
              }`}
            >
              Welcome, {user?.name}
            </Link>
            {isAdmin ? (
              <Button
                variant={isScrolled ? "primary" : "secondary"}
                onClick={() => navigate("/admin")}
                className="rounded-full px-5 py-2 shadow-sm"
                size="sm"
              >
                Manage Dashboard
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                {/* Cart Icon */}
                <div
                  onClick={() => navigate("/cart")}
                  className="relative p-1.5 rounded-full cursor-pointer hover:bg-gray-100/10 transition"
                  title="View Cart"
                >
                  <ShoppingBasket
                    className={`w-6 h-6 transition-colors duration-500 ${
                      isScrolled ? "text-gray-700 hover:text-indigo-600" : "text-white hover:text-indigo-200"
                    }`}
                  />
                  {cartItemsCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full font-mono min-w-[16px] h-[16px] shadow-sm">
                      {cartItemsCount}
                    </span>
                  )}
                </div>

                {/* Wishlist Heart Icon */}
                <Link
                  to="/wishlist"
                  className="relative p-1.5 rounded-full cursor-pointer hover:bg-gray-100/10 transition block"
                  title="View Wishlist"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors duration-500 ${
                      isScrolled ? "text-gray-700 hover:text-indigo-600" : "text-white hover:text-indigo-200"
                    }`}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full font-mono min-w-[16px] h-[16px] shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
            )}
            <Button
              variant="link"
              onClick={handleSignout}
              className={`font-semibold ml-2 ${
                isScrolled ? "text-gray-600 hover:text-red-650 text-red-600" : "text-white/80 hover:text-white"
              }`}
              size="sm"
            >
              Signout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
