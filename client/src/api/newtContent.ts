import newtApi from "./newtApi";
import { useQuery } from "react-query";

// API calls
const fetchNewtContent = async () => {
  const { data } = await newtApi.get("/newt-content");
  return data;
};

const fetchIndividualNewtContent = async (queryKey: any, contentId: string) => {
  const { data } = await newtApi.get(`/newt-content/${contentId}`);
  return data;
};

// React-query bindings
export function useFetchNewtContent() {
  return useQuery("newt-content", fetchNewtContent);
}
export function useFetchIndividualNewtContent(contentId: string) {
  return useQuery(
    ["individual-newt-content", contentId],
    fetchIndividualNewtContent
  );
}
