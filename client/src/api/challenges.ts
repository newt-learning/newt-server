import newtApi from "./newtApi";
import { useQuery } from "react-query";

// API calls
const fetchChallenges = async () => {
  const { data } = await newtApi.get("/challenges");
  return data;
};
const fetchIndividualChallenge = async (queryKey: any, challengeId: string) => {
  const { data } = await newtApi.get(`/challenges/${challengeId}`);
  return data;
};

// React-query bindings
export function useFetchChallenges() {
  return useQuery("challenges", fetchChallenges);
}
export function useFetchIndividualChallenge(challengeId: string) {
  return useQuery(["challenge", challengeId], fetchIndividualChallenge);
}
