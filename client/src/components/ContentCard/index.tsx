import React from "react";
import { Link } from "react-router-dom";
// Styling
import styles from "./ContentCard.module.css";
// Helpers
import { slugify } from "../../helpers/textHelpers";

export interface ContentCardProps {
  id: string;
  name: string;
  thumbnailUrl: string;
  creator: string;
  contentNameSlug: string;
}

const ContentCard = ({
  id,
  name,
  thumbnailUrl,
  creator,
  contentNameSlug,
}: ContentCardProps) => {
  return (
    <Link
      to={{
        pathname: `/${slugify(creator)}/content/${contentNameSlug}`,
        state: { contentId: id },
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
