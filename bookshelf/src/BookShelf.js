import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

function Bookshelf({ books, onMoveBook, shelfTitle }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book
              key={book.id}
              book={book}
              shelf={book.shelf}
              onMoveBook={onMoveBook}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.object.isRequired,
  
}

export default Bookshelf;
