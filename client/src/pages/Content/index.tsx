import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// API
import {
  useFetchIndividualNewtContentBySlug,
  useFetchNewtQuiz,
} from "../../api/newtContent";
// Components
import { Navbar, MainContainer, QuizModal } from "../../components";
// Sections
import ContentFlow from "./ContentFlow";
import ContentInfo from "./ContentInfo";
// Styling
import styles from "./Content.module.css";
import { QuizQuestionType } from "../../components/QuizModal/quizModalTypes";

const ContentPage = () => {
  // Get content name slug from URL parameters
  // @ts-ignore
  const { contentNameSlug } = useParams();

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quiz, setQuiz] = useState(null);
  // Used to determine what text to show on the button: if false, say "Take quiz",
  // otherwise "Continue quiz".
  const [quizStarted, setQuizStarted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Fetch content data from slug
  const { data, status, error } = useFetchIndividualNewtContentBySlug(
    contentNameSlug
  );
  const {
    data: quizData,
    isLoading: isQuizLoading,
    isError: isQuizError,
  } = useFetchNewtQuiz(data?.quizId);

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

  return (
    <section>
      <Navbar />
      <MainContainer style={styles.container}>
        {status === "loading" ? (
          "Loading..."
        ) : error ? (
          "Sorry, there was an error"
        ) : (
          <>
            <div className={styles.contentFlowContainer}>
              <ContentFlow
                id={data._id}
                title={data.name}
                type={data.type}
                shelf={data.shelf}
                startFinishDates={data.startFinishDates}
                source={data.source?.name}
                mediaId={data.source?.mediaId}
                description={data.description}
                hasQuiz={data.quizId ? true : false}
                onTakeQuiz={handleTakeQuiz}
                buttonText={
                  showReview
                    ? "See results"
                    : quizStarted
                    ? "Continue quiz"
                    : "Take the quiz"
                }
              />
            </div>
            <div className={styles.contentInfoContainer}>
              <ContentInfo
                creator={data.contentCreator?.name}
                partOfSeries={data.partOfSeries}
                seriesName={data.series?.name}
              />
            </div>
          </>
        )}
      </MainContainer>
      <QuizModal
        showModal={showQuizModal}
        isLoading={isQuizLoading}
        hasError={isQuizError}
        quiz={quiz}
        quizName={data ? `Quiz for ${data.name}` : "Quiz"}
        onCloseModal={() => setShowQuizModal(false)}
        showReview={showReview}
        onComplete={handleCompleteQuiz}
      />
    </section>
  );
};

export default ContentPage;
