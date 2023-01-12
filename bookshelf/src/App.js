import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";
import AddBook from "./AddBook";
import { Route, Routes } from "react-router-dom";

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

  function moveBook(book, shelf) {
    setBooks((prevBooks) =>
      prevBooks.map((b) => {
        if (b.id === book.id) {
          return { ...b, shelf };
        }
        return b;
      })
    );
    BooksAPI.update(book, shelf)
  }

  useEffect(() => {
    books.forEach((book) => {
      
    });
  }, [books]);

  return (
    <Routes>
      <Route path="/search" element={
        <SearchBooks
          query={query}
          setQuery={setQuery}
          books={books}
          moveBook={moveBook}
        />
      }/>
      <Route path="/" element={
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
          <AddBook />
        </div>
        }/>
     </Routes>
  );
}

export default App;
