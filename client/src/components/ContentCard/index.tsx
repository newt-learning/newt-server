import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./ContentCard.module.css";

export interface ContentCardProps {
  id: string;
  name: string;
  thumbnailUrl: string;
  creator: string;
  contentNameSlug: string;
  contentCreatorSlug: string;
}

const ContentCard = ({
  id,
  name,
  thumbnailUrl,
  creator,
  contentNameSlug,
  contentCreatorSlug,
}: ContentCardProps) => {
  return (
    <Link
      to={{
        pathname: `/${contentCreatorSlug}/content/${contentNameSlug}`,
      }}
    >
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
