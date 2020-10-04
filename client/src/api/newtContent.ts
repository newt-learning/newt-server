import newtApi from "./newtApi";
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
  const { data } = await newtApi.get(`/newt-content/${contentId}`);
  return data;
};

const fetchIndividualNewtContentBySlug = async (
  queryKey: any,
  slug: string
) => {
  const { data } = await axios.get(`${baseUrl}/newt-contents?slug=${slug}`);
  return !_.isEmpty(data) ? data[0] : null;
};

const fetchNewtQuiz = async (queryKey: any, newtQuizId: string) => {
  const { data } = await newtApi.get(`/newt-quiz/${newtQuizId}`);
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

export function useFetchNewtQuiz(newtQuizId: string) {
  return useQuery(["newt-quiz", newtQuizId], fetchNewtQuiz);
}
