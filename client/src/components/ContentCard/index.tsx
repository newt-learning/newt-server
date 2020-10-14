import React from "react";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
// Styling
import styles from "./ContentCard.module.css";

const cx = classnames.bind(styles);

export interface ContentCardProps {
  data: {
    id?: string;
    name: string;
    creator: string;
    thumbnailUrl: string;
    contentNameSlug: string;
    contentCreatorSlug: string;
  };
  className?: string;
}

const ContentCard = ({
  data: { name, thumbnailUrl, creator, contentNameSlug, contentCreatorSlug },
  className,
}: ContentCardProps) => {
  return (
    <Link
      to={{
        pathname: `/${contentCreatorSlug}/content/${contentNameSlug}`,
      }}
    >
      <div className={cx({ card: true }, className)}>
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
