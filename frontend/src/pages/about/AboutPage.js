import React from "react";
import useAboutPage from "./useAboutPage";
import { Award, ShieldCheck, Heart } from "lucide-react";
import { Card } from "../../components/ui/Card";

export default function AboutPage() {
  const { stats } = useAboutPage();

  // CLEAN CODE RATIONALE:
  // Using utility-first Tailwind classes inline allows the developer to immediately see 
  // the visual presentation alongside the DOM layout. Breaking components down (Atomic Design)
  // keeps files readable, while keeping styling inline prevents context-switching.
  return (
    <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <Card className="max-w-4xl mx-auto space-y-12 bg-white p-8 md:p-12 border-gray-100 shadow-md">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Our Story
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            About BookStore 📖
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            We are dedicated to providing software developers, students, and engineers with the finest programming literature to enhance their tech careers.
          </p>
        </div>

        {/* Brand Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <Card className="p-6 bg-indigo-50/40 border-indigo-100/30 space-y-3 rounded-2xl shadow-none">
            <Award className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-gray-900 text-sm">Curated Literature</h3>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              We handpick books from renowned tech publishers ensuring only the highest quality content.
            </p>
          </Card>

          <Card className="p-6 bg-emerald-50/40 border-emerald-100/30 space-y-3 rounded-2xl shadow-none">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="font-bold text-gray-900 text-sm">Trusted Quality</h3>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              All physical volumes are 100% original paperbacks and hardcovers shipped securely.
            </p>
          </Card>

          <Card className="p-6 bg-red-50/40 border-red-100/30 space-y-3 rounded-2xl shadow-none">
            <Heart className="w-6 h-6 text-red-500" />
            <h3 className="font-bold text-gray-900 text-sm">Developer Community</h3>
            <p className="text-gray-400 text-xs leading-relaxed font-sans">
              Our store supports developer learning initiatives by offering affordable tech books worldwide.
            </p>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="pt-8 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-black text-indigo-600 font-mono">{stat.value}</div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </Card>
    </div>
  );
}

