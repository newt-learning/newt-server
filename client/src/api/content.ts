import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";

interface UpdateBookProgressData {
  contentId: string;
  data: { pagesRead: number };
}

// API calls
const fetchAllContent = async () => {
  const { data } = await newtApi.get("/content");
  return data;
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
export function useUpdateBookProgress() {
  return useMutation(updateBookProgress, {
    onSettled: () => queryCache.invalidateQueries("contents"),
  });
}
