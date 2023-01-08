import React from "react";
import { Link } from "react-router-dom";

function AddBook({ setShowSearchpage }) {
  const handleAddBook = () => {
    setShowSearchpage(true);
  };

  return (
    <div className="open-search">
      <Link to="/search" onClick={handleAddBook}>
        Add a book
      </Link>
    </div>
  );
}

export default AddBook;
