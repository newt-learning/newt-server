import React from "react";
// API
import { useFetchAllContentAndSeries } from "../../api/content";
// Components
import {
  AppMainContainer,
  AppContentContainer,
  Loader,
} from "../../components";
import Shelf from "./Shelf";
// Helpers
import { filterAndOrderContentByShelf } from "./helpers";
// Hooks
import useMetaTags from "../../hooks/useMetaTags";
// Styling
import styles from "./Shelves.module.css";

const ShelvesPage = () => {
  useMetaTags({
    title: "Shelves / Newt",
  });

  const { data: allData, isLoading } = useFetchAllContentAndSeries();

  const currentlyLearningItems = filterAndOrderContentByShelf(
    "Currently Learning",
    allData
  );
  const wantToLearnItems = filterAndOrderContentByShelf(
    "Want to Learn",
    allData
  );
  const finishedLearningItems = filterAndOrderContentByShelf(
    "Finished Learning",
    allData
  );

  return (
    <AppMainContainer className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <AppContentContainer className={styles.contentContainer}>
          <Shelf
            id="currently-learning"
            name="Currently Learning"
            data={currentlyLearningItems}
          />
          <Shelf
            id="want-to-learn"
            name="Want to Learn"
            data={wantToLearnItems}
          />
          <Shelf
            id="finished-learning"
            name="Finished Learning"
            data={finishedLearningItems}
          />
        </AppContentContainer>
      )}
    </AppMainContainer>
  );
};

export default ShelvesPage;
