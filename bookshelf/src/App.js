import "./App.css";
import { useState, useEffect } from "react";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      res.forEach((book) => {
        const shelf = localStorage.getItem(book.id);
        if (shelf) {
          book.shelf = shelf;
        }
      });
      setBooks(res);
    };
    getBooks();
  }, []);

  const [query, setQuery] = useState("");

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  const showBooks =
    query === ""
      ? books
      : books.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            c.authors.join(", ").toLowerCase().includes(query)
        );

  function moveBook(book, shelf) {
    setBooks((prevBooks) =>
      prevBooks.map((b) => {
        if (b.id === book.id) {
          return { ...b, shelf };
        }
        return b;
      })
    );
    localStorage.setItem(book.id, shelf);
  }

  useEffect(() => {
    books.forEach((book) => {
      localStorage.setItem(book.id, book.shelf);
    });
  }, [books]);

  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              to="/books"
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {showBooks.map((book) => (
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
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                shelfTitle="Currently Reading"
                books={books.filter(
                  (book) => book.shelf === "currentlyReading"
                )}
                onMoveBook={moveBook}
              />
              <BookShelf
                shelfTitle="Want to Read"
                books={books.filter((book) => book.shelf === "wantToRead")}
                onMoveBook={moveBook}
              />
              <BookShelf
                shelfTitle="Read"
                books={books.filter((book) => book.shelf === "read")}
                onMoveBook={moveBook}
              />
            </div>
          </div>
          <div className="open-search">
            <Link
              to="/search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Add a book
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
