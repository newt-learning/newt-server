import React from "react";
import { Link } from "react-router-dom";
import styles from "./ContentInfo.module.css";

interface ContentInfoProps {
  creator?: string;
  partOfSeries?: boolean;
  seriesName?: string;
  seriesSlug?: string;
  contentCreatorSlug?: string;
}

const ContentInfo = ({
  creator,
  partOfSeries,
  seriesName,
  seriesSlug,
  contentCreatorSlug,
}: ContentInfoProps) => {
  return (
    <div className={styles.contentInfo}>
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
    </div>
  );
};

export default ContentInfo;
