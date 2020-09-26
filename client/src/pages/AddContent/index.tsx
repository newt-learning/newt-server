import React, { useState } from "react";
import _ from "lodash";
// API
import { getYoutubeVideoInfo } from "../../api/youtubeApi";
import { useCreateContent } from "../../api/content";
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
import {
  validateYoutubeVideoUrl,
  extractAndAssembleVideoInfo,
} from "./helpers";
import YoutubeConfirmation from "./YoutubeConfirmation";

type OnConfirmationPageState = "video" | "playlist" | null;

const AddContentPage = () => {
  const [onConfirmationPage, setOnConfirmationPage] = useState<
    OnConfirmationPageState
  >(null);
  const [youtubeContent, setYoutubeContent] = useState(null);

  const [addContent, { error: addContentError }] = useCreateContent();

  const handleGoToConfirmation = async (values: YoutubeFormValues) => {
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

  const handleSubmit = (values: any) => {
    const { videoInfo, shelf, topics, startDate, finishDate } = values;
    const contentInfo = extractAndAssembleVideoInfo(
      videoInfo,
      shelf,
      topics,
      startDate,
      finishDate
    );

    addContent(contentInfo);
  };

  if (addContentError) {
    console.log(addContentError);
    return <div>Error: {JSON.stringify(addContentError)}</div>;
  }

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
            onBack={() => setOnConfirmationPage(null)}
            onSubmit={handleSubmit}
          />
        ) : (
          <YoutubeForm onNext={handleGoToConfirmation} />
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
