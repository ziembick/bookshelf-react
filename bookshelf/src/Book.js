import React from 'react';
import PropTypes from "prop-types";

function Book({ book, shelf, onMoveBook }) {

  const shelfs = [
    {
      id: "1",
      shelfName: "currentlyReading",
      shelfDisplayName: "Currently Reading"
    },
    {
      id: "2",
      shelfName: "wantToRead",
      shelfDisplayName: "Want to Read"
    },
  ]

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={(event) => onMoveBook(book, event.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
}


Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired,
}


export default Book;