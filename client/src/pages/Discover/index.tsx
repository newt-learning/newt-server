import React from "react";
import { Link } from "react-router-dom";
// API
import { useFetchNewtContent } from "../../api/newtContent";
// Components
import { Navbar, ContentCard } from "../../components";
// Styling
import styles from "./Discover.module.css";
// Helpers
import { slugify } from "../../helpers/textHelpers";

interface DataProps {
  id: string;
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
                  ({ id, name, thumbnailUrl, contentCreator }: DataProps) => (
                    <Link
                      to={`/${slugify(contentCreator.name)}/content/${slugify(
                        name
                      )}`}
                    >
                      <ContentCard
                        key={id}
                        name={name}
                        thumbnailUrl={thumbnailUrl}
                        creator={contentCreator.name}
                      />
                    </Link>
                  )
                )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverPage;
