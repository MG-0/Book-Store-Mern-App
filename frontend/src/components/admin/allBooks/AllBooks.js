import useAllBooks from "./useAllBooks";
import BookCard from "../../ui/BookCard";

export default function AllBooks() {
  const { bookList, loading, toEditBook, removeBook } = useAllBooks();

  if (loading) return <h1>Loading....</h1>;

  // CLEAN CODE RATIONALE:
  // Grid layout rules (e.g. sm:grid-cols-2 lg:grid-cols-4) are extremely readable and clean
  // when kept inline. Since layout rules are highly structural, we see the grid arrangement
  // directly in the template.
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">All Books</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bookList.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            variant="admin"
            onEdit={toEditBook}
            onDelete={removeBook}
          />
        ))}
      </div>
    </div>
  );
}

