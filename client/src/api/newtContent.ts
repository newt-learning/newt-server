import _ from "lodash";
import axios from "axios";
import { useQuery } from "react-query";
import keys from "../config/keys";

const baseUrl = keys.newtContentBaseUrl;

// API calls
const fetchNewtContent = async (queryKey: string, params: any) => {
  const { data } = await axios.get(`${baseUrl}/newt-contents`, {
    params,
  });

  return data;
};

const fetchIndividualNewtContent = async (queryKey: any, contentId: string) => {
  const { data } = await axios.get(`${baseUrl}/newt-contents/${contentId}`);
  return data;
};

const fetchIndividualNewtContentBySlug = async (
  queryKey: any,
  slug: string
) => {
  const { data } = await axios.get(`${baseUrl}/newt-contents?slug=${slug}`);
  return !_.isEmpty(data) ? data[0] : null;
};

const fetchAllNewtSeries = async (queryKey: string, params: any) => {
  const { data } = await axios.get(`${baseUrl}/newt-series`, { params });
  return data;
};

const fetchNewtSeriesBySlug = async (queryKey: string, slug: string) => {
  const { data } = await axios.get(`${baseUrl}/newt-series?slug=${slug}`);
  return !_.isEmpty(data) ? data[0] : null;
};

const fetchNewtQuiz = async (queryKey: any, newtQuizId: string) => {
  const { data } = await axios.get(`${baseUrl}/quizzes/${newtQuizId}`);
  return data;
};

// React-query bindings
export function useFetchNewtContent(params?: any) {
  return useQuery(["newt-content", params], fetchNewtContent);
}
export function useFetchIndividualNewtContent(contentId: string) {
  return useQuery(
    ["individual-newt-content", contentId],
    fetchIndividualNewtContent
  );
}
export function useFetchIndividualNewtContentBySlug(slug: string) {
  return useQuery(
    ["individual-newt-content-by-slug", slug],
    fetchIndividualNewtContentBySlug
  );
}

export function useFetchAllNewtSeries(params?: any) {
  return useQuery(["newt-series", params], fetchAllNewtSeries);
}
export function useFetchNewtSeriesBySlug(slug: string) {
  return useQuery(["newt-series-by-slug", slug], fetchNewtSeriesBySlug);
}

export function useFetchNewtQuiz(newtQuizId: string) {
  return useQuery(["newt-quiz", newtQuizId], fetchNewtQuiz);
}
