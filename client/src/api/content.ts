import newtApi from "./newtApi";
import { useQuery } from "react-query";

// API calls
const fetchAllContent = async () => {
  const { data } = await newtApi.get("/content");
  return data;
};

// React-query bindings
export function useFetchAllContent() {
  return useQuery("contents", fetchAllContent);
}
