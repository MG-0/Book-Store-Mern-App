import React from "react";
import { BookOpen } from "lucide-react";

// CLEAN CODE COMMENT:
// By extracting the page header banner into its own sub-component, 
// we keep the main ProductsPage readable and focused on layout structure.
export default function ProductsHeaderBanner() {
  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white p-8 md:p-12 shadow-lg">
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-12 -translate-y-12">
        <BookOpen className="w-80 h-80" />
      </div>
      <div className="relative z-10 max-w-xl space-y-4">
        <span className="bg-indigo-500/30 text-indigo-200 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border border-indigo-500/20">
          Browse Library
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
          Explore Our Tech Collection 📚
        </h1>
        <p className="text-indigo-100 text-xs md:text-sm leading-relaxed">
          Find best-selling programming books, software engineering manuals, and tech guides. Handpicked to advance your coding career.
        </p>
      </div>
    </div>
  );
}
