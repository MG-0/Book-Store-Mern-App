// CLEAN CODE RATIONALE:
// An Error Boundary protects the application from completely crashing due to an unhandled API or rendering bug.
// It catches exceptions locally in the component tree and shows a clean, friendly recovery page.
import React from "react";
import Button from "./ui/Button";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-150 space-y-6">
            <div className="text-5xl">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Something went wrong</h1>
            <p className="text-gray-550 text-xs leading-relaxed">
              We encountered an unexpected error while rendering this page. Try reloading the website.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
            >
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
