import React from "react";
import styles from "./QuizModal.module.css";

interface QuizQuestionProps {
  currentQuestion: number;
  numQuestions: number;
}

const QuizQuestion = ({ currentQuestion, numQuestions }: QuizQuestionProps) => {
  return (
    <div className={styles.quizBody}>
      <p
        className={styles.light}
      >{`Question ${currentQuestion}/${numQuestions}`}</p>
    </div>
  );
};

export default QuizQuestion;
