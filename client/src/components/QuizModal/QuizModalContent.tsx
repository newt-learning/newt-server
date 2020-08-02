import React from "react";
// Sections
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
// Components
import Modal from "react-bootstrap/Modal";
import Button from "../Button";

type CurrentSection = "intro" | "questions" | "outro";

interface QuizModalContentProps {
  currentSection: CurrentSection;
  quizName: string;
  numQuestions: number;
  currentQuestion: number;
  onClickBegin: () => void;
  onCloseModal: () => void;
}

const QuizModalContent = ({
  currentSection,
  quizName,
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
        return (
          <QuizQuestion
            currentQuestion={currentQuestion}
            numQuestions={numQuestions}
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
