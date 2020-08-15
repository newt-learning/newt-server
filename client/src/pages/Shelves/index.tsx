import React from "react";
// API
import { useFetchAllContent } from "../../api/content";
// Components
import { AppMainContainer, AppContentContainer } from "../../components";
import Shelf from "./Shelf";
// Helpers
import { filterAndOrderContentByShelf } from "./helpers";

const ShelvesPage = () => {
  const { data, isLoading } = useFetchAllContent();

  const currentlyLearningItems = filterAndOrderContentByShelf(
    "Currently Learning",
    data
  );

  return (
    <AppMainContainer>
      <AppContentContainer>
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <Shelf name="Currently Learning" data={currentlyLearningItems} />
            {/* <Shelf />
            <Shelf /> */}
          </>
        )}
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default ShelvesPage;
