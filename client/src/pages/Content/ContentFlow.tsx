import React from "react";
import classnames from "classnames/bind";
import { Button } from "../../components";
import styles from "./ContentFlow.module.css";

let cx = classnames.bind(styles);

interface ContentFlowProps {
  title: string;
  type: string;
  source?: string;
  mediaId?: string;
  description?: string;
  hasQuiz?: boolean;
  onTakeQuiz?: () => void;
  buttonText?: string;
  variant: "default" | "inbox"; // No container styling for inbox
}

const ContentFlow = ({
  title,
  type,
  source,
  mediaId,
  description,
  hasQuiz,
  onTakeQuiz,
  buttonText,
  variant,
}: ContentFlowProps) => {
  console.log(title);

  return (
    <div
      className={cx({
        container: true,
        inbox: variant === "inbox",
      })}
    >
      {title ? (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      ) : null}
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
        {description ? (
          <>
            <h4 className={styles.subheading}>Description</h4>
            <p className={styles.description}>{description}</p>
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
