import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";

interface TopicData {
  name: string;
}

interface UpdateTopicParams {
  topicId: string;
  data: TopicData;
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
const updateTopic = async ({ topicId, data }: UpdateTopicParams) => {
  await newtApi.put(`topics/${topicId}/update`, data);
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
export function useUpdateTopic() {
  return useMutation(updateTopic, {
    onSettled: () => queryCache.invalidateQueries("topic"),
  });
}
