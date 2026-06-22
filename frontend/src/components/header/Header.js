import React from "react";
import useHeader from "./useHeader";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  const headerData = useHeader();
  const { isScrolled } = headerData;

  // CLEAN CODE RATIONALE:
  // By separating hook logic into useHeader.js, and viewport-specific renders into 
  // DesktopHeader.js and MobileHeader.js, the main Header layout becomes highly declarative.
  // It only manages the outer wrapper navbar styles, making it extremely easy to read.
  return (
    <nav
      className={`fixed top-0 left-0 bg-indigo-500 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"
      }`}
    >
      {/* Brand Logo */}
      <a href="/" className="flex items-center gap-2">
        <img src="/download.jpg" alt="logoImage" width={50} className="rounded-lg shadow-sm" />
      </a>

      {/* Desktop Header Navigation */}
      <DesktopHeader {...headerData} />

      {/* Mobile Header Navigation */}
      <MobileHeader {...headerData} />
    </nav>
  );
}
