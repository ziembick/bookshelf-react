import React from "react";
import { useEffect } from "react";
import Book from "./Book";

function SearchBooks({ query, setQuery, books, moveBook, setShowSearchpage }) {
  useEffect(() => {
    setQuery("");
  }, [setQuery]);

  const handleCloseSearch = () => {
    setShowSearchpage(false);
  };

  return (
    
  );
}

export default SearchBooks;
