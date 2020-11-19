// Need to move as much of this as possible to server so it isn't repeated from
// mobile app front-end
import _ from "lodash";
import moment from "moment";

// Youtube URL parser which only does full and short links, among others.
// See: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export function validateYoutubeVideoUrl(url: string) {
  const regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regex);

  // Get videoId from url if it exists
  const videoId = match && match[1].length === 11 ? match[1] : null;

  return videoId;
}

// Youtube playlist URL parser
// See: https://stackoverflow.com/questions/5288941/validating-youtube-playlist-url-using-regex
export function validateYoutubePlaylistUrl(url: string) {
  const regex = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
  const match = url.match(regex);

  // Get playlistId from url if it exists
  const playlistId = match && match[2] ? match[2] : null;

  return playlistId;
}

// Function that returns the highest quality thumbnail from YouTube API response,
// or null if it's empty
export function getBestThumbnail(thumbnails: any) {
  if (!thumbnails) {
    return null;
  }

  const options = ["maxres", "standard", "high", "medium", "default"];
  let bestOption = null;

  for (let i = 0; i < options.length; i++) {
    if (thumbnails[options[i]]) {
      bestOption = thumbnails[options[i]];
      break;
    }
  }

  return bestOption;
}

// Extract only relevant video information from result of Youtube API + add
// other content info like shelf and playlists
export function extractAndAssembleVideoInfo(
  videoInfo: any,
  shelf: string,
  playlists: any,
  startDate: Date,
  finishDate: Date
) {
  const {
    id,
    snippet: {
      title,
      description,
      channelTitle,
      thumbnails,
      channelId,
      publishedAt,
    },
  } = videoInfo;

  const bestThumbnail = getBestThumbnail(thumbnails);

  let data: any = {
    name: _.isString(title) ? title : null,
    description: _.isString(description) ? description : null,
    authors: _.isString(channelTitle) ? [channelTitle] : null,
    thumbnailUrl: bestThumbnail ? bestThumbnail.url : null,
    type: "video",
    shelf,
    playlists,
    videoInfo: {
      source: "youtube",
      videoId: _.isString(id) ? id : null,
      title: _.isString(title) ? title : null,
      description: _.isString(description) ? description : null,
      channelId: _.isString(channelId) ? channelId : null,
      thumbnails: !_.isEmpty(thumbnails) ? thumbnails : null,
      datePublished: _.isString(publishedAt) ? publishedAt : null,
    },
  };

  // If the selected shelf is Currently Learning, set first date started as now
  if (shelf === "Currently Learning") {
    data.startFinishDates = [{ dateStarted: Date.now() }];
  }

  // If the selected shelf is Finished, add the dateCompleted field
  if (shelf === "Finished Learning") {
    data.startFinishDates = [
      { dateStarted: startDate, dateCompleted: finishDate },
    ];
  }

  return data;
}

// Extract only relevant playlist and video information from result of Youtube
// API + add other content info like shelf
export function extractAndAssemblePlaylistInfo(
  seriesInfo: any,
  shelf: string,
  startDate: Date,
  finishDate: Date
) {
  const { videos } = seriesInfo;
  const seriesThumbnails = seriesInfo.seriesInfo.thumbnails;
  const bestSeriesThumbnail = getBestThumbnail(seriesThumbnails);

  let formattedSeriesInfo = { ...seriesInfo };

  // Add best thumbnail for series
  formattedSeriesInfo.thumbnailUrl = bestSeriesThumbnail
    ? bestSeriesThumbnail.url
    : null;
  // Default shelf to "Want to Learn"
  formattedSeriesInfo.shelf = shelf;

  // If the selected shelf is Currently Learning, set first date started as now
  if (shelf === "Currently Learning") {
    formattedSeriesInfo.startFinishDates = [{ dateStarted: Date.now() }];
  }

  // If the selected shelf is Finished, add the dateCompleted field
  if (shelf === "Finished Learning") {
    formattedSeriesInfo.startFinishDates = [
      { dateStarted: startDate, dateCompleted: finishDate },
    ];
  }

  // Format the videos from YouTube's API response to content schema
  if (!_.isEmpty(videos)) {
    const formattedVideos = _.map(videos, (video) => {
      const {
        snippet: {
          title,
          description,
          channelTitle,
          channelId,
          playlistId,
          position,
          publishedAt,
          thumbnails,
          resourceId: { videoId },
        },
      } = video;

      const bestThumbnail = getBestThumbnail(thumbnails);

      let startFinishDates: any = [];

      // If the selected shelf is Currently Learning, set first date started as now
      if (shelf === "Currently Learning") {
        startFinishDates = [{ dateStarted: Date.now() }];
      }

      // If the selected shelf is Finished, add the dateCompleted field
      if (shelf === "Finished Learning") {
        startFinishDates = [
          { dateStarted: startDate, dateCompleted: finishDate },
        ];
      }

      return {
        name: _.isString(title) ? title : null,
        description: _.isString(description) ? description : null,
        authors: _.isString(channelTitle) ? [channelTitle] : null,
        thumbnailUrl: bestThumbnail ? bestThumbnail.url : null,
        type: "video",
        partOfSeries: true, // It's part of a series
        shelf,
        startFinishDates,
        videoInfo: {
          source: "youtube",
          videoId: _.isString(videoId) ? videoId : null,
          playlistId: _.isString(playlistId) ? playlistId : null,
          playlistPosition: _.isNumber(position) ? position : null,
          title: _.isString(title) ? title : null,
          description: _.isString(description) ? description : null,
          channelId: _.isString(channelId) ? channelId : null,
          thumbnails: !_.isEmpty(thumbnails) ? thumbnails : null,
          datePublished: _.isString(publishedAt) ? publishedAt : null,
        },
      };
    });

    // Replace videos field in seriesInfo object with the formatted videos
    formattedSeriesInfo.videos = formattedVideos;
    return formattedSeriesInfo;
  } else {
    return null;
  }
}

// Extract only relevant book information from result of Google Books API
export function extractAndAssembleBookInfo(
  bookObj: any,
  shelf: string,
  playlists: any,
  startDate: Date,
  finishDate: Date
) {
  const { id } = bookObj;
  const {
    title,
    subtitle,
    authors,
    description,
    imageLinks,
    pageCount,
    industryIdentifiers,
    publisher,
    publishedDate,
  } = bookObj.volumeInfo;

  let isbns = {};
  let formattedDate = "";

  // Convert industry identifiers (ISBNS) from array of objects to object
  if (!_.isEmpty(industryIdentifiers)) {
    industryIdentifiers.forEach(
      //@ts-ignore
      ({ type, identifier }) => (isbns[type] = identifier)
    );
  }

  // Check if the date passed is a string (some books had 101-01-01 as a date
  // for some reason, like what is this Google Books API?)
  if (_.isString(publishedDate) && publishedDate !== "101-01-01") {
    // If it's just the year, return that, otherwise format it
    formattedDate =
      publishedDate.length === 4
        ? publishedDate
        : moment(publishedDate).format("DD MMM, YYYY");
  }

  // Match format of database content model
  const data: any = {
    name: _.isString(title) ? title : null,
    description: _.isString(description) ? description : null,
    authors: _.isArray(authors) ? authors : null,
    thumbnailUrl: checkThumbnailExistence(bookObj.volumeInfo),
    type: "book",
    shelf,
    playlists,
    bookInfo: {
      bookId: id,
      title: _.isString(title) ? title : null,
      subtitle: _.isString(subtitle) ? subtitle : null,
      authors: _.isArray(authors) ? authors : null,
      description: _.isString(description) ? description : null,
      imageLinks: !_.isEmpty(imageLinks) ? imageLinks : null,
      pageCount: _.isNumber(pageCount) ? pageCount : null,
      industryIdentifiers: !_.isEmpty(isbns) ? isbns : null,
      publisher: _.isString(publisher) ? publisher : null,
      datePublished: _.isString(formattedDate) ? formattedDate : null,
    },
  };

  // If the selected shelf is Currently Learning, set first date started as now
  if (shelf === "Currently Learning") {
    data.startFinishDates = [{ dateStarted: Date.now() }];
  }

  // If the selected shelf is Finished, add the dateCompleted field
  if (shelf === "Finished Learning") {
    data.startFinishDates = [
      { dateStarted: startDate, dateCompleted: finishDate },
    ];
  }

  return data;
}

// Function to check if a thumbnail url or the image links object from Google Books API exists
export const checkThumbnailExistence = (volumeInfo: any) => {
  if (volumeInfo?.imageLinks) {
    if (volumeInfo?.imageLinks?.thumbnail) {
      return volumeInfo.imageLinks.thumbnail;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
