import React from "react";
// API
import { useFetchNewtContent } from "../../api/newtContent";
// Components
import { MainContainer, Navbar, ContentCard } from "../../components";
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
    slug: string;
  };
  slug: string;
}

const DiscoverPage = () => {
  const { data, status } = useFetchNewtContent();

  console.log(data);

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
              * (This is an experimental section, which is why there's only one
              item right now. Click on the link below for a sneak peek into what
              we're trying to build).
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
                    slug,
                  }: DataProps) => (
                    <ContentCard
                      key={id}
                      id={id}
                      name={name}
                      thumbnailUrl={thumbnailUrl}
                      creator={contentCreator.name}
                      contentNameSlug={slug}
                      contentCreatorSlug={contentCreator.slug}
                    />
                  )
                )}
          </div>
        </div>
      </MainContainer>
    </section>
  );
};

export default DiscoverPage;
