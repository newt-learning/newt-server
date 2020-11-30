import React from "react";
import { Link } from "react-router-dom";
import styles from "./ShelfContentCard.module.css";
import { shortenText } from "./helpers";

interface ShelfContentCardProps {
  contentId: string;
  name: string;
  thumbnailUrl?: string;
  shelfId: "currently-learning" | "want-to-learn" | "finished-learning";
}

const ShelfContentCard = ({
  contentId,
  name,
  thumbnailUrl,
  shelfId,
}: ShelfContentCardProps) => {
  return (
    <Link to={`shelves/${shelfId}/${contentId}`}>
      <div className={styles.card} id={styles[shelfId]}>
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for ${name}`}
          className={styles.thumbnail}
        />
        <div className={styles.name}>{shortenText(name, 30)}</div>
      </div>
    </Link>
  );
};

export default ShelfContentCard;
