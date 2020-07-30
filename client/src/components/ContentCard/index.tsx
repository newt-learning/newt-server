import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./ContentCard.module.css";
// Helpers
import { slugify } from "../../helpers/textHelpers";

export interface ContentCardProps {
  name: string;
  thumbnailUrl: string;
  creator: string;
}

const ContentCard = ({ name, thumbnailUrl, creator }: ContentCardProps) => {
  return (
    <Link to={`/${slugify(creator)}/content/${slugify(name)}`}>
      <div className={styles.card}>
        <img
          src={thumbnailUrl}
          className={styles.img}
          alt={`Thumbnail for ${name}`}
        />
        <div className={styles.name}>{name}</div>
        <div className={styles.creator}>{`by ${creator}`}</div>
      </div>
    </Link>
  );
};

export default ContentCard;
