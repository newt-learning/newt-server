import React from "react";
import styles from "./QuizModal.module.css";

interface QuizIntroProps {
  message: string;
  numQuestions: number;
}

const QuizIntro = ({ message, numQuestions }: QuizIntroProps) => {
  return (
    <div className={styles.quizBody}>
      <p>{message}</p>
      <p className={styles.light}>{`Total Questions: ${numQuestions}`}</p>
    </div>
  );
};

QuizIntro.defaultProps = {
  message: "Whenever you're ready, click the button to begin the quiz.",
};

export default QuizIntro;
