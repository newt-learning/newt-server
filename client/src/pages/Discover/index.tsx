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
import { MainContainer, Navbar } from "../../components";
import DiscoverContentCard from "./DiscoverContentCard";
import SeriesCard from "../Series/SeriesCard";
// Hooks
import useMetaTags from "../../hooks/useMetaTags";
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
  const {
    data: seriesData,
    isLoading: seriesIsLoading,
    isError,
  } = useFetchAllNewtSeries({
    featuredStatus: "featured1",
  });
  const {
    data: playlistData,
    isLoading: playlistIsLoading,
  } = useFetchAllNewtPlaylists({
    featuredStatus: "featured1",
  });
  // Fetch content not part of a series
  const {
    data: contentData,
    isLoading: contentIsLoading,
    isError: contentIsError,
  } = useFetchNewtContent({ partOfSeries: false });

  const featuredSeries = !_.isEmpty(seriesData) ? seriesData[0] : null;
  const featuredPlaylist = !_.isEmpty(playlistData) ? playlistData[0] : null;

  useMetaTags({
    title: "Discover / Newt",
  });

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
              {/* Featured series */}
              <SeriesCard
                type={featuredSeries?.type}
                isLoading={seriesIsLoading}
                linkPath={`/${featuredSeries?.seriesCreator?.slug}/series/${featuredSeries?.slug}`}
                data={{
                  name: featuredSeries?.name,
                  slug: featuredSeries?.slug,
                  creator: featuredSeries?.seriesCreator?.name,
                  creatorSlug: featuredSeries?.seriesCreator?.slug,
                  content: featuredSeries?.content,
                }}
                colors={{
                  backgroundColor: featuredSeries?.backgroundColor,
                  textColor: featuredSeries?.textColor,
                }}
              />
              {/* Featured playlist */}
              <>
                <h2 style={{ marginTop: "2.5rem" }}>Newt Playlists</h2>
                <p
                  className={styles.description}
                  style={{ marginBottom: "1.5rem" }}
                >
                  Check out our curated learning playlists
                </p>
                <SeriesCard
                  type={featuredPlaylist?.type}
                  isLoading={playlistIsLoading}
                  linkPath={`/${featuredPlaylist?.creators[0]?.slug}/playlists/${featuredPlaylist?.slug}`}
                  data={{
                    name: featuredPlaylist?.name,
                    slug: featuredPlaylist?.slug,
                    creator: featuredPlaylist?.creators[0]?.name,
                    creatorSlug: featuredPlaylist?.creators[0]?.slug,
                    content: featuredPlaylist?.content,
                  }}
                  colors={{
                    backgroundColor: featuredPlaylist?.colors?.backgroundColor,
                    textColor: featuredPlaylist?.colors?.textColor,
                  }}
                />
              </>
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
                  <DiscoverContentCard
                    key={content?.id}
                    data={{
                      id: content?.id,
                      name: content?.name,
                      creator: content?.contentCreators[0].name,
                      thumbnailUrl: content?.thumbnailUrl,
                      contentNameSlug: content?.slug,
                      contentCreatorSlug: content?.contentCreators[0].slug,
                    }}
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
