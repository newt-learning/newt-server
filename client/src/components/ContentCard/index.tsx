import React from "react";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
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

interface SeeAllCardProps {
  linkPath: string;
  className?: string;
}

export const SeeAllCard = ({ linkPath, className }: SeeAllCardProps) => {
  return (
    <Link to={linkPath}>
      <div className={cx({ card: true, seeAllCard: true }, className)}>
        See all <FiChevronRight color="#2d3748" size={22} />
      </div>
    </Link>
  );
};

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
