import React, { useState, ChangeEvent } from "react";
import Image from "react-bootstrap/Image";
import { FiArrowLeft } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import { Button } from "../../components";
import ShowMoreShowLess from "../Content/ShowMoreShowLess";
import styles from "./AddContent.module.css";
import { getBestThumbnail } from "./helpers";
import { shortenText } from "../Shelves/helpers";

interface YoutubeConfirmationProps {
  dataType: "video" | "playlist"; // Youtube data type
  data: any;
  onBack: () => void;
  onSubmit: (values: any) => void;
}
interface VideoConfirmationProps {
  data: any;
  onBack: () => void;
  onSubmit: (values: any) => void;
}

const VideoConfirmation = ({
  data,
  onBack,
  onSubmit,
}: VideoConfirmationProps) => {
  const [showMore, setShowMore] = useState(false);
  const [shelf, setShelf] = useState("Want to Learn");

  const {
    snippet: { title, channelTitle, description, thumbnails },
  } = data;

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
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.creator}>{channelTitle}</p>
      <Form.Group controlId="shelf">
        <Form.Label className={styles.subheader}>Shelf</Form.Label>
        <Form.Control
          as="select"
          name="shelf"
          defaultValue="Want to Learn"
          onChange={(e: ChangeEvent) => setShelf(e.target.innerHTML)}
        >
          <option>Currently Learning</option>
          <option>Want to Learn</option>
          <option>Finished Learning</option>
        </Form.Control>
      </Form.Group>
      <h4 className={styles.subheader}>Description</h4>
      <p className={styles.youtubeText}>
        {showMore ? description : shortenText(description, 300)}
        <ShowMoreShowLess
          showMore={showMore}
          onClick={() => setShowMore(!showMore)}
        />
      </p>
      <Button
        style={styles.addBtn}
        category="success"
        onClick={() =>
          onSubmit({
            name: title,
            authors: [channelTitle],
            thumbnailUrl: bestThumbnail?.url,
            shelf,
          })
        }
      >
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
  onSubmit,
}: YoutubeConfirmationProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {dataType === "video" ? (
        <VideoConfirmation data={data} onBack={onBack} onSubmit={onSubmit} />
      ) : (
        <SeriesConfirmation data={data} />
      )}
    </div>
  );
};

export default YoutubeConfirmation;
