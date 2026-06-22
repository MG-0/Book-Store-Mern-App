import React from "react";
import useContactPage from "./useContactPage";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Button from "../../components/ui/Button";

export default function ContactPage() {
  const { form, submitting, onChange, onSubmit } = useContactPage();

  // CLEAN CODE RATIONALE:
  // Inlining Tailwind CSS styles keeps layout and styling together, reducing context-switching.
  // We use modular UI primitives (Input, Textarea, Button) to keep JSX uncluttered and uniform.
  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
        
        {/* Left Side: Contact Information */}
        <div className="md:col-span-5 bg-indigo-600 text-white rounded-2xl p-8 flex flex-col justify-between space-y-8 shadow-lg shadow-indigo-100">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold tracking-tight">Contact Us 📞</h2>
            <p className="text-indigo-100 text-xs leading-relaxed font-sans">
              Have questions about your order, tech books stock, or institutional accounts? Send us a message and we'll reply shortly.
            </p>
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-lg"><Mail className="w-4 h-4" /></div>
              <span>support@bookstore.com</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-lg"><Phone className="w-4 h-4" /></div>
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-lg"><MapPin className="w-4 h-4" /></div>
              <span>100 Tech Blvd, Suite 250, San Francisco, CA</span>
            </div>
          </div>

          <div className="text-[10px] text-indigo-200 font-mono">
            © BookStore support team is active 24/7.
          </div>
        </div>

        {/* Right Side: Form */}
        <form onSubmit={onSubmit} className="md:col-span-7 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">Your Name</label>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">Subject</label>
              <Input
                type="text"
                name="subject"
                value={form.subject}
                onChange={onChange}
                placeholder="How can we help you?"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-sans">Message</label>
              <Textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                required
                placeholder="Write your message details..."
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto self-end inline-flex items-center justify-center gap-1.5 py-3 text-xs"
          >
            <Send className="w-3.5 h-3.5" />
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </form>

      </div>
    </div>
  );
}

