import React from "react";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  TabPane,
} from "../../components";
import YoutubeForm from "./YoutubeForm";
// Types
import { TabPaneField } from "../../components/TabPane";

const AddContentPage = () => {
  const tabFields: TabPaneField[] = [
    {
      id: "youtube",
      name: "YouTube",
      type: "nav",
      renderTabPane: () => (
        <YoutubeForm onSubmit={(values) => console.log(values)} />
      ),
    },
    {
      id: "books",
      name: "Books",
      type: "nav",
      renderTabPane: () => <h3>Books</h3>,
    },
  ];

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Add Content</h2>
      </AppHeaderContainer>
      <AppContentContainer variant="tab-pane">
        <TabPane id="add-content-tabs" fields={tabFields} />
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default AddContentPage;
