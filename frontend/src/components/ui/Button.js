import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-bold transition-all active:scale-95 focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary: "bg-indigo-600 hover:bg-indigo-755 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 active:bg-gray-300",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-100 hover:shadow-lg hover:shadow-red-200",
        outline: "border border-gray-200 hover:bg-gray-50 text-gray-700",
        link: "text-indigo-600 hover:underline hover:text-indigo-800 p-0 rounded-none bg-transparent active:scale-100",
      },
      size: {
        sm: "px-3.5 py-1.5 text-xs rounded-lg",
        default: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3 text-base rounded-2xl",
        icon: "p-2.5 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export default function Button({ className, variant, size, children, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
export { buttonVariants };
