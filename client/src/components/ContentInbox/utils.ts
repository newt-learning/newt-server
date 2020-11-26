import _ from "lodash";

// Newt series ==> user series
export function formatNewtDiscoverSeries(newtSeriesData: any) {
  let formattedSeries: any = {
    name: newtSeriesData?.name ?? null,
    description: newtSeriesData?.description ?? null,
    authors: [newtSeriesData?.seriesCreator?.name] ?? null,
    thumbnailUrl: newtSeriesData?.thumbnailUrl ?? null,
    type: newtSeriesData?.type ?? null,
    contentType: newtSeriesData?.contentType ?? null,
    shelf: "Want to Learn",
    playlists: [],
    startFinishDates: [],
    isFromNewtDiscover: true, // Whether the series was added from Newt Discover page
    newtInfo: {
      newtSeriesId: newtSeriesData?._id ?? null,
      newtCreatorIds: [newtSeriesData?.seriesCreator?._id] ?? null,
      newtContentIds: _.map(newtSeriesData?.content, (video) => video._id),
    },
    seriesInfo: {
      source: newtSeriesData?.source ?? null,
      playlistId: newtSeriesData?.sourceId ?? null,
      title: newtSeriesData?.name ?? null,
      description: newtSeriesData?.description ?? null,
      // channelId: not available
      // datePublished: N/A
      // thumbnails: N/A
    },
  };

  // Format videos in series
  const formattedVideos = _.map(newtSeriesData?.content, (video, index) => {
    return {
      name: video.name ?? null,
      description: video.description ?? null,
      authors: _.map(
        newtSeriesData?.contentCreators,
        (creator) => creator.name
      ),
      thumbnailUrl: video.thumbnailUrl ?? null,
      type: video.type ?? null,
      partOfSeries: true,
      shelf: "Want to Learn",
      startFinishDates: [],
      isFromNewtDiscover: true,
      newtInfo: {
        newtContentId: video._id,
        newtCreatorIds: video.contentCreators, // This is what differs from formatNewtContent()
        newtSeriesId: newtSeriesData?._id,
      },
      videoInfo: {
        source: video.source ?? null,
        videoId: video.sourceId ?? null,
        playlistId: newtSeriesData?.sourceId ?? null,
        playlistPosition: index + 1 ?? null,
        title: video.name ?? null,
        description: video.description ?? null,
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

// Newt playlist ==> User playlist
export function formatNewtPlaylist(newtPlaylistData: any) {
  const playlistData = {
    name: newtPlaylistData?.name,
    isNewtPlaylist: true,
    newtInfo: {
      newtPlaylistId: newtPlaylistData?._id,
      newtCreatorIds: _.map(
        newtPlaylistData?.creators,
        (creator) => creator._id
      ),
    },
  };

  const playlistContentData = _.map(newtPlaylistData?.content, (content) => {
    const contentData = formatNewtContent(content);
    return contentData;
  });

  return { playlistData, playlistContentData };
}

// Format Newt Content => user content in Library
export function formatNewtContent(newtContentData: any) {
  if (!newtContentData) {
    return null;
  }

  let contentData: any = {
    name: newtContentData?.name ?? null,
    description: newtContentData?.description ?? null,
    authors: _.map(
      newtContentData?.contentCreators,
      (creator) => creator?.name
    ),
    thumbnailUrl: newtContentData?.thumbnailUrl ?? null,
    type: newtContentData?.type ?? null,
    shelf: "Want to Learn",
    playlists: [],
    startFinishDates: [],
    // Ignore part of series for now. Won't show on Shelves if true.
    // partOfSeries: newtContentData?.partOfSeries,
    isFromNewtDiscover: true,
    newtInfo: {
      newtContentId: newtContentData._id,
      newtCreatorIds: _.map(
        newtContentData?.contentCreators,
        (creator) => creator._id
      ),
      newtSeriesId:
        _.map(newtContentData?.series, (series) => series._id)[0] ?? null,
    },
  };

  if (newtContentData?.type === "book") {
    contentData.bookInfo = {
      bookId: newtContentData?.sourceId ?? null,
      title: newtContentData?.name ?? null,
      description: newtContentData?.description ?? null,
      authors: _.map(
        newtContentData?.contentCreators,
        (creator) => creator?.name
      ),
      pageCount: newtContentData?.pageCount ?? null,
      datePublished: newtContentData?.contentPublishDate,
      publisher: newtContentData?.contentPublisher,
      industryIdentifiers: newtContentData?.industryIdentifiers,
      // subtitle: N/A
      // imageLinks: N/A
    };
  }

  if (newtContentData?.type === "video") {
    contentData.videoInfo = {
      source: newtContentData?.source ?? null,
      videoId: newtContentData?.sourceId ?? null,
      title: newtContentData?.name ?? null,
      description: newtContentData?.description ?? null,
      // playlistId: N/A
      // playlistPosition: N/A
      // channelId: N/A,
      // datePublished: N/A,
      // thumbnails: N/A,
    };
  }

  return contentData;
}
