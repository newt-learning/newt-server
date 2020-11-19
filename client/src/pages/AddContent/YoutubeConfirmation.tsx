import React, { useState } from "react";
import _ from "lodash";
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

interface YoutubeConfirmationProps {
  dataType: "video" | "playlist"; // Youtube data type
  data: any;
  onBack: () => void;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
}
interface VideoConfirmationProps {
  data: any;
  onBack: () => void;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
}

const VideoConfirmation = ({
  data,
  onBack,
  onSubmit,
  isLoading,
}: VideoConfirmationProps) => {
  const [showMore, setShowMore] = useState(false);
  const [shelf, setShelf] = useState("Want to Learn");
  const [startDate, setStartDate] = useState<any>(new Date());
  const [finishDate, setFinishDate] = useState<any>(new Date());

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
      <Button
        className={styles.addBtn}
        category="success"
        isLoading={isLoading}
        onClick={() =>
          onSubmit({
            videoInfo: data,
            shelf,
            playlists: [],
            startDate,
            finishDate,
          })
        }
      >
        Add to Library
      </Button>
    </>
  );
};

const SeriesConfirmation = ({
  data,
  onBack,
  onSubmit,
  isLoading,
}: VideoConfirmationProps) => {
  const [showMore, setShowMore] = useState(false);
  const [shelf, setShelf] = useState("Want to Learn");
  const [startDate, setStartDate] = useState<any>(new Date());
  const [finishDate, setFinishDate] = useState<any>(new Date());

  const { name, authors, description, videos } = data;

  const numOfVideos = videos.length;
  const initialVideosToRender = numOfVideos > 2 ? 2 : numOfVideos;
  // Toggle between seeing first 2 or all videos
  const [showAllVideos, setShowAllVideos] = useState(false);
  const displayVideos = showAllVideos
    ? videos
    : videos.slice(0, initialVideosToRender);

  // Get the first 3 thumbnail URLs to display in the stacked image
  const thumbnailUrls = getFirstThreeThumbnailsForSeries(videos, "YouTube");

  return (
    <>
      <div className={styles.navContainer}>
        <FiArrowLeft size={20} className={styles.backArrow} onClick={onBack} />
        <h3>Confirm Series</h3>
      </div>
      <StackedImages
        imageUrls={thumbnailUrls}
        containerStyle={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
        }}
      />
      <h3 className={styles.title}>{name}</h3>
      <p className={styles.creator}>{authors.join(", ")}</p>
      <p className={styles.creator}>
        {videos ? `${numOfVideos} videos` : null}
      </p>
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
      <h4 className={styles.subheader}>Videos</h4>
      {/* Show videos in Series */}
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
        onClick={() =>
          onSubmit({
            seriesInfo: data,
            shelf,
            startDate,
            finishDate,
          })
        }
      >
        Add to Library
      </Button>
    </>
  );
};

const YoutubeConfirmation = ({
  dataType,
  data,
  onBack,
  onSubmit,
  isLoading,
}: YoutubeConfirmationProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {dataType === "video" ? (
        <VideoConfirmation
          data={data}
          onBack={onBack}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      ) : (
        <SeriesConfirmation
          data={data}
          onBack={onBack}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default YoutubeConfirmation;
