import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";

interface UpdateContentParams {
  contentId: string;
  data: any
}
interface UpdateBookProgressData {
  contentId: string;
  data: { pagesRead: number };
}
interface UpdateSeriesParams {
  seriesId: string;
  data: {
    [key: string]: any
  }
}
interface UpdateSeriesShelfParams {
  seriesId: string;
  data: { shelf: string, startFinishDates?: any }
}

// API calls
const fetchAllContent = async () => {
  const { data } = await newtApi.get("/v2/content");
  return data;
};
const fetchAllContentAndSeries = async () => {
  const { data } = await newtApi.get("/content-and-series")
  return data
}
const fetchContent = async (queryKey: any, contentId: string) => {
  const { data } = await newtApi.get(`/content/${contentId}`)
  return data
}
const fetchAllSeries = async () => {
  const { data } = await newtApi.get("/series");
  return data;
};
const addContent = async (data: any) => {
  await newtApi.post("/content/create", data);
};
const addContentV2 = async (data: any) => {
  await newtApi.post("/v2/content/create", data);
};
const createSeries = async (data: any) => {
  await newtApi.post("/series/create", data);
};
const updateContent = async ({ contentId, data }: UpdateContentParams) => {
  await newtApi.put(`/content/${contentId}/update`, data)
}
const updateBookProgress = async ({
  contentId,
  data,
}: UpdateBookProgressData) => {
  await newtApi.put(`/content/${contentId}/book-progress`, data);
};
const updateSeries = async ({ seriesId, data }: UpdateSeriesParams) => {
  await newtApi.put(`/series/${seriesId}`, data)
} 
const updateSeriesShelf = async ({ seriesId, data }: UpdateSeriesShelfParams) => {
  await newtApi.put(`/series/${seriesId}/update-shelf`, data)
}
const deleteContent = async (contentId: string) => {
  await newtApi.delete(`/content/${contentId}`)
}
const deleteSeries = async (seriesId: string) => {
  await newtApi.delete(`/series/${seriesId}`)
}

// React-query bindings
export function useFetchAllContent() {
  return useQuery("contents", fetchAllContent);
}
export function useFetchAllContentAndSeries() {
  return useQuery("contents-and-series", fetchAllContentAndSeries)
}
export function useFetchContent(contentId: string) {
  return useQuery(["content", contentId], fetchContent)
}
export function useFetchAllSeries() {
  return useQuery("series", fetchAllSeries);
}
export function useCreateContent() {
  return useMutation(addContent, {
    onSettled: () => queryCache.invalidateQueries("contents-and-series"),
  });
}
export function useCreateContentV2() {
  return useMutation(addContentV2, {
    onSettled: () => queryCache.invalidateQueries("contents-and-series"),
  });
}
export function useCreateSeries() {
  return useMutation(createSeries, {
    onSettled: () => queryCache.invalidateQueries("contents-and-series"),
  });
}
export function useUpdateContent() {
  return useMutation(updateContent, {
    onSettled: () => queryCache.invalidateQueries("contents-and-series")
  })
}
export function useUpdateBookProgress() {
  return useMutation(updateBookProgress, {
    onSettled: () => queryCache.invalidateQueries("contents-and-series"),
  });
}
export function useUpdateSeries() {
  return useMutation(updateSeries, {
    onSettled: () => queryCache.invalidateQueries('contents-and-series')
  })
}
export function useUpdateSeriesShelf() {
  return useMutation(updateSeriesShelf, {
    onSettled: () => queryCache.invalidateQueries('contents-and-series')
  })
}
export function useDeleteContent() {
  return useMutation(deleteContent, {
    onSettled: () => queryCache.invalidateQueries('contents-and-series')
  })
}
export function useDeleteSeries() {
  return useMutation(deleteSeries, {
    onSettled: () => queryCache.invalidateQueries('contents-and-series')
  })
}
