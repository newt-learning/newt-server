import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import ShowMoreShowLess from "../Content/ShowMoreShowLess";
import styles from "./AddContent.module.css";
import { getBestThumbnail } from "./helpers";
import { shortenText } from "../Shelves/helpers";

interface YoutubeConfirmationProps {
  dataType: "video" | "playlist"; // Youtube data type
  data: any;
}

const VideoConfirmation = ({ data }: { data: any }) => {
  const [showMore, setShowMore] = useState(false);

  const {
    snippet: { title, description, thumbnails },
  } = data;

  const bestThumbnail = getBestThumbnail(thumbnails);

  return (
    <>
      <h3>Confirm Video</h3>
      <Image
        src={bestThumbnail ? bestThumbnail.url : null}
        fluid
        style={{
          maxHeight: "200px",
          alignSelf: "center",
          borderRadius: "0.5rem",
        }}
      />
      <h4 className={styles.youtubeTitle}>Name</h4>
      <p className={styles.youtubeText}>{title}</p>
      <h4 className={styles.youtubeTitle}>Description</h4>
      <p className={styles.youtubeText}>
        {showMore ? description : shortenText(description, 400)}
        <ShowMoreShowLess
          showMore={showMore}
          onClick={() => setShowMore(!showMore)}
        />
      </p>
    </>
  );
};

const SeriesConfirmation = ({ data }: { data: any }) => {
  return <div>series confirmation</div>;
};

const YoutubeConfirmation = ({ dataType, data }: YoutubeConfirmationProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {dataType === "video" ? (
        <VideoConfirmation data={data} />
      ) : (
        <SeriesConfirmation data={data} />
      )}
    </div>
  );
};

export default YoutubeConfirmation;
