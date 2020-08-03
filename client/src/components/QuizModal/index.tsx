import React, { useState, useEffect } from "react";
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
// Styling
import styles from "./QuizModal.module.css";

const QuizModal = ({
  showModal,
  isLoading,
  hasError,
  quizName,
  quiz,
  onCloseModal,
  showReview,
  onComplete,
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

  const handleFinishQuiz = () => {
    setCurrentSection("intro");
    onCloseModal();
    onComplete(quizQuestions);
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
      {isLoading ? (
        <QuizLoadingOrHasError type="loading" />
      ) : hasError ? (
        <QuizLoadingOrHasError type="error" />
      ) : (
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
          onClickFinish={handleFinishQuiz}
          isQuizComplete={isQuizComplete(quizQuestions)}
          showReview={showReview}
          onCloseModal={onCloseModal}
        />
      )}
    </Modal>
  );
};

interface QuizLoadingOrHasErrorProps {
  type: "loading" | "error";
}

const QuizLoadingOrHasError = ({ type }: QuizLoadingOrHasErrorProps) => (
  <>
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
      <div className={styles.quizBody}>
        {type === "error"
          ? "Sorry, there was an error creating this quiz"
          : "Generating quiz..."}
      </div>
    </Modal.Body>
  </>
);

export default QuizModal;
