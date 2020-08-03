import React, { useState, useEffect } from "react";
import { Navbar, MainContainer } from "../../components";
// API
import {
  useFetchIndividualNewtContent,
  useFetchNewtQuiz,
} from "../../api/newtContent";
// Components
import { QuizModal } from "../../components";
// Sections
import ContentFlow from "./ContentFlow";
import ContentInfo from "./ContentInfo";
// Styling
import styles from "./Content.module.css";

interface ContentPageProps {
  location?: any;
}

const ContentPage = ({ location }: ContentPageProps) => {
  const { contentId } = location.state;

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quiz, setQuiz] = useState(null);
  // Used to determine what text to show on the button: if false, say "Take quiz",
  // otherwise "Continue quiz".
  const [quizStarted, setQuizStarted] = useState(false);

  const { data, status, error } = useFetchIndividualNewtContent(contentId);
  const {
    data: quizData,
    status: quizStatus,
    error: quizError,
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

  console.log(quiz);

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
                title={data.name}
                type={data.type}
                source={data.source?.name}
                mediaId={data.source?.mediaId}
                description={data.description}
                hasQuiz={data.quizId ? true : false}
                onTakeQuiz={handleTakeQuiz}
                buttonText={quizStarted ? "Continue quiz" : "Take the quiz"}
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
        quiz={quiz}
        quizName={data ? `Quiz for ${data.name}` : "Quiz"}
        onCloseModal={() => setShowQuizModal(false)}
      />
    </section>
  );
};

export default ContentPage;
