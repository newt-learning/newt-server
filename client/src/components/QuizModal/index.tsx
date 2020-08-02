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
  const [quizResults, setQuizResults] = useState(quiz?.questions);
  const [currentSection, setCurrentSection] = useState<CurrentSection>("intro");
  const [numQuestions, setNumQuestions] = useState(
    quiz?.questions?.length ?? 0
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (quiz) {
      setNumQuestions(quiz.questions.length);
      setQuizResults(quiz.questions);
    }
  }, [quiz]);

  const handleBeginQuiz = () => {
    setCurrentSection("questions");
    setCurrentQuestion(1);
  };

  return (
    <Modal show={showModal} size="lg" backdrop="static" animation={false}>
      <QuizModalContent
        currentSection={currentSection}
        quizName={quizName}
        numQuestions={numQuestions}
        onClickBegin={handleBeginQuiz}
        onCloseModal={onCloseModal}
      />
    </Modal>
  );
};

export default QuizModal;
