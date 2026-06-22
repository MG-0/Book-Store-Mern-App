// CLEAN CODE RATIONALE:
// Creating a dedicated NotFoundPage component ensures that any incorrect route entered by the user
// displays a premium-looking 404 screen instead of crashing or showing a blank page.
import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center font-sans mt-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="text-8xl select-none animate-bounce">🔍</div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-gray-700">Page Not Found</h2>
        <p className="text-gray-400 text-xs leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="block">
          <Button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
