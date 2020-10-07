import React from "react";
import { Link } from "react-router-dom";
import { ContentCard } from "../../components";
import styles from "./SeriesCard.module.css";
import { FiChevronRight } from "react-icons/fi";

interface SeriesCardProps {
  name: string;
  creator: string;
  creatorSlug: string;
  linkPath: string;
  data?: any;
}

const SeriesCard = ({
  name,
  creator,
  creatorSlug,
  linkPath,
  data,
}: SeriesCardProps) => {
  return (
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

export default SeriesCard;
