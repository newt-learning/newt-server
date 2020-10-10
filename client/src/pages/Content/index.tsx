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
  } = useFetchNewtQuiz(data?.quiz?.id);

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
    <section style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <MainContainer style={styles.container}>
        {error ? (
          "Sorry, there was an error"
        ) : data ? (
          <>
            <div className={styles.contentFlowContainer}>
              <ContentFlow
                id={data.id}
                title={data.name}
                authors={data?.contentCreators?.map(
                  (creator: any) => creator.name
                )}
                type={data.type}
                thumbnailUrl={data?.thumbnailUrl}
                source={data.source}
                mediaId={data.sourceId}
                description={data.description}
                hasQuiz={data.quiz?.id ? true : false}
                onTakeQuiz={handleTakeQuiz}
                buttonText={
                  showReview
                    ? "See results"
                    : quizStarted
                    ? "Continue quiz"
                    : "Take the quiz"
                }
                isLoading={status === "loading"}
              />
            </div>
            <div className={styles.contentInfoContainer}>
              <ContentInfo
                creator={data.contentCreators[0].name}
                partOfSeries={data.partOfSeries}
                seriesName={data.series[0]?.name}
                contentCreatorSlug={data.contentCreators[0].slug}
                seriesSlug={data.series[0]?.slug}
                isLoading={status === "loading"}
              />
            </div>
          </>
        ) : null}
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
