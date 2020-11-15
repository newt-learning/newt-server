import newtApi from "./newtApi";
import { useQuery, useMutation, queryCache, MutationOptions } from "react-query";

interface PlaylistData {
  name: string;
}

interface UpdatePlaylistParams {
  playlistId: string;
  data: PlaylistData;
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
const updatePlaylist = async ({ playlistId, data }: UpdatePlaylistParams) => {
  await newtApi.put(`/playlists/${playlistId}/update`, data);
};
const addContentToPlaylists = async (data: any) => {
  await newtApi.put('/playlists/add-content', data)
}
const removeContentFromPlaylists = async (data: any) => {
  await newtApi.put("/playlists/remove-content", data)
}
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
export function useCreatePlaylist(options?: MutationOptions<void, PlaylistData, Error, unknown> | undefined) {
  return useMutation(createPlaylist, {
    onSettled: () => queryCache.invalidateQueries("playlists"),
    ...options
  });
}
export function useUpdatePlaylist() {
  return useMutation(updatePlaylist, {
    onSettled: () => queryCache.invalidateQueries("playlist"),
  });
}
export function useAddContentToPlaylists() {
  return useMutation(addContentToPlaylists, {
    onSettled: () => queryCache.invalidateQueries("playlists")
  })
}
export function useRemoveContentFromPlaylists() {
  return useMutation(removeContentFromPlaylists, {
    onSettled: () => queryCache.invalidateQueries("playlists")
  })
}
export function useDeletePlaylist() {
  return useMutation(deletePlaylist, {
    onSettled: () => queryCache.invalidateQueries("playlists"),
  });
}
