import React from "react";
import Book from "./Book";
import { useNavigate } from "react-router-dom";

function SearchBooks({
  query,
  setQuery,
  books,
  setBooks,
  moveBook,
  maxResults,
}) {
  const navigate = useNavigate();

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button
          className="close-search"
          onClick={() => {
            navigate("/");
          }}
        >
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books
            .filter(
              (book) =>
                book.title.toLowerCase().includes(query) ||
                book.authors.join(", ").toLowerCase().includes(query)
            )
            .map((book) => (
              <Book
                key={book.id}
                book={book}
                shelf={book.shelf}
                onMoveBook={moveBook}
              />
            ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchBooks;
