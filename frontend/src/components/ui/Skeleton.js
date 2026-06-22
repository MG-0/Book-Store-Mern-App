// CLEAN CODE RATIONALE:
// The Skeleton loader provides a pulsing loading state using Tailwind's `animate-pulse` utility.
// Keeping it modular under components/ui makes it highly reusable for cards, paragraphs, and list layouts.
import React from "react";
import { cn } from "../../utils/cn";

export default function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  );
}
