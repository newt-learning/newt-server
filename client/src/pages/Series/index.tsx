import React from "react";
import { useParams } from "react-router-dom";
// API
import { useFetchNewtSeriesBySlug } from "../../api/newtContent";
// Components
import { Navbar, ContentInbox } from "../../components";
import { AddToLibraryFormValues } from "../../components/ContentInbox/AddToLibrary";
// Styling
import styles from "./Series.module.css";

const SeriesPage = () => {
  //@ts-ignore
  const { seriesSlug } = useParams();

  const { data, isLoading, isError } = useFetchNewtSeriesBySlug(seriesSlug);

  const handleAddNewtSeriesToLibrary = (formValues: AddToLibraryFormValues) => {
    console.log({ data, formValues });
  };

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
          onAddToLibrary={handleAddNewtSeriesToLibrary}
        />
      )}
    </section>
  );
};

export default SeriesPage;
