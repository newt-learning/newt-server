import axios from "axios";
import keys from "../config/keys";
import _ from "lodash";
import { getBestThumbnail } from "../pages/AddContent/helpers";

export async function getYoutubeVideoInfo(videoId: string) {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          id: videoId,
          part: "snippet",
          // @ts-ignore
          key: keys.youtubeApiKey,
        },
      }
    );

    const {
      data: { items },
    } = res;
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
    } = items[0];

    const bestThumbnail = getBestThumbnail(thumbnails);

    // Reorganize data closer to the model schema
    return {
      name: _.isString(title) ? title : null,
      description: _.isString(description) ? description : null,
      authors: _.isString(channelTitle) ? [channelTitle] : null,
      thumbnailUrl: bestThumbnail ? bestThumbnail.url : null,
      type: "video",
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
  } catch (error) {
    throw new Error(error);
  }
}

export async function getYoutubePlaylistInfo(playlistId: string) {
  try {
    // Get playlist information from Youtube (title, description, etc.)
    const playlistRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlists",
      {
        params: {
          id: playlistId,
          part: "snippet",
          // @ts-ignore
          key: keys.youtubeApiKey,
        },
      }
    );

    // If there's a result, move on to next steps, otherwise return null
    if (playlistRes.data.pageInfo.totalResults === 1) {
      const {
        data: { items },
      } = playlistRes;
      const youtubePlaylist = items[0];

      // Reorganize data closer to the model schema
      let seriesInfo = {
        name: youtubePlaylist.snippet.title,
        description: youtubePlaylist.snippet.description,
        authors: [youtubePlaylist.snippet.channelTitle],
        type: "series",
        contentType: "video",
        videos: [],
        seriesInfo: {
          source: "youtube",
          playlistId: youtubePlaylist.id,
          title: youtubePlaylist.snippet.title,
          description: youtubePlaylist.snippet.description,
          channelId: youtubePlaylist.snippet.channelId,
          datePublished: youtubePlaylist.snippet.publishedAt,
          thumbnails: youtubePlaylist.snippet.thumbnails,
        },
      };

      // Get information about the videos in the playlist (playlist items)
      const playlistItemsRes = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            playlistId,
            part: "snippet",
            maxResults: process.env.NODE_ENV === "production" ? 50 : 5,
            // @ts-ignore
            key: keys.youtubeApiKey,
          },
        }
      );

      // Add the videos to the seriesInfo object
      seriesInfo.videos = playlistItemsRes.data.items;

      return seriesInfo;
    }

    return null;
  } catch (error) {
    throw new Error(error);
  }
}
