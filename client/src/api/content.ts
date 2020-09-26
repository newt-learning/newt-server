import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";

interface UpdateBookProgressData {
  contentId: string;
  data: { pagesRead: number };
}

// API calls
const fetchAllContent = async () => {
  const { data } = await newtApi.get("/v2/content");
  return data;
};
const fetchAllSeries = async () => {
  const { data } = await newtApi.get("/series");
  return data;
};
const addContent = async (data: any) => {
  await newtApi.post("/content/create", data);
};
const createSeries = async (data: any) => {
  await newtApi.post("/series/create", data);
};
const updateBookProgress = async ({
  contentId,
  data,
}: UpdateBookProgressData) => {
  await newtApi.put(`/content/${contentId}/book-progress`, data);
};

// React-query bindings
export function useFetchAllContent() {
  return useQuery("contents", fetchAllContent);
}
export function useFetchAllSeries() {
  return useQuery("series", fetchAllSeries);
}
export function useCreateContent() {
  return useMutation(addContent, {
    onSettled: () => queryCache.invalidateQueries("contents"),
  });
}
export function useCreateSeries() {
  return useMutation(createSeries, {
    onSettled: () => queryCache.invalidateQueries("series"),
  });
}
export function useUpdateBookProgress() {
  return useMutation(updateBookProgress, {
    onSettled: () => queryCache.invalidateQueries("contents"),
  });
}
