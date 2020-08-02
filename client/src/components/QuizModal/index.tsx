import React, { useState, useEffect } from "react";
// Components
import Modal from "react-bootstrap/Modal";
import QuizModalContent from "./QuizModalContent";

type Quiz = {
  _id: string;
  contentId: string;
  questions: [object];
} | null;

interface QuizModalProps {
  showModal: boolean;
  quiz: Quiz;
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
  const [numQuestions, setNumQuestions] = useState(
    quiz?.questions?.length ?? 0
  );

  useEffect(() => {
    if (quiz) {
      setNumQuestions(quiz.questions.length);
    }
  }, [quiz]);

  return (
    <Modal show={showModal} size="lg" backdrop="static" animation={false}>
      <QuizModalContent
        currentSection={currentSection}
        quizName={quizName}
        numQuestions={numQuestions}
        onCloseModal={onCloseModal}
      />
    </Modal>
  );
};

export default QuizModal;
