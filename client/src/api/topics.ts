import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";

interface TopicData {
  name: string;
}

// API calls
const fetchAllTopics = async () => {
  const { data } = await newtApi.get("/topics");
  return data;
};
const fetchTopic = async (queryKey: any, topicId: string) => {
  const { data } = await newtApi.get(`/topics/${topicId}`);
  return data;
};
const createTopic = async (data: TopicData) => {
  await newtApi.post("/topics/create", data);
};

// React-query bindings
export function useFetchAllTopics() {
  return useQuery("topics", fetchAllTopics);
}
export function useFetchTopic(topicId: string) {
  return useQuery(["topic", topicId], fetchTopic);
}
export function useCreateTopic() {
  return useMutation(createTopic, {
    onSettled: () => queryCache.invalidateQueries("topics"),
  });
}
