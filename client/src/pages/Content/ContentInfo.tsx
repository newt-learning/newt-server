import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import styles from "./ContentInfo.module.css";

interface ContentInfoProps {
  creator?: string;
  partOfSeries?: boolean;
  seriesName?: string;
  seriesSlug?: string;
  contentCreatorSlug?: string;
  isLoading?: boolean;
}

const ContentInfo = ({
  creator,
  partOfSeries,
  seriesName,
  seriesSlug,
  contentCreatorSlug,
  isLoading,
}: ContentInfoProps) => {
  return (
    <div className={styles.contentInfo}>
      {isLoading ? (
        <Skeleton count={2} />
      ) : (
        <>
          <h4 className={styles.infoHeader}>Info</h4>
          {creator ? (
            <div className={styles.infoRow}>
              <span className={styles.infoRowField}>By:</span>
              <span className={styles.infoRowValue}>{creator}</span>
            </div>
          ) : null}
          {partOfSeries ? (
            <div className={styles.infoRow}>
              <span className={styles.infoRowField}>Series:</span>
              <Link
                to={{ pathname: `/${contentCreatorSlug}/series/${seriesSlug}` }}
              >
                <span className={styles.infoRowValue}>{seriesName}</span>
              </Link>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ContentInfo;
