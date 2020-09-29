import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./DiscoverContentCard.module.css";

export interface ContentCardProps {
  name: string;
  thumbnailUrl: string;
  creator: string;
  contentNameSlug: string;
  contentCreatorSlug: string;
}

const ContentCard = ({
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
