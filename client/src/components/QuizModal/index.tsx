import React, { useState } from "react";
// Components
import Modal from "react-bootstrap/Modal";
import QuizModalContent from "./QuizModalContent";

interface QuizModalProps {
  showModal: boolean;
  quiz: object | null;
  quizName: string;
  onCloseModal: () => void;
}

type CurrentSection = "intro" | "questions" | "outro";

const QuizModal = ({
  showModal,
  quizName,
  quiz,
  onCloseModal,
}: QuizModalProps) => {
  const [currentSection, setCurrentSection] = useState<CurrentSection>("intro");

  return (
    <Modal show={showModal} size="lg" backdrop="static" animation={false}>
      <QuizModalContent
        currentSection={currentSection}
        quizName={quizName}
        onCloseModal={onCloseModal}
      />
    </Modal>
  );
};

export default QuizModal;
