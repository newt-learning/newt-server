import React from "react";
// API
import { useFetchAllTopics } from "../../api/topics";

const TopicsPage = () => {
  const { data, isFetching } = useFetchAllTopics();

  return <section>{JSON.stringify(data)}</section>;
};

export default TopicsPage;
