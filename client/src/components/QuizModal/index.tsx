import React, { useState, useEffect } from "react";
// Types
import { Quiz, CurrentSection, QuizQuestionType } from "./quizModalTypes";
// Components
import Modal from "react-bootstrap/Modal";
import QuizModalContent from "./QuizModalContent";

interface QuizModalProps {
  showModal: boolean;
  quiz: Quiz;
  quizName: string;
  onCloseModal: () => void;
}

const QuizModal = ({
  showModal,
  quizName,
  quiz,
  onCloseModal,
}: QuizModalProps) => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionType[] | null>(
    quiz?.questions ?? null
  );
  const [currentSection, setCurrentSection] = useState<CurrentSection>("intro");
  const [numQuestions, setNumQuestions] = useState(
    quiz?.questions ? quiz["questions"].length : 0
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (quiz) {
      setNumQuestions(quiz?.questions?.length || 0);
      setQuizQuestions(quiz?.questions ?? null);
    }
  }, [quiz]);

  const handleBeginQuiz = () => {
    setCurrentSection("questions");
    setCurrentQuestion(1);
  };

  if (!quizQuestions) {
    return null;
  }

  return (
    <Modal show={showModal} size="lg" backdrop="static" animation={false}>
      <QuizModalContent
        currentSection={currentSection}
        quizName={quizName}
        quizQuestions={quizQuestions}
        numQuestions={numQuestions}
        currentQuestion={currentQuestion}
        onClickBegin={handleBeginQuiz}
        onCloseModal={onCloseModal}
      />
    </Modal>
  );
};

export default QuizModal;
