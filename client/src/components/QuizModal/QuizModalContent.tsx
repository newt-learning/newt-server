import React from "react";
// Types
import { QuizModalContentProps, CurrentSection } from "./quizModalTypes";
// Sections
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
// Components
import Modal from "react-bootstrap/Modal";
import Button from "../Button";

const QuizModalContent = ({
  currentSection,
  quizName,
  quizQuestions,
  numQuestions,
  currentQuestion,
  onClickBegin,
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
          />
        );
      case "outro":
        return "Outro";
      default:
        return "Intro";
    }
  };

  return (
    <>
      <Modal.Header>{quizName}</Modal.Header>
      <Modal.Body>{renderQuizBody(currentSection)}</Modal.Body>
      <Modal.Footer>
        <Button category="secondary" onClick={onCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};

export default QuizModalContent;
