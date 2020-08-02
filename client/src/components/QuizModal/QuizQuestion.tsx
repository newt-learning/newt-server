import React from "react";
import { QuizQuestionType } from "./quizModalTypes";
import styles from "./QuizModal.module.css";
// Helpers
import { setOptionClass } from "./helpers";

interface QuizQuestionProps {
  currentQuestion: number;
  numQuestions: number;
  questionInfo: QuizQuestionType;
}

const QuizQuestion = ({
  currentQuestion,
  numQuestions,
  questionInfo: {
    question,
    options,
    correctAnswer,
    optionChosen,
    isChoiceCorrect,
  },
}: QuizQuestionProps) => {
  return (
    <div className={styles.quizBody}>
      <p
        className={styles.light}
      >{`Question ${currentQuestion}/${numQuestions}`}</p>
      <h4 className={styles.question}>{question}</h4>
      <ol type="A" className={styles.optionsGroup}>
        {options.map((option) => (
          <div key={option.option} className={styles.listGroup}>
            <li
              // If the option chosen is the same as the current option, set UI
              // based on whether the option chosen is correct or wrong
              className={setOptionClass(
                option.option,
                optionChosen,
                correctAnswer,
                isChoiceCorrect
              )}
              onClick={() => console.log("option clicked")}
            >
              {option.option}
            </li>
            {/* Display the answer explanation if an option has been chosen and
        an explanation exists */}
            {optionChosen && option.explanation && (
              <p className={styles.explanation}>{option.explanation}</p>
            )}
          </div>
        ))}
      </ol>
    </div>
  );
};

export default QuizQuestion;
