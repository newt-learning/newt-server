import React from "react";
import classnames from "classnames/bind";
import styles from "./AppContentListCard.module.css";

let cx = classnames.bind(styles);

interface AppContentListCardProps {
  name: string;
  thumbnailUrl?: string;
  isActive: boolean;
  onClick: () => void;
}

const AppContentListCard = ({
  name,
  isActive,
  thumbnailUrl,
  onClick,
}: AppContentListCardProps) => {
  return (
    <div
      className={cx({
        card: true,
        active: isActive,
      })}
      onClick={onClick}
    >
      {/* If there's a thumbnail url, show thumbnail */}
      <div className={styles.thumbnailContainer}>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for ${name}`}
            className={styles.thumbnail}
          />
        ) : null}
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default AppContentListCard;
