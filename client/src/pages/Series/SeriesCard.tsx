import React from "react";
import { Link } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { ContentCard } from "../../components";
import styles from "./SeriesCard.module.css";
import { FiChevronRight } from "react-icons/fi";

interface SeriesCardProps {
  name: string;
  type: "series" | "playlist";
  creator: string;
  creatorSlug: string;
  linkPath: string;
  data?: any;
  colors?: {
    backgroundColor: string;
    textColor: string;
  };
  isLoading: boolean;
}

const SeriesCard = ({
  name,
  type,
  creator,
  creatorSlug,
  linkPath,
  data,
  colors,
  isLoading,
}: SeriesCardProps) => {
  return isLoading ? (
    // Show loading spinner
    <div
      className={styles.container}
      style={{ height: 150, justifyContent: "center", alignItems: "center" }}
    >
      <PropagateLoader size={18} color="#86e1ff" loading={isLoading} />
    </div>
  ) : (
    <div
      className={styles.container}
      style={{ backgroundColor: colors?.backgroundColor }}
    >
      <div className={styles.nameContainer}>
        <Link
          to={linkPath}
          className={styles.name}
          style={{ color: colors?.textColor }}
        >
          {name}
          <div style={{ height: 26, width: 26 }}>
            <FiChevronRight size={26} className={styles.icon} />
          </div>
        </Link>
      </div>
      {/* Display first 3 items */}
      {data
        ? data.slice(0, 3).map((item: any) => (
            <ContentCard
              key={item._id}
              data={{
                id: item?.id,
                name: item?.name,
                // For series, the creator is the same. for playlists, show the
                // creator for each item
                creator:
                  type === "playlist" ? item.contentCreators[0].name : creator,
                thumbnailUrl: item.thumbnailUrl,
                contentNameSlug: item.slug,
                contentCreatorSlug:
                  type === "playlist"
                    ? item.contentCreators[0].slug
                    : creatorSlug,
              }}
              className={styles.contentCard}
            />
          ))
        : null}
    </div>
  );
};

SeriesCard.defaultProps = {
  isLoading: true,
};

export default SeriesCard;
