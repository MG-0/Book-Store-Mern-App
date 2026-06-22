import { Truck, Tag, BadgeCheck, ShieldCheck } from "lucide-react";

export default function useHighlight() {
  const highlightsList = [
    {
      id: "delivery",
      title: "Free Delivery",
      description: "Enjoy fast and free shipping on all orders over $150 with zero extra fees.",
      icon: Truck,
      color: "text-amber-500 bg-amber-50",
    },
    {
      id: "discounts",
      title: "Exclusive Deals",
      description: "Save up to 50% on popular programming guides, textbooks, and software manuals.",
      icon: Tag,
      color: "text-red-500 bg-red-50",
    },
    {
      id: "quality",
      title: "Verified Quality",
      description: "100% original copies sourced directly from leading technology publishers.",
      icon: BadgeCheck,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      id: "checkout",
      title: "Secure Payments",
      description: "Your transactions are protected with industry-standard SSL encryption protocols.",
      icon: ShieldCheck,
      color: "text-indigo-500 bg-indigo-50",
    },
  ];

  return { highlightsList };
}
