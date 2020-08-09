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

const IndividualTopicPage = () => {
  const { topicId } = useParams();

  const { isLoading, data, isError } = useFetchTopic(topicId);

  console.log(isLoading, data);

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>{data ? data.name : null}</h2>
      </AppHeaderContainer>
      <AppContentContainer></AppContentContainer>
    </AppMainContainer>
  );
};

export default IndividualTopicPage;
