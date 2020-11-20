import React, { useState } from "react";
import _ from "lodash";
// Components
import DatePicker from "react-datepicker";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { FiArrowLeft } from "react-icons/fi";
import {
  Button,
  ContentCard,
  StackedImages,
  getFirstThreeThumbnailsForSeries,
} from "../../components";
import ShowMoreShowLess from "../Content/ShowMoreShowLess";
// Styling
import styles from "./AddContent.module.css";
import "react-datepicker/dist/react-datepicker.css";
// Helpers
import { getBestThumbnail } from "./helpers";
import { shortenText } from "../Shelves/helpers";
// Types
import { ImageUrlType } from "../../components/StackedImages";

interface YoutubeConfirmationProps {
  type: "video" | "series"; // Youtube data type
  data: any;
  onBack: () => void;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
}

const YoutubeConfirmation = ({
  type,
  data,
  onBack,
  onSubmit,
  isLoading,
}: YoutubeConfirmationProps) => {
  const [showMore, setShowMore] = useState(false);
  const [shelf, setShelf] = useState("Want to Learn");
  const [startDate, setStartDate] = useState<any>(new Date());
  const [finishDate, setFinishDate] = useState<any>(new Date());
  // // Toggle between seeing first 2 or all series videos
  const [showAllVideos, setShowAllVideos] = useState(false);

  const { name, authors, description, thumbnailUrl, videos } = data;

  // Stuff for series
  let numOfVideos = undefined,
    initialVideosToRender = undefined,
    displayVideos = undefined,
    thumbnailUrls: ImageUrlType[] = [];

  if (type === "series") {
    numOfVideos = videos?.length;
    initialVideosToRender = numOfVideos > 2 ? 2 : numOfVideos;
    displayVideos = showAllVideos
      ? videos
      : videos.slice(0, initialVideosToRender);
    // Get the first 3 thumbnail URLs to display in the stacked image
    thumbnailUrls = getFirstThreeThumbnailsForSeries(videos, "YouTube");
  }

  const handleSubmit = async () => {
    // Common data between video and series
    const submissionData: any = {
      shelf,
      startDate,
      finishDate,
    };

    // videoInfo for videos, seriesInfo for series
    if (type === "video") {
      submissionData.videoInfo = data;
    } else if (type === "series") {
      submissionData.seriesInfo = data;
    }

    await onSubmit(submissionData);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={styles.navContainer}>
        <FiArrowLeft size={20} className={styles.backArrow} onClick={onBack} />
        {/* Change title based on type */}
        <h3>{`Confirm ${_.capitalize(type)}`}</h3>
      </div>
      {/* Single image for video, Stacked images for series */}
      {type === "video" ? (
        <Image src={thumbnailUrl} className={styles.thumbnail} fluid />
      ) : type === "series" ? (
        <StackedImages
          imageUrls={thumbnailUrls}
          containerStyle={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
          }}
        />
      ) : null}
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.creator}>{authors.join(", ")}</p>
      {/* If it's a series, num of videos in it */}
      {type === "series" ? (
        <p className={styles.creator}>
          {videos ? `${numOfVideos} videos` : null}
        </p>
      ) : null}
      {/* Form to choose shelf */}
      <Form.Group controlId="shelf">
        <Form.Label className={styles.subheader}>Shelf</Form.Label>
        <Form.Control
          as="select"
          name="shelf"
          defaultValue="Want to Learn"
          onChange={(e: any) => setShelf(e.target.value)}
        >
          <option value="Currently Learning">Currently Learning</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Finished Learning">Finished Learning</option>
        </Form.Control>
      </Form.Group>
      {/* Show start and finish date inputs if the Finished Learning shelf is selected */}
      {shelf === "Finished Learning" ? (
        <Form.Row>
          <Col sm={12} md={6}>
            <Form.Group>
              <Form.Label
                className={styles.subheader}
                style={{ marginRight: "1rem" }}
              >
                Start Date
              </Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group>
              <Form.Label
                className={styles.subheader}
                style={{ marginRight: "1rem" }}
              >
                Finish Date
              </Form.Label>
              <DatePicker
                selected={finishDate}
                onChange={(date) => setFinishDate(date)}
                minDate={startDate}
              />
            </Form.Group>
          </Col>
        </Form.Row>
      ) : null}
      <h4 className={styles.subheader}>Description</h4>
      <p className={styles.youtubeText}>
        {showMore ? description : shortenText(description, 300)}
        <ShowMoreShowLess
          showMore={showMore}
          onClick={() => setShowMore(!showMore)}
        />
      </p>
      {/* If it's a series, show videos that are part of Series */}
      {!_.isEmpty(displayVideos) ? (
        <div className={styles.videosContainer}>
          {displayVideos.map((video: any) => {
            const title = video?.snippet?.title;
            const bestThumbnail = getBestThumbnail(video.snippet.thumbnails);
            const thumbnails = bestThumbnail
              ? [{ url: bestThumbnail.url, alt: `Thumbnail for ${title}` }]
              : [];

            return (
              <ContentCard
                key={title}
                type="video"
                size="small"
                title={title}
                thumbnails={thumbnails}
              />
            );
          })}
          <ShowMoreShowLess
            showMore={showAllVideos}
            onClick={() => setShowAllVideos(!showAllVideos)}
          />
        </div>
      ) : null}
      <Button
        className={styles.addBtn}
        category="success"
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        Add to Library
      </Button>
    </div>
  );
};

export default YoutubeConfirmation;
