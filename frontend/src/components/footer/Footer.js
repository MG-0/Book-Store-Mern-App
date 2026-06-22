import React from "react";
import useFooter from "./useFooter";
import { BookOpen, Mail } from "lucide-react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function Footer() {
  const { currentYear, email, setEmail, handleNewsletterSubmit } = useFooter();

  // CLEAN CODE COMMENT:
  // Layout classes are kept inline here. The form inputs and join buttons 
  // utilize our reusable atomic primitives, keeping the markup clean and compact.
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-16 lg:px-24">
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-black text-xl tracking-wider">
              <BookOpen className="w-6 h-6 text-indigo-500" />
              <span>BookStore</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Your favorite online destination to discover, read, and purchase the best programming and software engineering books. Built for developers by developers.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300">
                <FaGithub className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300">
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Shop Links</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home Page</a></li>
              <li><a href="/" className="hover:text-white transition">All Books</a></li>
              <li><a href="/cart" className="hover:text-white transition">Shopping Cart</a></li>
              <li><a href="/" className="hover:text-white transition">Customer Support</a></li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Popular Genres</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="/" className="hover:text-white transition">Software Engineering</a></li>
              <li><a href="/" className="hover:text-white transition">Web Development</a></li>
              <li><a href="/" className="hover:text-white transition">Database & SQL</a></li>
              <li><a href="/" className="hover:text-white transition">Algorithms & Data Structures</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Subscribe to get notified about special deals, discounts, and new book releases.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-800"
                />
              </div>
              <Button
                type="submit"
                className="px-5 py-2 text-xs"
              >
                Join
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom (Copyright) */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} BookStore. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
