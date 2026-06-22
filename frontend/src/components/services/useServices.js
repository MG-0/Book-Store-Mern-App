import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";

export default function useServices() {
  const servicesList = [
    {
      id: "shipping",
      title: "Free Shipping",
      description: "On orders over $150. Fast delivery to your doorstep.",
      icon: Truck,
    },
    {
      id: "payment",
      title: "Secure Payment",
      description: "100% secure checkout with secure payment gateways.",
      icon: ShieldCheck,
    },
    {
      id: "support",
      title: "24/7 Support",
      description: "Friendly customer support team available at all hours.",
      icon: Headphones,
    },
    {
      id: "returns",
      title: "Easy Returns",
      description: "30-day money-back guarantee if you change your mind.",
      icon: RotateCcw,
    },
  ];

  return { servicesList };
}
