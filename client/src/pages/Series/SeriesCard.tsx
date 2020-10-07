import React from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ContentCard } from "../../components";
import styles from "./SeriesCard.module.css";
import { FiChevronRight } from "react-icons/fi";

interface SeriesCardProps {
  name: string;
  creator: string;
  creatorSlug: string;
  linkPath: string;
  data?: any;
  isLoading: boolean;
}

const SeriesCard = ({
  name,
  creator,
  creatorSlug,
  linkPath,
  data,
  isLoading,
}: SeriesCardProps) => {
  return isLoading ? (
    // Show loading skeleton container
    <SkeletonTheme color="#e9f9ff" highlightColor="#d5f5ff">
      <Skeleton height={150} style={{ borderRadius: "1rem" }} />
    </SkeletonTheme>
  ) : (
    <div className={styles.container}>
      <div className={styles.nameContainer}>
        <Link to={linkPath} className={styles.name}>
          {name}
          <div style={{ height: 26, width: 26 }}>
            <FiChevronRight size={26} className={styles.icon} />
          </div>
        </Link>
      </div>
      {/* Display first 3 items */}
      {data
        ? data
            .slice(0, 3)
            .map((item: any) => (
              <ContentCard
                key={item._id}
                id={item.id}
                name={item.name}
                thumbnailUrl={item.thumbnailUrl}
                creator={creator}
                contentNameSlug={item.slug}
                contentCreatorSlug={creatorSlug}
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
