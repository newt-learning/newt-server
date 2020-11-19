import React from "react";
import _ from "lodash";
import moment from "moment";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { FiBook, FiPlusSquare } from "react-icons/fi";
// Styling
import styles from "./ContentCard.module.css";
// Helpers
import { shortenText } from "../../pages/Shelves/helpers";
// Types
import StackedImages, { ImageUrlType } from "../StackedImages";
import { ContentTypeType } from "../ContentInbox";

const cx = classnames.bind(styles);

interface ContentCardTitleProps {
  title: string;
  size: "small" | "large";
  titleLink?: string;
}

interface ContentCardProps {
  size: "small" | "large";
  type: ContentTypeType;
  title: string;
  authors?: string[];
  description?: string;
  thumbnails: ImageUrlType[];
  dateCompleted?: string;
  showAddToLibrary?: boolean;
  onClick?: () => void;
  onClickAddToLibrary?: () => void;
  titleLink?: string; // Link to someplace once title is clicked
}

const ContentCardTitle = ({
  title,
  size,
  titleLink,
}: ContentCardTitleProps) => {
  // If title is a link, render Link, otherwise just the title
  return titleLink ? (
    <Link to={titleLink} className={styles.titleLink}>
      <h5 className={cx({ title: true, smallTitle: size === "small" })}>
        {title}
      </h5>
    </Link>
  ) : (
    <h5 className={cx({ title: true, smallTitle: size === "small" })}>
      {title}
    </h5>
  );
};

const ContentCard = ({
  size,
  showAddToLibrary,
  type,
  title,
  authors,
  description,
  thumbnails,
  dateCompleted,
  onClick,
  onClickAddToLibrary,
  titleLink,
}: ContentCardProps) => {
  return (
    <div
      className={cx({ card: true, clickable: onClick ? true : false })}
      onClick={onClick}
    >
      <div
        className={cx({ cardVisual: true, smallCardVisual: size === "small" })}
      >
        {type === "series" ? (
          <StackedImages
            imageUrls={thumbnails}
            containerStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "150px",
              width: "100%",
            }}
            imagesStyle={{
              height: "75px",
              margin: "0 0.5rem",
              boxShadow:
                "0px 4px 4px rgba(0, 0, 0, 0.25), inset -4px -4px 8px rgba(0, 0, 0, 0.25), inset 1px 1px 8px rgba(0, 0, 0, 0.25)",
            }}
          />
        ) : !_.isEmpty(thumbnails) ? (
          <img
            src={thumbnails[0].url}
            alt={thumbnails[0].alt}
            className={cx({
              thumbnail: true,
              smallThumbnail: size === "small",
            })}
          />
        ) : (
          <FiBook size={24} color="black" />
        )}
      </div>
      <div className={cx({ cardBody: true, smallCardBody: size === "small" })}>
        {/* If showAddToLibrary props is true, show icon to add content to library.
            Otherwise just the title. */}
        {showAddToLibrary ? (
          <div className={styles.titleContainer}>
            <ContentCardTitle title={title} size={size} titleLink={titleLink} />
            <div className={styles.addIconContainer}>
              <FiPlusSquare
                size={22}
                className={styles.addIcon}
                onClick={onClickAddToLibrary}
              />
            </div>
          </div>
        ) : (
          <ContentCardTitle title={title} size={size} titleLink={titleLink} />
        )}
        {authors ? (
          <p
            className={cx({ authors: true, smallAuthors: size === "small" })}
          >{`by ${authors.join(", ")}`}</p>
        ) : null}
        {description ? (
          <p className={styles.description}>{shortenText(description, 150)}</p>
        ) : null}
        {dateCompleted ? (
          <p className={cx({ authors: true, smallAuthors: size === "small" })}>
            {`Completed ${moment(dateCompleted).format("DD MMM")}`}
          </p>
        ) : null}
      </div>
    </div>
  );
};

ContentCard.defaultProps = {
  size: "large",
  showAddToLibrary: false,
};

export default ContentCard;
