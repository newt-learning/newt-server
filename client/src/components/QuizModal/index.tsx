import React from "react";
import Modal from "react-bootstrap/Modal";

interface QuizModalProps {
  showModal: boolean;
}

const QuizModal = ({ showModal }: QuizModalProps) => {
  return (
    <Modal show={showModal} size="lg" backdrop="static" animation={false}>
      <Modal.Header>Modal</Modal.Header>
    </Modal>
  );
};

export default QuizModal;
