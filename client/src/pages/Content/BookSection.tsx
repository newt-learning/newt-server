import React from "react";
import styles from "./BookSection.module.css";
import { auth } from "firebase";

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
  return (
    <div className={styles.container}>
      <img src={thumbnailUrl} alt={title} />
      <div className={styles.bookInfo}>
        {authors ? (
          <div className={styles.authors}>{`by ${authors.join(", ")}`}</div>
        ) : null}
        {pageCount ? (
          <div className={styles.pageCount}>{`${pageCount} pages`}</div>
        ) : null}
      </div>
    </div>
  );
};

export default BookSection;
