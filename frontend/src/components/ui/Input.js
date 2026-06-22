import React from "react";
import { cn } from "../../utils/cn";

export default function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 bg-white placeholder-gray-400 text-gray-800 disabled:bg-gray-50 disabled:text-gray-400",
        className
      )}
      {...props}
    />
  );
}
