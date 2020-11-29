import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
// API
import {
  useFetchIndividualNewtContentBySlug,
  useFetchNewtQuiz,
} from "../../api/newtContent";
// Components
import PropagateLoader from "react-spinners/PropagateLoader";
import {
  Navbar,
  MainContainer,
  QuizModal,
  formatNewtContent,
} from "../../components";
// Sections
import ContentFlow from "./ContentFlow";
import ContentInfo from "./ContentInfo";
// Hooks
import useMetaTags from "../../hooks/useMetaTags";
// Styling
import styles from "./Content.module.css";
import { QuizQuestionType } from "../../components/QuizModal/quizModalTypes";
import { useCreateContentV2 } from "../../api/content";

const ContentPage = () => {
  // Get content name slug from URL parameters
  // @ts-ignore
  const { contentNameSlug } = useParams();

  // Toasts
  const { addToast } = useToasts();

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quiz, setQuiz] = useState(null);
  // Used to determine what text to show on the button: if false, say "Take quiz",
  // otherwise "Continue quiz".
  const [quizStarted, setQuizStarted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Fetch content data from slug
  const { data, isLoading, isError } = useFetchIndividualNewtContentBySlug(
    contentNameSlug
  );
  const [createContent] = useCreateContentV2();

  useMetaTags({
    title:
      data?.name && data?.contentCreators
        ? `${data.name} by ${data.contentCreators.map(
            (creator: any) => creator?.name
          )} / Newt`
        : "Discover / Newt",
  });

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

  const handleAddToLibrary = async () => {
    const formattedContent = formatNewtContent(data);

    await createContent(formattedContent, {
      // Toast notifications on success and error
      onSuccess: () =>
        addToast(`${data?.name} has been added to your Library`, {
          appearance: "success",
        }),
      onError: () =>
        addToast(
          `Sorry, there was an error adding the ${
            data?.type ?? "content"
          }. Please try again.`,
          { appearance: "error" }
        ),
    });
  };

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <MainContainer style={styles.container}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <PropagateLoader size={18} color="#86e1ff" loading={isLoading} />
          </div>
        ) : isError ? (
          "Sorry, there was an error"
        ) : data ? (
          <>
            <div className={styles.contentFlowContainer}>
              <ContentFlow
                id={data?._id || data?.id}
                title={data?.name}
                authors={data?.contentCreators?.map(
                  (creator: any) => creator.name
                )}
                type={data?.type}
                shelf={data?.shelf}
                startFinishDates={data.startFinishDates}
                source={data?.source?.name || data?.source}
                mediaId={data.source?.mediaId || data?.sourceId}
                thumbnailUrl={data?.thumbnailUrl}
                // source={data.source}
                // mediaId={data.sourceId}
                description={data?.description}
                hasQuiz={data?.quiz?.id ? true : false}
                onTakeQuiz={handleTakeQuiz}
                buttonText={
                  showReview
                    ? "See results"
                    : quizStarted
                    ? "Continue quiz"
                    : "Take the quiz"
                }
                isLoading={isLoading}
                showOptionsDropdown={false}
                onAddToLibrary={handleAddToLibrary}
              />
            </div>
            <div className={styles.contentInfoContainer}>
              <ContentInfo
                creator={data.contentCreators[0].name}
                partOfSeries={data.partOfSeries}
                seriesName={data.series[0]?.name}
                contentCreatorSlug={data.contentCreators[0].slug}
                seriesSlug={data.series[0]?.slug}
                isLoading={isLoading}
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
