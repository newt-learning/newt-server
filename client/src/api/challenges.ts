import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";

type UpdateChallengeParams = {
  challengeId: string;
  data: any
}

// API calls
const fetchChallenges = async () => {
  const { data } = await newtApi.get("v2/challenges");
  return data;
};
const fetchIndividualChallenge = async (queryKey: any, challengeId: string) => {
  const { data } = await newtApi.get(`/challenges/${challengeId}`);
  return data;
};
const createChallenge = async (data: any) => {
  await newtApi.post("/challenges/create", data);
}
const updateChallenge = async ({ challengeId, data }: UpdateChallengeParams) => {
  await newtApi.put(`/challenges/${challengeId}/update`, data)
}
const addContentToChallenge = async (contentId: string) => {
  try {
    await newtApi.put("/challenges/add-content", { contentId });
  } catch (error) {
    // Need to figure out what the best thing to do here would be. If this fails,
    // then the reading challenge will be one book behind than what's actually
    // finished. Maybe just re-check the Reading Challenge periodically?
    return;
  }
};
const deleteChallenge = async (challengeId: string) => {
    await newtApi.delete(`/challenges/${challengeId}`);
};

// React-query bindings
export function useFetchChallenges() {
  return useQuery("challenges", fetchChallenges);
}
export function useFetchIndividualChallenge(challengeId: string) {
  return useQuery(["challenge", challengeId], fetchIndividualChallenge);
}
export function useCreateChallenge() {
  return useMutation(createChallenge, {
    onSettled: () => queryCache.invalidateQueries("challenges")
  })
}
export function useUpdateChallenge() {
  return useMutation(updateChallenge, {
    onSettled: () => queryCache.invalidateQueries("challenges"),
  });
}
export function useAddContentToChallenge() {
  return useMutation(addContentToChallenge);
}
export function useDeleteChallenge() {
  return useMutation(deleteChallenge, {
    onSettled: () => queryCache.invalidateQueries("challenges"),
  });
}
