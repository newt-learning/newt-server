import React, { useState, useEffect } from "react";
import _ from "lodash";
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

interface TopicContentData {
  _id: string;
  name: string;
}

const IndividualTopicPage = () => {
  const { topicId } = useParams();
  const [currentContent, setCurrentContent] = useState<any | null>(null);

  const { isLoading, data, isError } = useFetchTopic(topicId);

  useEffect(() => {
    if (!_.isEmpty(data?.content)) {
      setCurrentContent(data.content[0]);
    }
  }, [data]);

  console.log(currentContent?.name);

  return (
    <AppMainContainer className={styles.mainContainer}>
      <AppHeaderContainer>
        <h2>{data ? data.name : "..."}</h2>
      </AppHeaderContainer>
      <AppContentContainer className={styles.contentContainer}>
        <div className={styles.contentList}>
          {data?.content.map(
            ({ _id, name }: TopicContentData, index: number) => (
              <div
                key={_id}
                className={styles.listCard}
                onClick={() => setCurrentContent(data.content[index])}
              >
                {name}
              </div>
            )
          )}
        </div>
        <div className={styles.contentDetails}>{currentContent?.name}</div>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default IndividualTopicPage;
