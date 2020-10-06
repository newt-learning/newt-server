import React from "react";
import { useParams } from "react-router-dom";
// API
import { useFetchNewtSeriesBySlug } from "../../api/newtContent";
import { Navbar, ContentInbox } from "../../components";

const SeriesPage = () => {
  //@ts-ignore
  const { seriesSlug } = useParams();

  const { data, isLoading, isError } = useFetchNewtSeriesBySlug(seriesSlug);

  return (
    <section>
      <Navbar />
      {isLoading ? (
        "Loading..."
      ) : isError ? (
        "Sorry, there was an error"
      ) : data ? (
        <ContentInbox title={data.name} contentData={data.content} />
      ) : (
        "No data"
      )}
    </section>
  );
};

export default SeriesPage;
