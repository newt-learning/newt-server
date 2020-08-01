import React from "react";
// API
import { useFetchNewtQuiz } from "../../api/newtContent";
// Components
import Modal from "react-bootstrap/Modal";
import Button from "../Button";

interface QuizModalProps {
  showModal: boolean;
  quiz: object | null;
  quizName: string;
  onCloseModal: () => void;
}

const QuizModal = ({
  showModal,
  quizName,
  quiz,
  onCloseModal,
}: QuizModalProps) => {
  return (
    <Modal show={showModal} size="lg" backdrop="static" animation={false}>
      <Modal.Header>{quizName}</Modal.Header>
      <Modal.Body>{JSON.stringify(quiz)}</Modal.Body>
      <Modal.Footer>
        <Button category="secondary" onClick={onCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizModal;
