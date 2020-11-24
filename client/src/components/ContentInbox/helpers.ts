import { AddToLibraryFormValues } from "./AddToLibrary";

interface NewtDiscoverSeriesData {
  title: string;
  creators: string | undefined;
  videos: any[];
  formData: AddToLibraryFormValues;
}

export function formatNewtDiscoverSeries({
  title,
  creators,
  videos,
  formData,
}: NewtDiscoverSeriesData) {
  return {
    title,
    authors: [creators],
  };
}
