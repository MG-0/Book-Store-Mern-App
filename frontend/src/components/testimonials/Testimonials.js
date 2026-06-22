import React from "react";
import useTestimonials from "./useTestimonials";
import { Star, Quote } from "lucide-react";
import { Card } from "../ui/Card";

export default function Testimonials() {
  const { testimonialsList } = useTestimonials();

  // CLEAN CODE COMMENT:
  // Layout classes are declared inline. Since this section uses simple looping 
  // and binds standard styling classes, we keep it inline to support Tailwind's utility-first speed.
  return (
    <section className="py-20 bg-gray-50/50 border-t border-gray-150">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            Reviews
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            What Our Readers Say 💬
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Read comments and reviews from developers and engineers who improved their skills using our collection.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsList.map((t) => (
            <Card
              key={t.id}
              className="p-6 border-gray-100 relative hover:shadow-md transition duration-300 flex flex-col justify-between min-h-[250px]"
            >
              {/* Quote Mark */}
              <Quote className="w-8 h-8 text-indigo-100 absolute top-4 right-4" />

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 text-xs sm:text-sm italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm ${t.avatarColor}`}>
                  {t.avatarInitials}
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">{t.name}</h5>
                  <p className="text-gray-400 text-[10px] uppercase font-semibold tracking-wider">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
