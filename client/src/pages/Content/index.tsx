import React, { useState } from "react";
import { Navbar, MainContainer } from "../../components";
// API
import { useFetchIndividualNewtContent } from "../../api/newtContent";
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

  const { data, status, error } = useFetchIndividualNewtContent(contentId);

  console.log(data);

  const handleTakeQuiz = () => {
    setShowQuizModal(true);
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
                title={data.name}
                type={data.type}
                source={data.source?.name}
                mediaId={data.source?.mediaId}
                description={data.description}
                hasQuiz={data.quizId ? true : false}
                onTakeQuiz={handleTakeQuiz}
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
      <QuizModal showModal={showQuizModal} />
    </section>
  );
};

export default ContentPage;
