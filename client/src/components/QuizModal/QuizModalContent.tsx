import React from "react";
// Types
import { QuizModalContentProps, CurrentSection } from "./quizModalTypes";
// Sections
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
import QuizOutro from "./QuizOutro";
// Components
import Modal from "react-bootstrap/Modal";
import Button from "../Button";
// Styling
import styles from "./QuizModal.module.css";

const QuizModalContent = ({
  currentSection,
  quizName,
  quizQuestions,
  numQuestions,
  currentQuestion,
  onClickBegin,
  onClickOption,
  onClickNext,
  onClickBack,
  onClickSummary,
  isQuizComplete,
  showReview,
  onCloseModal,
}: QuizModalContentProps) => {
  const renderQuizBody = (currentSection: CurrentSection) => {
    switch (currentSection) {
      case "intro":
        return (
          <QuizIntro numQuestions={numQuestions} onClickBegin={onClickBegin} />
        );
      case "questions":
        const questionInfo = quizQuestions[currentQuestion - 1];
        return (
          <QuizQuestion
            currentQuestion={currentQuestion}
            numQuestions={numQuestions}
            questionInfo={questionInfo}
            onClickOption={onClickOption}
            onClickNext={onClickNext}
            onClickBack={onClickBack}
            onClickSummary={onClickSummary}
            isQuizComplete={isQuizComplete}
          />
        );
      case "outro":
        return <QuizOutro />;
      default:
        return "Intro";
    }
  };

  return (
    <>
      <Modal.Header>{quizName}</Modal.Header>
      <Modal.Body>{renderQuizBody(currentSection)}</Modal.Body>
      <Modal.Footer>
        {!(currentSection === "outro" && !showReview) && (
          <Button category="secondary" onClick={onCloseModal}>
            Close
          </Button>
        )}
        {/* Show Finish button in outro section, unless it's in review */}
        {currentSection === "outro" && !showReview && (
          <Button
            category="primary"
            style={
              isQuizComplete
                ? styles.finishButton
                : `${styles.finishButton} ${styles.disabledButton}`
            }
            onClick={onCloseModal}
            isDisabled={!isQuizComplete}
          >
            Finish
          </Button>
        )}
      </Modal.Footer>
    </>
  );
};

export default QuizModalContent;
