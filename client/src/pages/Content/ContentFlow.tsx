import React from "react";
import classnames from "classnames/bind";
import { Button } from "../../components";
import styles from "./ContentFlow.module.css";
import Skeleton from "react-loading-skeleton";

let cx = classnames.bind(styles);

interface ContentFlowProps {
  id: string;
  title: string;
  type: string;
  authors?: string[];
  source?: string;
  mediaId?: string;
  thumbnailUrl?: string;
  description?: string;
  hasQuiz?: boolean;
  onTakeQuiz?: () => void;
  buttonText?: string;
  variant: "default" | "inbox"; // No container styling for inbox
  isLoading?: boolean;
}

const ContentFlow = ({
  id,
  title,
  type,
  source,
  mediaId,
  description,
  hasQuiz,
  onTakeQuiz,
  buttonText,
  variant,
  isLoading,
}: ContentFlowProps) => {
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
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}
      <div className={styles.flowContainer}>
        {type === "video" ? (
          <h4 className={styles.instruction}>1. Watch the video</h4>
        ) : null}
        {type === "video" && source?.toLowerCase() === "youtube" ? (
          <div className={styles.videoContainer}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <IFrame
                title={title}
                src={`https://www.youtube.com/embed/${mediaId}`}
              />
            )}
          </div>
        ) : null}
        {description ? (
          <>
            <h4 className={styles.subheading}>Description</h4>
            <p className={styles.description}>
              {isLoading ? <Skeleton count={3} /> : description}
            </p>
          </>
        ) : null}
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
    </div>
  );
};

ContentFlow.defaultProps = {
  buttonText: "Take the quiz",
  variant: "default",
};

export default ContentFlow;
