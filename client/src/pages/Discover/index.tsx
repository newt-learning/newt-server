import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
// API
import {
  useFetchAllNewtSeries,
  useFetchAllNewtPlaylists,
  useFetchNewtContent,
} from "../../api/newtContent";
// Components
import SeriesCard from "../Series/SeriesCard";
import { ContentCard, MainContainer, Navbar } from "../../components";
// Styling
import styles from "./Discover.module.css";

interface DataProps {
  _id: string;
  name: string;
  thumbnailUrl: string;
  contentCreators: [
    {
      _id: string;
      name: string;
      slug: string;
      url: string;
    }
  ];
  slug: string;
}

const DiscoverPage = () => {
  // Fetch series data that's featured
  const { data: seriesData, isLoading, isError } = useFetchAllNewtSeries({
    featuredStatus: "featured1",
  });
  const { data: playlistData } = useFetchAllNewtPlaylists({
    featuredStatus: "featured1",
  });
  // Fetch content not part of a series
  const {
    data: contentData,
    isLoading: contentIsLoading,
    isError: contentIsError,
  } = useFetchNewtContent({ partOfSeries: false });

  const featuredSeries = !_.isEmpty(seriesData)
    ? seriesData.filter((series: any) => series.type === "series")[0]
    : null;
  const featuredPlaylist = !_.isEmpty(playlistData) ? playlistData[0] : null;

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <MainContainer>
        <aside className={styles.sidebar}></aside>
        <div className={styles.mainContent}>
          <div>
            <h1 className={styles.title}>Discover</h1>
            <p className={styles.description}>
              Find the next thing you want to learn from our curated library*.
            </p>
            <p className={styles.disclaimer}>
              * (Under construction{" "}
              <span role="img" aria-label="construction emoji">
                🚧
              </span>
              . To try the experimental quiz feature, check out &nbsp;
              <Link
                to={`/crash-course/content/early-computing-crash-course-computer-science-1`}
              >
                Early Computing Crash Course Computer Science #1
              </Link>
              ).
            </p>
          </div>
          {/* Series */}
          {isError ? (
            <div style={{ marginTop: "2rem" }}>
              Sorry, there was an error fetching the data.
            </div>
          ) : (
            <div style={{ marginTop: "2rem" }}>
              {featuredSeries ? (
                <SeriesCard
                  name={featuredSeries?.name}
                  type={featuredSeries?.type}
                  linkPath={`/${featuredSeries?.seriesCreator?.slug}/series/${featuredSeries?.slug}`}
                  creator={featuredSeries?.seriesCreator?.name}
                  creatorSlug={featuredSeries?.seriesCreator?.slug}
                  data={featuredSeries?.content}
                  colors={{
                    backgroundColor: featuredSeries?.backgroundColor,
                    textColor: featuredSeries?.textColor,
                  }}
                  isLoading={isLoading}
                />
              ) : null}
              {featuredPlaylist ? (
                <>
                  <h2 style={{ marginTop: "2.5rem" }}>Newt Playlists</h2>
                  <p
                    className={styles.description}
                    style={{ marginBottom: "1.5rem" }}
                  >
                    Check out our curated learning playlists
                  </p>
                  <SeriesCard
                    name={featuredPlaylist?.name}
                    type={featuredPlaylist?.type}
                    linkPath={`/${featuredPlaylist?.creators[0]?.slug}/series/${featuredPlaylist?.slug}`}
                    creator={featuredPlaylist?.creators[0]?.name}
                    creatorSlug={featuredPlaylist?.creators[0]?.slug}
                    data={featuredPlaylist?.content}
                    colors={{
                      backgroundColor:
                        featuredPlaylist?.colors?.backgroundColor,
                      textColor: featuredPlaylist?.colors?.textColor,
                    }}
                    isLoading={isLoading}
                  />
                </>
              ) : null}
            </div>
          )}
          {/* Content */}
          {contentIsLoading ? (
            "Loading..."
          ) : contentIsError ? (
            "Sorry, there was an error"
          ) : !_.isEmpty(contentData) ? (
            <>
              <h2 style={{ marginTop: "2.5rem" }}>Some Favourites</h2>
              <div className={styles.contentContainer}>
                {contentData.map((content: any) => (
                  <ContentCard
                    key={content?.id}
                    id={content?.id}
                    name={content?.name}
                    creator={content?.contentCreators[0].name}
                    thumbnailUrl={content?.thumbnailUrl}
                    contentNameSlug={content?.slug}
                    contentCreatorSlug={content?.contentCreators[0].slug}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </MainContainer>
    </section>
  );
};

export default DiscoverPage;
