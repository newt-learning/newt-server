import React from "react";
import styles from "./ContentFlow.module.css";

interface ContentFlowProps {
  title: string;
  type: string;
  source?: string;
  mediaId?: string;
}

const ContentFlow = ({ title, type, source, mediaId }: ContentFlowProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.flowContainer}>
        {type === "video" ? (
          <h4 className={styles.instruction}>1. Watch the video</h4>
        ) : null}
        {type === "video" && source?.toLowerCase() === "youtube" ? (
          <div className={styles.videoContainer}>
            <iframe
              id="ytplayer"
              title={title}
              width="640"
              height="360"
              src={`https://www.youtube.com/embed/${mediaId}`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ContentFlow;
