import React from "react";
import moment from "moment";
import classnames from "classnames/bind";
import styles from "./ContentCard.module.css";
import { FiBook, FiPlusSquare } from "react-icons/fi";
// Helpers
import { shortenText } from "../../pages/Shelves/helpers";

const cx = classnames.bind(styles);

interface ContentCardProps {
  size: "small" | "large";
  title: string;
  authors?: string[];
  description?: string;
  thumbnailUrl?: string;
  dateCompleted?: string;
  showAddToLibrary?: boolean;
  onClickAddToLibrary?: () => void;
}

const ContentCard = ({
  size,
  showAddToLibrary,
  title,
  authors,
  description,
  thumbnailUrl,
  dateCompleted,
  onClickAddToLibrary,
}: ContentCardProps) => {
  return (
    <div className={styles.card}>
      <div
        className={cx({ cardVisual: true, smallCardVisual: size === "small" })}
      >
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
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
            <h5 className={cx({ title: true, smallTitle: size === "small" })}>
              {title}
            </h5>
            <div className={styles.addIconContainer}>
              <FiPlusSquare
                size={22}
                className={styles.addIcon}
                onClick={onClickAddToLibrary}
              />
            </div>
          </div>
        ) : (
          <h5 className={cx({ title: true, smallTitle: size === "small" })}>
            {title}
          </h5>
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
