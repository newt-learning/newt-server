import React from "react";
import { QuizQuestionType } from "./quizModalTypes";
import styles from "./QuizModal.module.css";

interface QuizQuestionProps {
  currentQuestion: number;
  numQuestions: number;
  questionInfo: QuizQuestionType | null;
}

const QuizQuestion = ({
  currentQuestion,
  numQuestions,
  questionInfo,
}: QuizQuestionProps) => {
  return (
    <div className={styles.quizBody}>
      <p
        className={styles.light}
      >{`Question ${currentQuestion}/${numQuestions}`}</p>
      <div>{JSON.stringify(questionInfo)}</div>
    </div>
  );
};

export default QuizQuestion;
