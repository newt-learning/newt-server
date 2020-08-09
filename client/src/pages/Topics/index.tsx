import React from "react";
// API
import { useFetchAllTopics } from "../../api/topics";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
} from "../../components";
import TopicCard from "./TopicCard";
// Styling
import styles from "./Topics.module.css";

interface TopicData {
  _id: string;
  name: string;
}

const TopicsPage = () => {
  const { data, status, error } = useFetchAllTopics();

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Topics</h2>
      </AppHeaderContainer>
      <AppContentContainer className={styles.container}>
        {status === "loading"
          ? "Loading..."
          : error
          ? "Error"
          : data.map(({ _id, name }: TopicData) => (
              <TopicCard key={_id} id={_id} name={name} />
            ))}
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default TopicsPage;
