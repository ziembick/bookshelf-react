import React from "react";
import Book from "./Book";
import { useNavigate } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

function SearchBooks({
  query,
  setQuery,
  books,
  setBooks,
  moveBook,
  maxResults,
}) {
  const navigate = useNavigate();

  const handleSearch = (query, maxResults) => {
    BooksAPI.search(query, maxResults)
    .then((res) => {
      setBooks(res)
    })
    .catch((error) => {
      console.error(error)
    })
  }

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
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                handleSearch(query, maxResults)
              }
            }}
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

SearchBooks.defaultProps = {
  setBooks: ()=>{},
};




export default SearchBooks;
