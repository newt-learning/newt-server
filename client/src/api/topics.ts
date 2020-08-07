import newtApi from "./newtApi";
import { useQuery } from "react-query";

// API calls
const fetchAllTopics = async () => {
  const { data } = await newtApi.get("/topics");
  return data;
};

// React-query bindings
export function useFetchAllTopics() {
  return useQuery("topics", fetchAllTopics);
}
