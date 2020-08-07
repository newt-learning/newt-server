import React from "react";
// API
import { useFetchAllTopics } from "../../api/topics";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
} from "../../components";

const TopicsPage = () => {
  const { data, status } = useFetchAllTopics();

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Topics</h2>
      </AppHeaderContainer>
      <AppContentContainer>
        {status === "loading"
          ? "Loading..."
          : data.map(({ name }: { name: string }) => <div>{name}</div>)}
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default TopicsPage;
