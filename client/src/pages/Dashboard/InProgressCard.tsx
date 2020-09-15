import React from "react";
import styles from "./InProgressCard.module.css";
import { FiBook } from "react-icons/fi";
// Helpers
import { shortenText } from "../Shelves/helpers";

interface InProgressCardProps {
  title: string;
  authors: string[];
  description?: string;
}

const InProgressCard = ({
  title,
  authors,
  description,
}: InProgressCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardVisual}>
        <FiBook size={24} color="black" />
      </div>
      <div className={styles.cardBody}>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.authors}>{`by ${authors.join(", ")}`}</p>
        {description ? (
          <p className={styles.description}>{shortenText(description, 150)}</p>
        ) : null}
      </div>
    </div>
  );
};

export default InProgressCard;
