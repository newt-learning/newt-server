import React from "react";
import { QuizIntroProps } from "./quizModalTypes";
import styles from "./QuizModal.module.css";
import Button from "../Button";

const QuizIntro = ({ message, numQuestions, onClickBegin }: QuizIntroProps) => {
  return (
    <div className={styles.quizBody}>
      <p>{message}</p>
      <p className={styles.light}>{`Total Questions: ${numQuestions}`}</p>
      <Button
        category="primary"
        style={styles.beginButton}
        onClick={onClickBegin}
      >
        Begin
      </Button>
    </div>
  );
};

QuizIntro.defaultProps = {
  message: "Whenever you're ready, click the button to begin the quiz.",
};

export default QuizIntro;
