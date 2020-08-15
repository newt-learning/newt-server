import React from "react";
import styles from "./ShelfContentCard.module.css";
import { shortenText } from "./helpers";

interface ShelfContentCardProps {
  name: string;
  thumbnailUrl?: string;
}

const ShelfContentCard = ({ name, thumbnailUrl }: ShelfContentCardProps) => {
  return (
    <div className={styles.card}>
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
