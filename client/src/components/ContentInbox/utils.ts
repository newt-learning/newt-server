import _ from "lodash";
import { AddToLibraryFormValues } from "./AddToLibrary";
import { StartFinishDateType } from "../../pages/Content/ContentFlow";

interface FormatNewtDiscoverSeriesParams {
  newtSeriesData: any;
  formData: AddToLibraryFormValues;
}
interface FormatNewtPlaylistParams {
  newtPlaylistData: any;
  formData: AddToLibraryFormValues;
}

export function formatNewtDiscoverSeries({
  newtSeriesData,
  formData,
}: FormatNewtDiscoverSeriesParams) {
  let formattedSeries: any = {
    name: newtSeriesData?.name,
    description: newtSeriesData?.description,
    authors: [newtSeriesData?.seriesCreator?.name],
    thumbnailUrl: newtSeriesData?.thumbnailUrl,
    type: newtSeriesData?.type,
    contentType: newtSeriesData?.contentType,
    shelf: formData.shelf,
    playlists: formData?.playlists,
    isFromNewtDiscover: true, // Whether the series was added from Newt Discover page
    seriesInfo: {
      source: newtSeriesData?.source,
      playlistId: newtSeriesData?.sourceId,
      title: newtSeriesData?.name,
      description: newtSeriesData?.description,
      // channelId: not available
      // datePublished: N/A
      // thumbnails: N/A
    },
  };

  let startFinishDates: StartFinishDateType[] = [];

  // If the selected shelf is Currently Learning, set first date started as now
  if (formData.shelf === "Currently Learning") {
    startFinishDates = [{ dateStarted: new Date(), dateCompleted: null }];
  }

  // If the selected shelf is Finished, add the dateCompleted field
  if (formData.shelf === "Finished Learning") {
    startFinishDates = [
      { dateStarted: formData.startDate, dateCompleted: formData.finishDate },
    ];
  }

  // Add startFinishDates field to series info
  formattedSeries.startFinishDates = startFinishDates;

  // Format videos in series
  const formattedVideos = _.map(newtSeriesData?.content, (video, index) => {
    return {
      name: video.name,
      description: video.description,
      authors: _.map(
        newtSeriesData?.contentCreators,
        (creator) => creator.name
      ),
      thumbnailUrl: video.thumbnailUrl,
      type: video.type,
      partOfSeries: true,
      shelf: formData.shelf,
      startFinishDates,
      videoInfo: {
        source: video.source,
        videoId: video.sourceId,
        playlistId: newtSeriesData?.sourceId,
        playlistPosition: index + 1,
        title: video.name,
        description: video.description,
        // channelId: N/A
        // thumbnails: N/A
        // datePublished: N/A
      },
    };
  });

  // Add formatted videos to series
  formattedSeries.videos = formattedVideos;

  return formattedSeries;
}

export function formatNewtPlaylist({
  newtPlaylistData,
  formData,
}: FormatNewtPlaylistParams) {
  return { newtPlaylistData, formData };
}
