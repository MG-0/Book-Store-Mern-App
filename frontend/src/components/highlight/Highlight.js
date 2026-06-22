import React from "react";
import useHighlight from "./useHighlight";

export default function Highlight() {
  const { highlightsList } = useHighlight();

  // CLEAN CODE COMMENT:
  // Layout styling classes are kept inline here.
  // We keep each card block clean by iterating over highlightsList and extracting 
  // dynamic fields, maintaining high readability with minimal JSX nesting.
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlightsList.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-start gap-4 p-5 hover:bg-gray-50 rounded-2xl transition duration-300 border border-transparent hover:border-gray-100 hover:shadow-sm"
              >
                {/* Icon wrapper */}
                <div className={`p-3 rounded-xl shrink-0 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {/* Details */}
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
