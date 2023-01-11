import React from "react";
import PropTypes from "prop-types";

function Book({ book, shelf, onMoveBook }) {
  const shelfs = [
    {
      id: "1",
      shelfName: "currentlyReading",
      shelfDisplayName: "Currently Reading",
    },
    {
      id: "2",
      shelfName: "wantToRead",
      shelfDisplayName: "Want to Read",
    },
    {
      id: "3",
      shelfName: "read",
      shelfDisplayName: "Read",
    },
    {
      id: "4",
      shelfName: "none",
      shelfDisplayName: "None",
    },
  ];

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`,
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
              {shelfs.map((opt) => (
                <option key={opt.id} value={opt.shelfName}>
                  {opt.shelfDisplayName}
                </option>
              ))}
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
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired,
    }),
  }).isRequired,
  shelf: PropTypes.oneOf(["currentlyReading", "wantToRead", "read", "none"])
    .isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default Book;
