import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
// API
import { getBookInfo } from "../../api/googleBooksApi";
import { ContentCard } from "../../components";
import ShowMoreShowLess from "../Content/ShowMoreShowLess";
// Styling
import styles from "./AddContent.module.css";
import { checkThumbnailExistence } from "./helpers";

const BookSearch = () => {
  const [searchBarText, setSearchBarText] = useState("");
  const [bookResults, setBookResults] = useState<any>([]);
  const [totalBookResults, setTotalBookResults] = useState(null);
  const [bookResultsError, setBookResultsError] = useState("");

  const clearBookResults = () => {
    setBookResults([]);
    setTotalBookResults(null);
    setBookResultsError("");
  };

  // Function to fetch more books when the "See more books" button is pressed at
  // the bottom of the list.
  const getMoreBooks = async () => {
    try {
      // Second argument to function is the start index for the search (set as
      // the length on the current results)
      const moreBooks = await getBookInfo(searchBarText, bookResults.length);
      // Combine the new books with existing books
      if (moreBooks.items) {
        setBookResults([...bookResults, ...moreBooks.items]);
      }
    } catch (e) {
      setBookResultsError(
        "Sorry, there was an error searching for more books."
      );
    }
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

  const SeeMoreBooks = () => {
    if (totalBookResults) {
      // @ts-ignore
      if (totalBookResults > 0 && bookResults.length < totalBookResults) {
        return <ShowMoreShowLess showMore={false} onClick={getMoreBooks} />;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

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
      {totalBookResults === 0 ? (
        <p>No results found</p>
      ) : bookResultsError ? (
        <p>{bookResultsError}</p>
      ) : (
        <>
          <div className={styles.booksContainer}>
            {bookResults.map((book: any) => {
              return (
                <ContentCard
                  key={`${book?.id}-${book?.etag}`}
                  size="small"
                  showAddToLibrary={true}
                  onClickAddToLibrary={() => console.log("add to lib")}
                  title={book?.volumeInfo?.title}
                  authors={book?.volumeInfo?.authors}
                  thumbnailUrl={checkThumbnailExistence(book?.volumeInfo)}
                />
              );
            })}
          </div>
          <SeeMoreBooks />
        </>
      )}
    </div>
  );
};

export default BookSearch;
