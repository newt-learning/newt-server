import React from "react";
import { useParams } from "react-router-dom";
import { Navbar, ContentInbox } from "../../components";

const SeriesPage = () => {
  //@ts-ignore
  const { seriesSlug } = useParams();

  return (
    <section>
      <Navbar />
      <ContentInbox title="Series" />
    </section>
  );
};

export default SeriesPage;
