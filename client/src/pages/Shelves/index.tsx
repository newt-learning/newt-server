import React from "react";
// API
import { useFetchAllContent } from "../../api/content";
// Components
import { AppMainContainer, AppContentContainer } from "../../components";
import Shelf from "./Shelf";
// Helpers
import { filterAndOrderContentByShelf } from "./helpers";
// Styling
import styles from "./Shelves.module.css";

const ShelvesPage = () => {
  const { data, isLoading } = useFetchAllContent();

  const currentlyLearningItems = filterAndOrderContentByShelf(
    "Currently Learning",
    data
  );

  return (
    <AppMainContainer className={styles.container}>
      <AppContentContainer className={styles.contentContainer}>
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <Shelf name="Currently Learning" data={currentlyLearningItems} />
            <Shelf name="Want to Learn" />
            <Shelf name="Finished Learning" />
          </>
        )}
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default ShelvesPage;
