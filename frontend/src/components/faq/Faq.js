import React from "react";
import useFaq from "./useFaq";
import { ChevronDown } from "lucide-react";
import { Card } from "../ui/Card";

export default function Faq() {
  const { faqList, activeIndex, toggleIndex } = useFaq();

  // CLEAN CODE COMMENT: 
  // We keep styles inline in JSX to preserve standard utility-first development.
  // Because this component is small and focused, the inline classes remain clean 
  // and highly readable without requiring separate styling files.
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
            FAQ
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions ❓
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            Need answers regarding your book order, delivery rates, or returns policies? Check out our quick help list below.
          </p>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-4">
          {faqList.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <Card
                key={index}
                className="border border-gray-100 overflow-hidden hover:border-gray-200 transition duration-200 bg-white shadow-sm rounded-2xl"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-6 text-left outline-none"
                >
                  <span className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content Block */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-gray-50" : "max-h-0"
                  }`}
                >
                  <div className="p-6 bg-gray-50/50 text-gray-500 text-xs sm:text-sm leading-relaxed font-sans">
                    {faq.answer}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
