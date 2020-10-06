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
  const { data, status } = useFetchNewtContent();

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
              : status === "error"
              ? "Error"
              : data.map(
                  ({
                    _id: id,
                    name,
                    thumbnailUrl,
                    contentCreators,
                    slug,
                  }: DataProps) => (
                    <ContentCard
                      key={id}
                      id={id}
                      name={name}
                      thumbnailUrl={thumbnailUrl}
                      creator={contentCreators[0].name}
                      contentNameSlug={slug}
                      contentCreatorSlug={contentCreators[0].slug}
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
