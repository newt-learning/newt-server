import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "../../components";
import ShowMoreShowLess from "../Content/ShowMoreShowLess";
import styles from "./AddContent.module.css";
import { getBestThumbnail } from "./helpers";
import { shortenText } from "../Shelves/helpers";

interface YoutubeConfirmationProps {
  dataType: "video" | "playlist"; // Youtube data type
  data: any;
  onBack: () => void;
}

const VideoConfirmation = ({
  data,
  onBack,
}: {
  data: any;
  onBack: () => void;
}) => {
  const [showMore, setShowMore] = useState(false);

  const {
    snippet: { title, channelTitle, description, thumbnails },
  } = data;

  console.log(data);

  const bestThumbnail = getBestThumbnail(thumbnails);

  return (
    <>
      <div className={styles.navContainer}>
        <FiArrowLeft size={20} className={styles.backArrow} onClick={onBack} />
        <h3>Confirm Video</h3>
      </div>
      <Image
        src={bestThumbnail ? bestThumbnail.url : null}
        className={styles.thumbnail}
        fluid
      />
      <h4 className={styles.youtubeTitle}>Name</h4>
      <p className={styles.youtubeText}>{title}</p>
      <h4 className={styles.youtubeTitle}>Creator</h4>
      <p className={styles.youtubeText}>{channelTitle}</p>
      <h4 className={styles.youtubeTitle}>Description</h4>
      <p className={styles.youtubeText}>
        {showMore ? description : shortenText(description, 400)}
        <ShowMoreShowLess
          showMore={showMore}
          onClick={() => setShowMore(!showMore)}
        />
      </p>
      <Button style={styles.addBtn} category="success">
        Add to Library
      </Button>
    </>
  );
};

const SeriesConfirmation = ({ data }: { data: any }) => {
  return <div>series confirmation</div>;
};

const YoutubeConfirmation = ({
  dataType,
  data,
  onBack,
}: YoutubeConfirmationProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {dataType === "video" ? (
        <VideoConfirmation data={data} onBack={onBack} />
      ) : (
        <SeriesConfirmation data={data} />
      )}
    </div>
  );
};

export default YoutubeConfirmation;
