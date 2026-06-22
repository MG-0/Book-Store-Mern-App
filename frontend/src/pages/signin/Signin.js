import React from "react";
import useSignin from "./useSignin";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Card, CardContent, CardHeader } from "../../components/ui/Card";

export default function Signin() {
  const { loading, handleSignin, handleChange, form } = useSignin();

  // CLEAN CODE COMMENT:
  // Using direct inline classes combined with reusable Card and Input primitives
  // keeps the sign-in form extremely simple, lightweight, and easy to read.
  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 mt-16 font-sans">
      <Card className="max-w-md w-full p-6 sm:p-8 border-gray-100 shadow-md">
        <CardHeader className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Welcome Back <span className="text-indigo-600">🔑</span>
          </h2>
          <p className="text-gray-400 text-xs">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={handleSignin}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
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
                  Verifying...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="text-center text-xs text-gray-500 mt-6 pt-6 border-t border-gray-50">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-bold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}