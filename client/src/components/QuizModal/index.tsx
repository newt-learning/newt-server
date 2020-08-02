import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
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
  const [showReview, setShowReview] = useState(false);

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

  const handleGoNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };
  const handleGoBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  // Function to update quiz results - record option picked and check if it's right.
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

  const handleShowOutro = () => {
    setCurrentSection("outro");
  };

  // Function to check if the quiz has been completed (all the questions
  // answered) - used to disable Finish button until complete
  const isQuizComplete = (results: QuizQuestionType[]) => {
    // Returns only questions that have been answered (by checking if the object
    // has an `optionChosen` field)
    const isComplete = results.filter((result) =>
      _.has(result, "optionChosen")
    );

    // Checks if the filtered list is the same as the number of questions and
    // returns boolean
    return isComplete.length === numQuestions;
  };

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
        onClickNext={handleGoNext}
        onClickBack={handleGoBack}
        onClickSummary={handleShowOutro}
        isQuizComplete={isQuizComplete(quizQuestions)}
        showReview={showReview}
        onCloseModal={onCloseModal}
      />
    </Modal>
  );
};

export default QuizModal;
