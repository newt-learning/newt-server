import React from "react";
import styles from "./ShelfContentCard.module.css";
import { shortenText } from "./helpers";

interface ShelfContentCardProps {
  name: string;
  thumbnailUrl?: string;
  shelfId: "currently-learning" | "want-to-learn" | "finished-learning";
}

const ShelfContentCard = ({
  name,
  thumbnailUrl,
  shelfId,
}: ShelfContentCardProps) => {
  return (
    <div className={styles.card} id={styles[shelfId]}>
      <img
        src={thumbnailUrl}
        alt={`Thumbnail for ${name}`}
        className={styles.thumbnail}
      />
      <div className={styles.name}>{shortenText(name, 30)}</div>
    </div>
  );
};

export default ShelfContentCard;
