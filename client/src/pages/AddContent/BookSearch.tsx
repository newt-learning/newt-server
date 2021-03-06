import React, { useState, useEffect } from "react";
import _ from "lodash";
// API
import { getBookInfo } from "../../api/googleBooksApi";
// Components
import { FiBook } from "react-icons/fi";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import { Button, ContentCard } from "../../components";
import ShowMoreShowLess from "../Content/ShowMoreShowLess";
// Styling
import styles from "./AddContent.module.css";
// Helpers
import { shortenText } from "../Shelves/helpers";
import { checkThumbnailExistence } from "./helpers";

interface BookSearchProps {
  onSubmit: (values: any) => void;
  isLoading?: boolean;
}

const BookSearch = ({ onSubmit, isLoading }: BookSearchProps) => {
  const [searchBarText, setSearchBarText] = useState("");
  const [bookResults, setBookResults] = useState<any>([]);
  const [totalBookResults, setTotalBookResults] = useState(null);
  const [bookResultsError, setBookResultsError] = useState("");
  // Adding book to library
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [bookToAdd, setBookToAdd] = useState<any>(null);
  const [shelf, setShelf] = useState("Want to Learn");
  const [startDate, setStartDate] = useState<any>(new Date());
  const [finishDate, setFinishDate] = useState<any>(new Date());
  const [showMore, setShowMore] = useState(false);

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
              const thumbnailUrl = checkThumbnailExistence(book?.volumeInfo);
              const thumbnails = thumbnailUrl
                ? [
                    {
                      url: thumbnailUrl,
                      alt: `Thumbnail for ${book?.volumeInfo?.title}`,
                    },
                  ]
                : [];

              return (
                <ContentCard
                  key={`${book?.id}-${book?.etag}`}
                  size="small"
                  type="book"
                  showAddToLibrary={true}
                  onClick={() => {
                    setBookToAdd(book);
                    setShowAddBookModal(true);
                  }}
                  onClickAddToLibrary={() => {
                    setBookToAdd(book);
                    setShowAddBookModal(true);
                  }}
                  title={book?.volumeInfo?.title}
                  authors={book?.volumeInfo?.authors}
                  thumbnails={thumbnails}
                />
              );
            })}
          </div>
          <SeeMoreBooks />
        </>
      )}
      <Modal
        size="lg"
        show={showAddBookModal}
        onHide={() => setShowAddBookModal(false)}
        backdrop="static"
        animation={false}
      >
        <Modal.Header closeButton>Add Book to Library</Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {/* If no thumbnail exists, show Book icon, otherwise book cover image */}
          {_.isEmpty(checkThumbnailExistence(bookToAdd?.volumeInfo)) ? (
            <FiBook size={72} color="#4a5568" className={styles.thumbnail} />
          ) : (
            <Image
              src={
                bookToAdd
                  ? checkThumbnailExistence(bookToAdd?.volumeInfo)
                  : null
              }
              className={styles.thumbnail}
              fluid
            />
          )}
          <h3 className={styles.title}>{bookToAdd?.volumeInfo?.title}</h3>
          <p className={styles.creator}>{bookToAdd?.volumeInfo?.authors}</p>
          <Form.Group controlId="shelf">
            <Form.Label className={styles.subheader}>Shelf</Form.Label>
            <Form.Control
              as="select"
              name="shelf"
              defaultValue="Want to Learn"
              onChange={(e: any) => setShelf(e.target.value)}
            >
              <option value="Currently Learning">Currently Learning</option>
              <option value="Want to Learn">Want to Learn</option>
              <option value="Finished Learning">Finished Learning</option>
            </Form.Control>
          </Form.Group>
          {/* Show start and finish date inputs if the Finished Learning shelf is selected */}
          {shelf === "Finished Learning" ? (
            <Form.Row>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label
                    className={styles.subheader}
                    style={{ marginRight: "1rem" }}
                  >
                    Start Date
                  </Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6}>
                <Form.Group>
                  <Form.Label
                    className={styles.subheader}
                    style={{ marginRight: "1rem" }}
                  >
                    Finish Date
                  </Form.Label>
                  <DatePicker
                    selected={finishDate}
                    onChange={(date) => setFinishDate(date)}
                    minDate={startDate}
                  />
                </Form.Group>
              </Col>
            </Form.Row>
          ) : null}
          {bookToAdd?.volumeInfo?.description ? (
            <>
              <h4 className={styles.subheader}>Description</h4>
              <p className={styles.youtubeText}>
                {showMore
                  ? bookToAdd?.volumeInfo?.description
                  : shortenText(bookToAdd?.volumeInfo?.description, 300)}
                <ShowMoreShowLess
                  showMore={showMore}
                  onClick={() => setShowMore(!showMore)}
                />
              </p>
            </>
          ) : null}
          <Button
            className={styles.addBtn}
            category="success"
            isLoading={isLoading}
            onClick={async () => {
              await onSubmit({
                bookInfo: bookToAdd,
                shelf,
                playlists: [],
                startDate,
                finishDate,
              });

              setShowAddBookModal(false);
              setBookToAdd(null);
            }}
          >
            Add to Library
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookSearch;
