import React from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
// API
import {
  useFetchIndividualNewtContentBySlug,
  useFetchNewtQuiz,
} from "../../api/newtContent";
import { useCreateContentV2 } from "../../api/content";
// Components
import { Link } from "react-router-dom";
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
import { useMetaTags, useTakeQuiz } from "../../hooks";
// Styling
import styles from "./Content.module.css";

const ContentPage = () => {
  // Get content name slug from URL parameters
  // @ts-ignore
  const { contentNameSlug } = useParams();

  // Toasts
  const { addToast } = useToasts();

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

  const {
    quiz,
    showQuizModal,
    handleTakeQuiz,
    handleCompleteQuiz,
    quizState,
    closeQuizModal,
  } = useTakeQuiz(quizData);

  const handleAddToLibrary = async () => {
    const formattedContent = formatNewtContent(data);

    await createContent(formattedContent, {
      // Toast notifications on success and error
      onSuccess: () =>
        addToast(
          <div>
            {`${data?.name} has been added to your `}
            <Link
              to="/shelves/want-to-learn"
              style={{
                color: "var(--lightGreen-900)",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Want to Learn shelf
            </Link>
          </div>,
          {
            appearance: "success",
          }
        ),
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
                quizState={quizState}
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
        onCloseModal={closeQuizModal}
        showReview={quizState === "review"}
        onComplete={handleCompleteQuiz}
      />
    </section>
  );
};

export default ContentPage;
