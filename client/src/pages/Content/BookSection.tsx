import React from "react";
import { Button, ProgressBar } from "../../components";
import styles from "./BookSection.module.css";

interface BookSectionProps {
  title: string;
  authors?: string[];
  thumbnailUrl?: string;
  pageCount?: number;
  pagesRead?: number;
}

const BookSection = ({
  title,
  thumbnailUrl,
  authors,
  pageCount,
  pagesRead,
}: BookSectionProps) => {
  const calculatePercentComplete = (
    pagesRead: number | undefined,
    totalPages: number | undefined
  ) => {
    return pagesRead && totalPages
      ? Math.round((pagesRead / totalPages) * 100)
      : 0;
  };

  return (
    <div className={styles.container}>
      <img src={thumbnailUrl} alt={title} />
      <div className={styles.bookInfo}>
        <div>
          {authors ? (
            <div className={styles.authors}>{`by ${authors.join(", ")}`}</div>
          ) : null}
          {pageCount ? (
            <div className={styles.pageCount}>{`${pageCount} pages`}</div>
          ) : null}
        </div>
        <div className={styles.progressBarContainer}>
          <ProgressBar
            percentComplete={calculatePercentComplete(pagesRead, pageCount)}
          />
          <Button
            style={styles.updateBtn}
            onClick={() => console.log("update")}
          >
            Update Progress
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookSection;
