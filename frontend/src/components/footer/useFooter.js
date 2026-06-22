import { useState } from "react";
import { toast } from "react-toastify";

export default function useFooter() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thank you for subscribing to our newsletter! ✉️");
    setEmail("");
  };

  return { currentYear, email, setEmail, handleNewsletterSubmit };
}
