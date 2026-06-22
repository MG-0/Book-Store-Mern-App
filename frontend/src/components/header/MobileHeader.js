import React from "react";
import MobileMenu from "./MobileMenu";

export default function MobileHeader({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
  navLinks,
  navigate,
}) {
  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-6 w-6 cursor-pointer ${isScrolled ? "text-gray-700" : "text-white"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navLinks={navLinks}
        navigate={navigate}
      />
    </>
  );
}
