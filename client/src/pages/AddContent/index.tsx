import React, { useState } from "react";
import _ from "lodash";
// API
import {
  getYoutubeVideoInfo,
  getYoutubePlaylistInfo,
} from "../../api/youtubeApi";
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
  validateYoutubePlaylistUrl,
  extractAndAssembleVideoInfo,
} from "./helpers";
import YoutubeConfirmation from "./YoutubeConfirmation";

type OnConfirmationPageState = "video" | "playlist" | null;

const AddContentPage = () => {
  const [onConfirmationPage, setOnConfirmationPage] = useState<
    OnConfirmationPageState
  >(null);
  const [youtubeContent, setYoutubeContent] = useState<any>(null);

  const [
    addContent,
    { isLoading, error: addContentError },
  ] = useCreateContent();

  const handleGoToConfirmation = async (values: YoutubeFormValues) => {
    const { videoUrl, playlistUrl } = values;

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

    if (playlistUrl) {
      const playlistId = validateYoutubePlaylistUrl(playlistUrl);

      if (playlistId) {
        const seriesInfo = await getYoutubePlaylistInfo(playlistId);
        if (!_.isEmpty(seriesInfo)) {
          setYoutubeContent(seriesInfo);
          setOnConfirmationPage("playlist");
        }
      } else {
        alert("not a playlist url");
      }
    }
  };

  const handleSubmit = async (values: any) => {
    const { videoInfo, shelf, topics, startDate, finishDate } = values;
    const contentInfo = extractAndAssembleVideoInfo(
      videoInfo,
      shelf,
      topics,
      startDate,
      finishDate
    );

    await addContent(contentInfo);

    // Go back to form
    setOnConfirmationPage(null);
    setYoutubeContent(null);
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
            isLoading={isLoading}
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
