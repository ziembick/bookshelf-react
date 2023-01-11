import React, { useEffect, useState } from "react";
import Book from "./Book";
import { useNavigate } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

function SearchBooks({ query, setQuery, books, moveBook }) {
 const navigate = useNavigate();
 const [searchResults, setSearchResult] = useState([]);


 useEffect(() => {
  const SearchBooks = async () => {
    const res = await BooksAPI.search(query);
    setSearchResult(res);
  };
  SearchBooks()
 }, [query])

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => {
          navigate('/')
        }}>
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
