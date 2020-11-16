import React from "react";
import { useParams } from "react-router-dom";
// API
import { useFetchAllContent, useFetchAllSeries } from "../../api/content";
// Components
import { ContentInbox } from "../../components";
// Helpers
import { filterAndOrderContentByShelf } from "./helpers";

const SHELF_SLUG_TO_NAME: any = {
  "currently-learning": "Currently Learning",
  "want-to-learn": "Want to Learn",
  "finished-learning": "Finished Learning",
};

const IndividualShelfPage = () => {
  // @ts-ignore
  let { shelfName } = useParams();

  const { data, isLoading } = useFetchAllContent();
  const { data: seriesData, isLoading: seriesIsLoading } = useFetchAllSeries();

  // Maybe should have a single API call for this rather than combining them here
  const allData =
    isLoading || seriesIsLoading ? null : [...data, ...seriesData];

  // Convery from slug to actual name (eg. want-to-learn ==> Want to Learn)
  const shelf = SHELF_SLUG_TO_NAME[shelfName];

  const shelfData = filterAndOrderContentByShelf(shelf, allData);

  return (
    <ContentInbox
      title={shelf}
      contentData={shelfData}
      isLoading={isLoading || seriesIsLoading}
    />
  );
};

export default IndividualShelfPage;
