import React from "react";
import classnames from "classnames/bind";
import { StackedImages } from "..";
import styles from "./AppContentListCard.module.css";
import { ContentTypeType } from "../ContentInbox";

let cx = classnames.bind(styles);

interface AppContentListCardProps {
  name: string;
  contentType: ContentTypeType;
  thumbnailUrl?: string;
  isActive: boolean;
  onClick: () => void;
}

const AppContentListCard = ({
  name,
  contentType,
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
      <div className={styles.thumbnailContainer}>
        {contentType === "series" ? (
          <StackedImages
            imageUrls={
              thumbnailUrl
                ? [{ url: thumbnailUrl, alt: `Thumbnail for ${name}` }]
                : []
            }
            containerStyle={{ height: "55px", width: "100%" }}
            imagesStyle={{ height: "45px", marginRight: "0.75rem" }}
          />
        ) : /* If there's a thumbnail url, show thumbnail */
        thumbnailUrl ? (
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
