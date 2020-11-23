import React from "react";
import { useParams } from "react-router-dom";
// API
import { useFetchNewtSeriesBySlug } from "../../api/newtContent";
// Components
import { Navbar, ContentInbox } from "../../components";
// Styling
import styles from "./Series.module.css";

const SeriesPage = () => {
  //@ts-ignore
  const { seriesSlug } = useParams();

  const { data, isLoading, isError } = useFetchNewtSeriesBySlug(seriesSlug);

  return (
    <section>
      <Navbar />
      {isError ? (
        "Sorry, there was an error"
      ) : (
        <ContentInbox
          title={data?.name}
          creators={data?.contentCreators[0].name}
          contentData={data?.content}
          isLoading={isLoading}
          className={styles.parentContainer}
          showAddToLibraryButton={true}
        />
      )}
    </section>
  );
};

export default SeriesPage;
