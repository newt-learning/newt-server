import newtApi from "./newtApi";
import moment from "moment";
import { useQuery } from "react-query";

export type StatsPeriodType = "day" | "week" | "month" | "year";

// API calls
const fetchSummaryStats = async () => {
  const startDate = moment().startOf("week");
  const endDate = moment().endOf("week");

  const { data } = await newtApi.get(`/summary-stats/${startDate}.${endDate}`);
  return data;
};

const fetchStatsByPeriod = async (queryKey: any, period: StatsPeriodType) => {
  const startDate = moment().startOf(period);
  const endDate = moment().endOf(period);

  const { data } = await newtApi.get(
    `/stats/by-${period}/${startDate}.${endDate}`
  );

  let periodStats = {
    [period]: data,
  };
  return periodStats;
};

// React-query bindings
export function useSummaryStats() {
  return useQuery("summary-stats", fetchSummaryStats);
}
export function useStatsByPeriod(period: StatsPeriodType) {
  return useQuery(["stats-by-period", period], fetchStatsByPeriod);
}
