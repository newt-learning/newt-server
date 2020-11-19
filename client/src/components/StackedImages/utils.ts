import { getBestThumbnail } from "../../pages/AddContent/helpers";
import { ImageUrlType } from "./index"

export function getFirstThreeThumbnailsForSeries(
  content: any,
  apiEndpoint: "YouTube" | "Newt"
) {
  // Get the first 3 thumbnail URLs to display in the stacked image
  let thumbnailUrls: ImageUrlType[] = [];

  // Max of 3 images
  const numImages = content.length > 3 ? 3 : content.length;

  for (let i = 0; i < numImages; i++) {
    const alt =
      apiEndpoint === "YouTube"
        ? `Thumbnail for ${content[i]?.snippet?.title}`
        : apiEndpoint === "Newt"
        ? `Thumbnail for ${content[i]?.name}`
        : undefined;
    const bestThumbnail =
      apiEndpoint === "YouTube"
        ? getBestThumbnail(content[i]?.snippet?.thumbnails)?.url
        : apiEndpoint === "Newt" ? content[i]?.thumbnailUrl : undefined;
        
    if (bestThumbnail) {
      thumbnailUrls.push({ url: bestThumbnail, alt })
    }
  }

  return thumbnailUrls;
}