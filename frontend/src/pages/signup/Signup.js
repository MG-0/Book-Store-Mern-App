import React from "react";
import useSignup from "./useSignup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";

export default function Signup() {
  const { handleSignup, loading, form, handleChange } = useSignup();

  // CLEAN CODE COMMENT:
  // Direct inline classes with atomic Card and Input components keep 
  // the registration form layout direct, clear, and highly maintainable.
  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 mt-16 font-sans">
      <Card className="max-w-md w-full p-6 sm:p-8 border-gray-100 shadow-md">
        <CardHeader className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Create Account <span className="text-indigo-600">📝</span>
          </h2>
          <p className="text-gray-400 text-xs">
            Sign up to start your reading journey
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Full Name
              </label>
              <Input
                placeholder="John Doe"
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Email Address
              </label>
              <Input
                placeholder="name@example.com"
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Password
              </label>
              <Input
                placeholder="••••••••"
                required
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <div className="text-center text-xs text-gray-500 mt-6 pt-6 border-t border-gray-50">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-indigo-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}