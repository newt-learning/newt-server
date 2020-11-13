import newtApi from "./newtApi";
import { useMutation } from "react-query";

// Need to move this to back-end
const createLearningUpdate = async (data: any) => {
  await newtApi.post("/learning-updates/create", data);
};

// React-query bindings
export function useCreateLearningUpdate() {
  return useMutation(createLearningUpdate);
}
