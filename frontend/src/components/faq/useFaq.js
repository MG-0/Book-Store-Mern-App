import { useState } from "react";

export default function useFaq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqList = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping options are available at checkout and usually take 1-2 business days.",
    },
    {
      question: "Are these books brand new physical books?",
      answer: "Yes, all books sold on our store are brand new, original physical paperbacks or hardcovers sourced directly from certified tech publishers.",
    },
    {
      question: "Can I return a book if I change my mind?",
      answer: "Absolutely! We offer a 30-day money-back guarantee. The book must be in its original, undamaged condition to receive a full refund.",
    },
    {
      question: "How do I track my order status?",
      answer: "Once your package is shipped, you will receive an email with a tracking link. You can also view details under your account's order history.",
    },
  ];

  return { faqList, activeIndex, toggleIndex };
}
