import React from "react";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  TabPane,
} from "../../components";
import { TabPaneField } from "../../components/TabPane";

const BooksPane = () => <h3>Books</h3>;

const StatsPage = () => {
  const tabFields: TabPaneField[] = [
    {
      id: "books",
      name: "Books",
      TabPaneContent: BooksPane,
    },
  ];

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Stats</h2>
      </AppHeaderContainer>
      <AppContentContainer variant="tab-pane">
        <TabPane id="stats-tabs" fields={tabFields} />
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default StatsPage;
