import React, { useState } from "react";
import _ from "lodash";
import classnames from "classnames/bind";
// Components
import { Button, Badge } from "../../components";
import BookSection from "./BookSection";
import ChangeShelfForm from "./ChangeShelfForm";
import ShowMoreShowLess from "./ShowMoreShowLess";
import TopicCard from "../Topics/TopicCard";
import Modal from "react-bootstrap/Modal";
// Styling
import styles from "./ContentFlow.module.css";
// Helpers
import { shortenText } from "../Shelves/helpers";

let cx = classnames.bind(styles);

type TopicType =
  | {
      _id: string;
      name: string;
    }
  | string;
interface ContentFlowProps {
  id: string;
  title: string;
  type: string;
  shelf: "Currently Learning" | "Want to Learn" | "Finished Learning";
  authors?: string[];
  topics?: TopicType[];
  source?: string;
  mediaId?: string;
  thumbnailUrl?: string;
  description?: string;
  bookInfo?: {
    pageCount: number | undefined;
    pagesRead: number | undefined;
  };
  hasQuiz?: boolean;
  onTakeQuiz?: () => void;
  buttonText?: string;
  variant: "default" | "inbox"; // No container styling for inbox
}

const ContentFlow = ({
  id,
  title,
  authors,
  type,
  shelf,
  topics,
  source,
  mediaId,
  thumbnailUrl,
  description,
  bookInfo,
  hasQuiz,
  onTakeQuiz,
  buttonText,
  variant,
}: ContentFlowProps) => {
  const [showChangeShelfModal, setShowChangeShelfModal] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Render a new iframe each time because if I just change src, it affects browser
  // history (clicking the back button cycles through previous iframes)
  const IFrame = ({ title, src }: any) => (
    <iframe
      id="ytplayer"
      title={title}
      width="640"
      height="360"
      src={src}
      frameBorder="0"
      allowFullScreen
    />
  );

  return (
    <div
      className={cx({
        container: true,
        inbox: variant === "inbox",
      })}
    >
      {title ? (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            {title}{" "}
            {/* Do this a better way where there's type-checking AND I can just pass data.
              Might have to set types for all the data */}
            <Badge variant={shelf ? shelf : "default"}>{shelf}</Badge>
          </h2>
        </div>
      ) : null}
      <div className={styles.flowContainer}>
        {/* If video, display Watch video instruction */}
        {type === "video" ? (
          <h4 className={styles.instruction}>1. Watch the video</h4>
        ) : null}
        {/* If video and from youtube, embed video */}
        {type === "video" && source?.toLowerCase() === "youtube" ? (
          <div className={styles.videoContainer}>
            <IFrame
              title={title}
              src={`https://www.youtube.com/embed/${mediaId}`}
            />
          </div>
        ) : // Otherwise, if it's a book, show Book Section
        type === "book" ? (
          <BookSection
            id={id}
            title={title}
            thumbnailUrl={thumbnailUrl}
            authors={authors}
            pageCount={bookInfo?.pageCount}
            pagesRead={bookInfo?.pagesRead || 0}
          />
        ) : null}
        {/* Shelf info */}
        {shelf ? (
          <div>
            <h4 className={styles.subheading}>Shelf</h4>
            <div className={styles.shelfContainer}>
              <Badge variant={shelf ? shelf : "default"} size="large">
                {shelf}
              </Badge>
              <Button
                category="secondary"
                onClick={() => setShowChangeShelfModal(true)}
              >
                Change Shelf
              </Button>
            </div>
            <p></p>
          </div>
        ) : null}
        {/* Topics */}
        {topics && typeof topics[0] !== "string" ? (
          <>
            <h4 className={styles.subheading}>Topics</h4>
            <div className={styles.topics}>
              {_.map(topics, (topic) => {
                return typeof topic === "string" ? null : (
                  <TopicCard
                    key={topic._id}
                    variant="pill"
                    id={topic._id}
                    name={topic.name}
                  />
                );
              })}
            </div>
          </>
        ) : null}
        {/* Display description if it's there */}
        {description ? (
          <>
            <h4 className={styles.subheading}>Description</h4>
            <p className={styles.description}>
              {showMore ? description : shortenText(description, 400)}
              <ShowMoreShowLess
                showMore={showMore}
                onClick={() => setShowMore(!showMore)}
              />
            </p>
          </>
        ) : null}
        {/* If there's a quiz available, show button to take/view it */}
        {hasQuiz ? (
          <>
            <h4 className={styles.instruction}>2. Check your understanding</h4>
            <div className={styles.btnContainer}>
              <Button
                category="primary"
                style={styles.quizBtn}
                onClick={onTakeQuiz}
              >
                {buttonText}
              </Button>
            </div>
          </>
        ) : null}
      </div>
      <Modal
        show={showChangeShelfModal}
        onHide={() => setShowChangeShelfModal(false)}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>Update Progress</Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChangeShelfForm
            initialValues={{ shelf }}
            onSubmit={(values) => console.log(values)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

ContentFlow.defaultProps = {
  buttonText: "Take the quiz",
  variant: "default",
};

export default ContentFlow;
