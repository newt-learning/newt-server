import React from "react";
// API
import { getYoutubeVideoInfo } from "../../api/youtubeApi";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  TabPane,
} from "../../components";
import YoutubeForm, { YoutubeFormValues } from "./YoutubeForm";
// Types
import { TabPaneField } from "../../components/TabPane";
// Helpers
import { validateYoutubeVideoUrl } from "./helpers";

const AddContentPage = () => {
  const handleSubmit = async (values: YoutubeFormValues) => {
    const { videoUrl } = values;

    if (videoUrl) {
      const videoId = validateYoutubeVideoUrl(videoUrl);
      if (videoId) {
        const youtubeInfo = await getYoutubeVideoInfo(videoId);
        console.log(youtubeInfo);
      } else {
        alert("not a youtube url");
      }
    }
  };

  const tabFields: TabPaneField[] = [
    {
      id: "youtube",
      name: "YouTube",
      type: "nav",
      renderTabPane: () => <YoutubeForm onSubmit={handleSubmit} />,
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
