import React, { useState } from "react";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
// API
import {
  getYoutubeVideoInfo,
  getYoutubePlaylistInfo,
} from "../../api/youtubeApi";
import {
  useCreateContent,
  useCreateContentV2,
  useCreateSeries,
} from "../../api/content";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  TabPane,
} from "../../components";
import YoutubeForm, { YoutubeFormValues } from "./YoutubeForm";
import YoutubeConfirmation from "./YoutubeConfirmation";
import BookSearch from "./BookSearch";
// Types
import { TabPaneField } from "../../components/TabPane";
// Helpers
import {
  validateYoutubeVideoUrl,
  validateYoutubePlaylistUrl,
  extractAndAssembleVideoInfo,
  extractAndAssemblePlaylistInfo,
  extractAndAssembleBookInfo,
} from "./helpers";

type OnConfirmationPageState = "video" | "playlist" | null;

const AddContentPage = () => {
  const [onConfirmationPage, setOnConfirmationPage] = useState<
    OnConfirmationPageState
  >(null);
  const [youtubeContent, setYoutubeContent] = useState<any>(null);

  // Toasts
  const { addToast } = useToasts();

  const [
    addContent,
    { isLoading, error: addContentError },
  ] = useCreateContent();
  const [addContentV2, { isLoading: isAddingBook }] = useCreateContentV2();
  const [createSeries, { isLoading: isCreatingSeries }] = useCreateSeries();

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
    if (onConfirmationPage === "video") {
      const { videoInfo, shelf, playlists, startDate, finishDate } = values;
      const contentInfo = extractAndAssembleVideoInfo(
        videoInfo,
        shelf,
        playlists,
        startDate,
        finishDate
      );

      await addContent(contentInfo, {
        // Toast notifications on success and error
        onSuccess: () =>
          addToast("Video has been added to Shelves", {
            appearance: "success",
          }),
        onError: () =>
          addToast(
            "Sorry, there was an error adding that video. Please try again.",
            { appearance: "error" }
          ),
      });

      // Go back to form
      setOnConfirmationPage(null);
      setYoutubeContent(null);
    }

    if (onConfirmationPage === "playlist") {
      const { seriesInfo } = values;
      const formattedSeriesInfo = extractAndAssemblePlaylistInfo(seriesInfo);

      await createSeries(formattedSeriesInfo, {
        // Toast notifications on success and error
        onSuccess: () =>
          addToast("Video series has been added to Shelves", {
            appearance: "success",
          }),
        onError: () =>
          addToast(
            "Sorry, there was an error adding that video series. Please try again.",
            { appearance: "error" }
          ),
      });
      // Go back to form
      setOnConfirmationPage(null);
      setYoutubeContent(null);
    }
  };

  const handleSubmitBook = async (values: any) => {
    const { bookInfo, shelf, playlists, startDate, finishDate } = values;
    const formattedBookInfo = extractAndAssembleBookInfo(
      bookInfo,
      shelf,
      playlists,
      startDate,
      finishDate
    );

    await addContentV2(formattedBookInfo, {
      // Toast notifications on success and error
      onSuccess: () =>
        addToast(`${formattedBookInfo.name} added to Shelves`, {
          appearance: "success",
        }),
      onError: () =>
        addToast(
          "Sorry, there was an error adding that book. Please try again.",
          {
            appearance: "error",
          }
        ),
    });
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
            isLoading={isLoading || isCreatingSeries}
          />
        ) : (
          <YoutubeForm onNext={handleGoToConfirmation} />
        ),
    },
    {
      id: "books",
      name: "Books",
      type: "nav",
      renderTabPane: () => (
        <BookSearch onSubmit={handleSubmitBook} isLoading={isAddingBook} />
      ),
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
