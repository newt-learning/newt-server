import React from "react";
import styles from "./ContentInfo.module.css";

interface ContentInfoProps {
  creator?: string;
  partOfSeries?: boolean;
  seriesName?: string;
}

const ContentInfo = ({
  creator,
  partOfSeries,
  seriesName,
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
          <span className={styles.infoRowValue}>{seriesName}</span>
        </div>
      ) : null}
    </div>
  );
};

export default ContentInfo;
