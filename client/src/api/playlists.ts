import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache } from "react-query";

interface PlaylistData {
  name: string;
}
interface NewtToUserPlaylist {
  playlistData: any;
  playlistContentData: any;
}
interface UpdatePlaylistParams {
  playlistId: string;
  data: PlaylistData;
}
interface AddRemoveContent {
  contentId: string;
  playlistIds: string[];
}
interface AddRemoveSeries {
  seriesId: string;
  playlistIds: string[];
}

// API calls
const fetchAllPlaylists = async () => {
  const { data } = await newtApi.get("/playlists");
  return data;
};
const fetchPlaylist = async (queryKey: any, playlistId: string) => {
  const { data } = await newtApi.get(`/playlists/${playlistId}`);
  return data;
};
const createPlaylist = async (data: PlaylistData) => {
  await newtApi.post("/playlists/create", data);
};
const createPlaylistFromNewtPlaylist = async (data: NewtToUserPlaylist) => {
  await newtApi.post("/playlists/create-from-newt", data);
};
const updatePlaylist = async ({ playlistId, data }: UpdatePlaylistParams) => {
  await newtApi.put(`/playlists/${playlistId}/update`, data);
};
const addContentToPlaylists = async (data: AddRemoveContent) => {
  await newtApi.put("/playlists/add-content", data);
};
const addSeriesToPlaylists = async (data: AddRemoveSeries) => {
  await newtApi.put("/playlists/add-series", data);
};
const removeContentFromPlaylists = async (data: AddRemoveContent) => {
  await newtApi.put("/playlists/remove-content", data);
};
const removeSeriesFromPlaylists = async (data: AddRemoveSeries) => {
  await newtApi.put("/playlists/remove-series", data);
};
// Deletes playlist and associated content
const deletePlaylist = async (playlistId: string) => {
  await newtApi.delete(`/playlists/${playlistId}`);
};

// React-query bindings
export function useFetchAllPlaylists() {
  return useQuery("playlists", fetchAllPlaylists);
}
export function useFetchPlaylist(playlistId: string) {
  return useQuery(["playlist", playlistId], fetchPlaylist);
}
export function useCreatePlaylist() {
  return useMutation(createPlaylist, {
    onSettled: () => queryCache.invalidateQueries("playlists"),
  });
}
export function useCreatePlaylistFromNewtPlaylist() {
  return useMutation(createPlaylistFromNewtPlaylist, {
    onSettled: () => queryCache.invalidateQueries("playlists"),
  });
}
export function useUpdatePlaylist() {
  return useMutation(updatePlaylist, {
    onSettled: () => queryCache.invalidateQueries("playlist"),
  });
}
export function useAddContentToPlaylists() {
  return useMutation(addContentToPlaylists, {
    onSettled: () => queryCache.invalidateQueries("playlists"),
  });
}
export function useAddSeriesToPlaylists() {
  return useMutation(addSeriesToPlaylists, {
    onSettled: () => queryCache.invalidateQueries("playlists"),
  });
}
export function useRemoveContentFromPlaylists() {
  return useMutation(removeContentFromPlaylists, {
    onSettled: () => queryCache.invalidateQueries("playlists"),
  });
}
export function useRemoveSeriesFromPlaylists() {
  return useMutation(removeSeriesFromPlaylists, {
    onSettled: () => queryCache.invalidateQueries("playlists"),
  });
}
export function useDeletePlaylist() {
  return useMutation(deletePlaylist, {
    onSettled: () => queryCache.invalidateQueries("playlists"),
  });
}
