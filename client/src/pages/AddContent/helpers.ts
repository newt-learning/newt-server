// Youtube URL parser which only does full and short links, among others.
// See: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export function validateYoutubeVideoUrl(url: string) {
  const regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regex);

  // Get videoId from url if it exists
  const videoId = match && match[1].length === 11 ? match[1] : null;

  return videoId;
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
