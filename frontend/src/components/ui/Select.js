import React from "react";
import { cn } from "../../utils/cn";

export default function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 bg-white text-gray-800 disabled:bg-gray-50",
        className
      )}
      {...props}
    />
  );
}
