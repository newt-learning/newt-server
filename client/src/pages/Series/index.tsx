import React from "react";
import { useParams } from "react-router-dom";
// API
import { useFetchNewtSeriesBySlug } from "../../api/newtContent";
// Components
import { Navbar, Badge, ContentInbox } from "../../components";
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
        <>
          {/* If type is playlist, show header card with playlist info notifying
            it's a curated playlist by Newt */}
          {data?.type === "playlist" ? (
            <div
              className={styles.playlistInfoContainer}
              style={{ backgroundColor: data?.backgroundColor }}
            >
              <h1>
                {data?.name}{" "}
                <Badge size="large" className={styles.playlistBadge}>
                  Newt Playlist
                </Badge>
              </h1>
              <p>{data?.description}</p>
            </div>
          ) : null}
          <ContentInbox
            title={data?.name}
            contentData={data?.content}
            isLoading={isLoading}
            className={styles.parentContainer}
          />
        </>
      )}
    </section>
  );
};

export default SeriesPage;
