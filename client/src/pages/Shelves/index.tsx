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
  const wantToLearnItems = filterAndOrderContentByShelf("Want to Learn", data);
  const finishedLearningItems = filterAndOrderContentByShelf(
    "Finished Learning",
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
            <Shelf name="Want to Learn" data={wantToLearnItems} />
            <Shelf name="Finished Learning" data={finishedLearningItems} />
          </>
        )}
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default ShelvesPage;
