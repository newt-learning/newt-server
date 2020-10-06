import _ from "lodash";
import axios from "axios";
import { useQuery } from "react-query";

const baseUrl = "https://strapi-heroku-trial.herokuapp.com";

// API calls
const fetchNewtContent = async () => {
  const { data } = await axios.get(`${baseUrl}/newt-contents`);
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

const fetchAllNewtSeries = async () => {
  const { data } = await axios.get(`${baseUrl}/newt-series`);
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
export function useFetchNewtContent() {
  return useQuery("newt-content", fetchNewtContent);
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

export function useFetchAllNewtSeries() {
  return useQuery("newt-series", fetchAllNewtSeries);
}
export function useFetchNewtSeriesBySlug(slug: string) {
  return useQuery(["newt-series-by-slug", slug], fetchNewtSeriesBySlug);
}

export function useFetchNewtQuiz(newtQuizId: string) {
  return useQuery(["newt-quiz", newtQuizId], fetchNewtQuiz);
}
