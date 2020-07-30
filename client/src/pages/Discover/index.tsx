import React from "react";
// API
import { useFetchNewtContent } from "../../api/newtContent";
// Components
import { Navbar, ContentCard } from "../../components";
// Styling
import styles from "./Discover.module.css";

interface DataProps {
  _id: string;
  name: string;
  thumbnailUrl: string;
  contentCreator: {
    contentCreatorId: string;
    name: string;
    url: string;
  };
}

const DiscoverPage = () => {
  const { data, status } = useFetchNewtContent();

  return (
    <section>
      <Navbar />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Categories</h2>
        </aside>
        <div className={styles.mainContent}>
          <div>
            <h1 className={styles.title}>Discover</h1>
            <p className={styles.description}>
              Find the next thing you want to learn from our curated library.
            </p>
          </div>
          <div className={styles.contentContainer}>
            {status === "loading"
              ? "Loading..."
              : data.map(
                  ({
                    _id: id,
                    name,
                    thumbnailUrl,
                    contentCreator,
                  }: DataProps) => (
                    <ContentCard
                      key={id}
                      name={name}
                      thumbnailUrl={thumbnailUrl}
                      creator={contentCreator.name}
                    />
                  )
                )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverPage;
