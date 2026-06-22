export default function useTestimonials() {
  const testimonialsList = [
    {
      id: 1,
      name: "Sarah Connor",
      role: "Senior Frontend Engineer",
      avatarInitials: "SC",
      avatarColor: "bg-indigo-100 text-indigo-700",
      rating: 5,
      comment: "This bookstore is a goldmine for tech books. The delivery was super fast, and the print quality of the Refactoring book is outstanding!",
    },
    {
      id: 2,
      name: "Alex Mercer",
      role: "Full Stack Developer",
      avatarInitials: "AM",
      avatarColor: "bg-emerald-100 text-emerald-700",
      rating: 5,
      comment: "Highly recommended site. The customer service helped me track my package instantly, and their discounts on programming bundles are unmatched.",
    },
    {
      id: 3,
      name: "John Doe",
      role: "Computer Science Student",
      avatarInitials: "JD",
      avatarColor: "bg-amber-100 text-amber-700",
      rating: 4,
      comment: "Excellent selection of classic algorithms textbooks. I bought Introduction to Algorithms here and saved 15% compared to other retailers.",
    },
  ];

  return { testimonialsList };
}
