import React from "react";
import _ from "lodash";
import classnames from "classnames/bind";
import { StackedImages } from "..";
import styles from "./AppContentListCard.module.css";
import { ContentTypeType } from "../ContentInbox";
import { ImageUrlType } from "../StackedImages";

let cx = classnames.bind(styles);

interface AppContentListCardProps {
  name: string;
  contentType: ContentTypeType;
  thumbnails: ImageUrlType[];
  isActive: boolean;
  onClick: () => void;
}

const AppContentListCard = ({
  name,
  contentType,
  isActive,
  thumbnails,
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
            imageUrls={thumbnails}
            containerStyle={{ height: "55px", width: "100%" }}
            imagesStyle={{
              height: "45px",
              borderRadius: "0.25rem",
              marginRight: "0.75rem",
            }}
          />
        ) : /* If there's a thumbnail url, show thumbnail */
        !_.isEmpty(thumbnails) ? (
          <img
            src={thumbnails[0].url}
            alt={thumbnails[0].alt}
            className={cx({
              thumbnail: true,
              bookThumbnail: contentType === "book",
            })}
          />
        ) : null}
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default AppContentListCard;
