import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
// API
import { useFetchAllNewtSeries } from "../../api/newtContent";
// Components
import SeriesCard from "../Series/SeriesCard";
import { MainContainer, Navbar } from "../../components";
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
  const { data: seriesData, status: seriesStatus } = useFetchAllNewtSeries();
  const firstSeries = !_.isEmpty(seriesData) ? seriesData[0] : null;

  return (
    <section>
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
          {seriesStatus === "error" ? (
            "Error"
          ) : firstSeries ? (
            <div style={{ marginTop: "2rem" }}>
              <SeriesCard
                name={firstSeries.name}
                linkPath={`/${firstSeries.contentCreators[0].slug}/series/${firstSeries.slug}`}
                creator={firstSeries.contentCreators[0].name}
                creatorSlug={firstSeries.contentCreators[0].slug}
                data={firstSeries.content}
                isLoading={seriesStatus === "loading"}
              />
            </div>
          ) : null}
        </div>
      </MainContainer>
    </section>
  );
};

export default DiscoverPage;
