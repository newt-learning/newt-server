import React from "react";
// API
import { useFetchNewtQuiz } from "../../api/newtContent";
// Components
import Modal from "react-bootstrap/Modal";
import Button from "../Button";

interface QuizModalProps {
  showModal: boolean;
  quizId: string;
  quizName: string;
  onCloseModal: () => void;
}

const QuizModal = ({
  showModal,
  quizId,
  quizName,
  onCloseModal,
}: QuizModalProps) => {
  const { status, data } = useFetchNewtQuiz(quizId);

  console.log("status: ", status);
  console.log("data: ", data);

  return (
    <Modal show={showModal} size="lg" backdrop="static" animation={false}>
      <Modal.Header>{quizName}</Modal.Header>
      <Modal.Body>Body</Modal.Body>
      <Modal.Footer>
        <Button category="secondary" onClick={onCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizModal;
