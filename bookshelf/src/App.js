import "./App.css";
import { useState, useEffect } from "react";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [books, setBooks] = useState([]);

   useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll()
      res.forEach((book) => {
        const shelf = localStorage.getItem(book.id)
      })
    }
   })

  const [query, setQuery] = useState("");

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  const showBooks =
  query === ""
    ? books
    : books.filter((c) => c.title.toLowerCase().includes(query) || c.authors.join(', ').toLowerCase().includes(query));

  function moveBook(book, shelf) {
    setBooks((prevBooks) =>
      prevBooks.map((b) => {
        if (b.id === book.id) {
          return { ...b, shelf };
        }
        return b;
      })
    );
  }

  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
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
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter((book) => book.shelf === "currentlyReading")
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
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter((book) => book.shelf === "wantToRead")
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
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter((book) => book.shelf === "read")
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
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
