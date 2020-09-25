import React, { useState } from "react";
import _ from "lodash";
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
import YoutubeConfirmation from "./YoutubeConfirmation";

type OnConfirmationPageState = "video" | "playlist" | null;

const AddContentPage = () => {
  const [onConfirmationPage, setOnConfirmationPage] = useState<
    OnConfirmationPageState
  >(null);
  const [youtubeContent, setYoutubeContent] = useState(null);
  const handleSubmit = async (values: YoutubeFormValues) => {
    const { videoUrl } = values;

    if (videoUrl) {
      const videoId = validateYoutubeVideoUrl(videoUrl);
      if (videoId) {
        const videoResults = await getYoutubeVideoInfo(videoId);
        if (!_.isEmpty(videoResults.items)) {
          setYoutubeContent(videoResults.items[0]);
          setOnConfirmationPage("video");
        }
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
      renderTabPane: () =>
        onConfirmationPage ? (
          <YoutubeConfirmation
            dataType={onConfirmationPage}
            data={youtubeContent}
          />
        ) : (
          <YoutubeForm onNext={handleSubmit} />
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
