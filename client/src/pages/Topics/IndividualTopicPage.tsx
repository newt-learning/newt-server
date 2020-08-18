import React, { useState } from "react";
import _ from "lodash";
import { useParams, useLocation } from "react-router-dom";
// API
import { useFetchTopic } from "../../api/topics";
// Components
import { ContentInbox } from "../../components";
import styles from "./Topics.module.css";

interface TopicContentData {
  _id: string;
  name: string;
}

const IndividualTopicPage = () => {
  const { topicId } = useParams();
  const location = useLocation();

  // React router state type stuff was annoying. Couldn't access .name so ¯\_(ツ)_/¯
  const state: any = location.state;

  // If topic name is passed through location state, use it
  const [topicName] = useState(state ? state.name : null);

  const { isLoading, data, isError } = useFetchTopic(topicId);

  return (
    <ContentInbox
      title={topicName ? topicName : data ? data.name : "..."}
      contentData={data?.content}
      showOptions={true}
      backButtonStyle={styles.backBtn}
    />
  );
};

export default IndividualTopicPage;
