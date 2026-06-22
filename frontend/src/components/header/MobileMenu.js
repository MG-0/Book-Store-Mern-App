import React from "react";
import Button from "../ui/Button";

export default function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  navLinks,
  navigate,
}) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 z-50 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        onClick={() => setIsMenuOpen(false)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {navLinks.map((link, i) => (
        <a
          key={i}
          href={link.path}
          onClick={() => setIsMenuOpen(false)}
          className="text-lg font-bold text-gray-900 hover:text-indigo-600"
        >
          {link.name}
        </a>
      ))}

      <Button
        onClick={() => {
          setIsMenuOpen(false);
          navigate("/signup");
        }}
        className="w-48 py-2.5 rounded-full"
      >
        Signup
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setIsMenuOpen(false);
          navigate("/signin");
        }}
        className="w-48 py-2.5 rounded-full"
      >
        Signin
      </Button>
    </div>
  );
}
