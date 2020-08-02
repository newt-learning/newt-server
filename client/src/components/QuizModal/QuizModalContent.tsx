import React from "react";
// Sections
import QuizIntro from "./QuizIntro";
// Components
import Modal from "react-bootstrap/Modal";
import Button from "../Button";

type CurrentSection = "intro" | "questions" | "outro";

interface QuizModalContentProps {
  currentSection: CurrentSection;
  quizName: string;
  numQuestions: number;
  onClickBegin: () => void;
  onCloseModal: () => void;
}

const QuizModalContent = ({
  currentSection,
  quizName,
  numQuestions,
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
        return "Questions";
      case "outro":
        return "Outro";
      default:
        return "Introo";
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
