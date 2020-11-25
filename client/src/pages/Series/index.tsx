import React from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
// API
import { useFetchNewtSeriesBySlug } from "../../api/newtContent";
import { useCreateSeries } from "../../api/content";
// Components
import {
  Navbar,
  ContentInbox,
  formatNewtDiscoverSeries,
} from "../../components";
// Styling
import styles from "./Series.module.css";

const SeriesPage = () => {
  //@ts-ignore
  const { seriesSlug } = useParams();

  // Toasts
  const { addToast } = useToasts();

  const { data, isLoading, isError } = useFetchNewtSeriesBySlug(seriesSlug);
  // Function to add series to Library
  const [createSeries] = useCreateSeries();

  const handleAddNewtSeriesToLibrary = async () => {
    const formattedSeries = formatNewtDiscoverSeries(data);

    await createSeries(formattedSeries, {
      // Toast notifications on success and error
      onSuccess: () =>
        addToast(`${data?.name} Series has been added to your Library`, {
          appearance: "success",
        }),
      onError: () =>
        addToast(
          "Sorry, there was an error adding the video series. Please try again.",
          { appearance: "error" }
        ),
    });
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
          addToLibrary="newt-series"
          onAddToLibrary={handleAddNewtSeriesToLibrary}
        />
      )}
    </section>
  );
};

export default SeriesPage;
