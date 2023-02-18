import { useState, useEffect } from "react";
import { QuizQuestionType } from "../components/QuizModal/quizModalTypes";

export type QuizState = "begin" | "in-progress" | "review";

function useTakeQuiz(quizData: any) {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [quizState, setQuizState] = useState<QuizState>("begin");

  useEffect(() => {
    if (quizData) {
      setQuiz(quizData);
    }
  }, [quizData]);

  const handleTakeQuiz = () => {
    setShowQuizModal(true);
    if (quizState !== "review") {
      setQuizState("in-progress");
    }
  };

  const handleCompleteQuiz = (results: QuizQuestionType[]) => {
    setQuizState("review");
    // @ts-ignore
    setQuiz({ ...quiz, questions: results });
  };

  return {
    quiz,
    showQuizModal,
    handleTakeQuiz,
    handleCompleteQuiz,
    quizState,
    closeQuizModal: () => setShowQuizModal(false),
  };
}

export default useTakeQuiz;
