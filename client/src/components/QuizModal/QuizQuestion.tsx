import React from "react";
// Types
import { QuizQuestionProps } from "./quizModalTypes";
// Components
import Button from "../Button";
import styles from "./QuizModal.module.css";
// Helpers
import { setOptionClass } from "./helpers";

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
  onClickOption,
  onClickNext,
  onClickBack,
  onClickSummary,
  isQuizComplete,
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
              onClick={(e) => (optionChosen ? null : onClickOption(e))}
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
      <div className={styles.actionButtonGroup}>
        {/* Don't show back button if it's the first question */}
        {currentQuestion !== 1 && (
          <Button
            category="secondary"
            style={styles.actionButton}
            onClick={onClickBack}
          >
            Back
          </Button>
        )}
        {/* If it's the last question, render Show Summary button, otherwise
          Next button */}
        {currentQuestion !== numQuestions ? (
          <Button
            category="primary"
            style={styles.actionButton}
            onClick={onClickNext}
          >
            Next
          </Button>
        ) : (
          <Button
            category="primary"
            style={styles.actionButton}
            onClick={onClickSummary}
            isDisabled={!isQuizComplete}
          >
            Show Summary
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
