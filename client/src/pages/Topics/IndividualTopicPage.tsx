import React from "react";
import { useParams } from "react-router-dom";
// API
import { useFetchTopic } from "../../api/topics";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
} from "../../components";
// Styling
import styles from "./IndividualTopicPage.module.css";

const IndividualTopicPage = () => {
  const { topicId } = useParams();

  const { isLoading, data, isError } = useFetchTopic(topicId);

  console.log(isLoading, data);

  return (
    <AppMainContainer className={styles.mainContainer}>
      <AppHeaderContainer>
        <h2>{data ? data.name : "..."}</h2>
      </AppHeaderContainer>
      <AppContentContainer className={styles.contentContainer}>
        <div className={styles.contentList}>
          {data?.content.map((item: string) => (
            <div className={styles.listCard}>{item}</div>
          ))}
        </div>
        <div className={styles.contentDetails}></div>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default IndividualTopicPage;
