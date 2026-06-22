import React from "react";
import useServices from "./useServices";
import { Card } from "../ui/Card";

export default function Services() {
  const { servicesList } = useServices();

  // CLEAN CODE COMMENT:
  // Layout classes are declared inline. Since this component is very small, 
  // keeping Tailwind classes inline here provides a direct and simple codebase setup.
  return (
    <section className="py-16 bg-gray-50/50 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.id}
                className="flex items-center gap-4 p-6 hover:shadow-md transition duration-300"
              >
                {/* Icon Container */}
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                {/* Text Details */}
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-base">{service.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
