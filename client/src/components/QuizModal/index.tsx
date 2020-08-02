import React, { useState, useEffect, useRef } from "react";
// Types
import {
  QuizModalProps,
  CurrentSection,
  QuizQuestionType,
} from "./quizModalTypes";
// Components
import Modal from "react-bootstrap/Modal";
import QuizModalContent from "./QuizModalContent";

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

  const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>) => {
    // event.preventDefault();
    const newResults = quizQuestions ? [...quizQuestions] : null;

    // Get value of the text of the option selected
    // @ts-ignore
    const optionChosen = event.target.innerText;

    // Check if it's the same as the correct answer
    const isChoiceCorrect = newResults
      ? optionChosen === newResults[currentQuestion - 1].correctAnswer
      : undefined;

    // Add the two data points to the result object
    if (newResults) {
      newResults[currentQuestion - 1].optionChosen = optionChosen;
      newResults[currentQuestion - 1].isChoiceCorrect = isChoiceCorrect;
    }

    setQuizQuestions(newResults);
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
        onClickOption={handleOptionClick}
        onCloseModal={onCloseModal}
      />
    </Modal>
  );
};

export default QuizModal;
