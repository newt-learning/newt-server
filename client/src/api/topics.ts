import newtApi from "./newtApi";
import { useQuery } from "react-query";

// API calls
const fetchAllTopics = async () => {
  const { data } = await newtApi.get("/topics");
  return data;
};
const fetchTopic = async (queryKey: any, topicId: string) => {
  const { data } = await newtApi.get(`/topics/${topicId}`);
  return data;
};

// React-query bindings
export function useFetchAllTopics() {
  return useQuery("topics", fetchAllTopics);
}
export function useFetchTopic(topicId: string) {
  return useQuery(["topic", topicId], fetchTopic);
}
