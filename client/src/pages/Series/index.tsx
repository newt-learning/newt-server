import React from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
// API
import { useFetchNewtSeriesBySlug } from "../../api/newtContent";
import { useCreateSeries } from "../../api/content";
// Components
import { Link } from "react-router-dom";
import {
  Navbar,
  ContentInbox,
  formatNewtDiscoverSeries,
} from "../../components";
// Hooks
import useMetaTags from "../../hooks/useMetaTags";
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

  useMetaTags({
    title: data?.name ? `${data.name} / Newt` : `Discover / Newt`,
  });

  const handleAddNewtSeriesToLibrary = async () => {
    const formattedSeries = formatNewtDiscoverSeries(data);

    await createSeries(formattedSeries, {
      // Toast notifications on success and error
      onSuccess: () =>
        addToast(
          <div>
            {`${data?.name} Series has been added to your `}
            <Link
              to="/shelves/want-to-learn"
              style={{
                color: "var(--lightGreen-900)",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Want to Learn shelf
            </Link>
          </div>,
          {
            appearance: "success",
          }
        ),
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
