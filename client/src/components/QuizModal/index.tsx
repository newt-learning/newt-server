import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../Button";

interface QuizModalProps {
  showModal: boolean;
  quizName: string;
  onCloseModal: () => void;
}

const QuizModal = ({ showModal, quizName, onCloseModal }: QuizModalProps) => {
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
