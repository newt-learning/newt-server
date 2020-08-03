import React from "react";
import { QuizIntroProps } from "./quizModalTypes";
import styles from "./QuizModal.module.css";
import Button from "../Button";

const QuizIntro = ({
  numQuestions,
  showReview,
  onClickBegin,
}: QuizIntroProps) => {
  const defaultMessage =
    "Whenever you're ready, click the button to begin the quiz.";
  const reviewMessage =
    "Click the button to review your answers from your previous quiz";

  return (
    <div className={styles.quizBody}>
      <p>{showReview ? reviewMessage : defaultMessage}</p>
      <p className={styles.light}>{`Total Questions: ${numQuestions}`}</p>
      <Button
        category="primary"
        style={styles.beginButton}
        onClick={onClickBegin}
      >
        {showReview ? "Review Quiz" : "Begin Quiz"}
      </Button>
    </div>
  );
};

export default QuizIntro;
