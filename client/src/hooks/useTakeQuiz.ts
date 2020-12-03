import { useState, useEffect } from "react";
import { QuizQuestionType } from "../components/QuizModal/quizModalTypes";

function useTakeQuiz(quizData: any) {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (quizData) {
      setQuiz(quizData);
    }
  }, [quizData]);

  const handleTakeQuiz = () => {
    setShowQuizModal(true);
    setQuizStarted(true);
  };

  const handleCompleteQuiz = (results: QuizQuestionType[]) => {
    setShowReview(true);
    // @ts-ignore
    setQuiz({ ...quiz, questions: results });
  };

  return {
    quiz,
    showQuizModal,
    handleTakeQuiz,
    handleCompleteQuiz,
    showReview,
    hasQuizStarted: quizStarted,
    closeQuizModal: () => setShowQuizModal(false),
  };
}

export default useTakeQuiz;
