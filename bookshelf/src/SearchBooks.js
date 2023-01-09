import React from "react";
import { useEffect } from "react";
import Book from "./Book";

function SearchBooks({ query, setQuery, books, moveBook }) {
  useEffect(() => {
    setQuery("");
  }, [setQuery]);

  const handleCloseSearch = () => {
    setShowSearchpage(false);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={handleCloseSearch}>
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
