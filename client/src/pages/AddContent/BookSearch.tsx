import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
// API
import { getBookInfo } from "../../api/googleBooksApi";
// Styling
import styles from "./AddContent.module.css";

const BookSearch = () => {
  const [searchBarText, setSearchBarText] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [totalBookResults, setTotalBookResults] = useState(null);
  const [bookResultsError, setBookResultsError] = useState("");

  const clearBookResults = () => {
    setBookResults([]);
    setTotalBookResults(null);
    setBookResultsError("");
  };

  // Fetch books from search bar text input
  useEffect(() => {
    const getResults = async (searchTerm: string) => {
      try {
        const results = await getBookInfo(searchTerm);
        // If an items property exists in results object, set the items in state,
        // otherwise set an empty array
        results.items ? setBookResults(results.items) : setBookResults([]);
        setTotalBookResults(results.totalItems);
      } catch (e) {
        setBookResultsError("Sorry, there was an error searching for books.");
      }
    };

    if (searchBarText) {
      getResults(searchBarText);
    } else {
      clearBookResults();
    }
  }, [searchBarText]);

  return (
    <div>
      <Form>
        <Form.Control
          type="text"
          name="book-search"
          value={searchBarText}
          onChange={(e: any) => setSearchBarText(e.target.value)}
          className={styles.searchbar}
          placeholder="Search for books..."
          autoFocus={true}
        />
      </Form>
      <p>{JSON.stringify(bookResults)}</p>
    </div>
  );
};

export default BookSearch;
