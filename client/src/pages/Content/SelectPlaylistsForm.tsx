import React, { useState } from "react";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
// API
import {
  useFetchAllPlaylists,
  useAddContentToPlaylists,
  useRemoveContentFromPlaylists,
  useCreatePlaylist,
} from "../../api/playlists";
import { useUpdateContent } from "../../api/content";
// Components
import CreatableSelect from "react-select/creatable";
import { Button } from "../../components";
// Helpers
import { createPlaylistSchema } from "../UserPlaylists/PlaylistForm";

export type PlaylistSelectOptionType =
  | {
      id: string;
      value: string;
      label: string;
    }
  | undefined;
interface SelectPlaylistsFormProps {
  initialPlaylists: PlaylistSelectOptionType[] | [] | undefined;
  contentId: string;
  closeModal: () => void;
}

const SelectPlaylistsForm = ({
  initialPlaylists,
  contentId,
  closeModal,
}: SelectPlaylistsFormProps) => {
  const [selectedOptions, setSelectedOptions] = useState<any>(initialPlaylists);
  const [invalidPlaylistError, setInvalidPlaylistError] = useState(null);

  // Toasts
  const { addToast } = useToasts();

  // data API stuff
  const { data: allPlaylists, isLoading } = useFetchAllPlaylists();
  const [updateContent, { isLoading: contentIsUpdating }] = useUpdateContent();
  const [
    addContentToPlaylists,
    { isLoading: isAddingPlaylists },
  ] = useAddContentToPlaylists();
  const [
    removeContentFromPlaylists,
    { isLoading: isRemovingPlaylists },
  ] = useRemoveContentFromPlaylists();
  const [
    createPlaylist,
    { isLoading: isCreatingPlaylist },
  ] = useCreatePlaylist();

  const formattedPlaylists = allPlaylists?.map((playlist: any) => ({
    id: playlist._id,
    value: playlist.name,
    label: playlist.name,
  }));

  // Pretty much identical to mobile
  const handleSubmit = async () => {
    // Only get the playlist ids from the selected options
    const selectedPlaylistsIds = _.map(
      selectedOptions,
      (option: any) => option.id
    );
    const initialPlaylistsIds = _.map(
      initialPlaylists,
      (playlist: PlaylistSelectOptionType) => playlist?.id
    );

    let playlistsToAdd: any = [];
    let playlistsToRemove: any = [];

    // For each of the playlists selected, if they're not in the existing playlists,
    // only then add it to the playlistsToAdd array. Only those playlists will then
    // have the content added to it to avoid duplication.
    selectedPlaylistsIds.forEach((playlistId: string) => {
      if (!_.includes(initialPlaylistsIds, playlistId)) {
        playlistsToAdd.push(playlistId);
      }
    });

    // For each of the existing playlists, if they're not in the selected playlists,
    // then add it to the playlistsToRemove array. It will be used to remove the
    // playlist <==> content associations.
    initialPlaylistsIds.forEach((playlistId: string | undefined) => {
      if (!_.includes(selectedPlaylistsIds, playlistId)) {
        playlistsToRemove.push(playlistId);
      }
    });

    // Send request to add the content to the newly selected playlists, remove
    // playlists that were unselected, and update the content by adding the playlists
    // to it
    updateContent(
      { contentId, data: { playlists: selectedPlaylistsIds } },
      {
        onSuccess: () =>
          addToast("Playlists updated", { appearance: "success" }),
        onError: () =>
          addToast("Sorry, there was an error updating the playlist", {
            appearance: "error",
          }),
      }
    );
    await addContentToPlaylists({ playlistIds: playlistsToAdd, contentId });
    await removeContentFromPlaylists({
      playlistIds: playlistsToRemove,
      contentId,
    });

    // Close modal -- maybe I should move this whole handler to the parent, how
    // I usually do
    closeModal();
  };

  const colorStyles = {
    option: (styles: any, { isFocused }: any) => {
      return {
        ...styles,
        backgroundColor: isFocused ? "#ffeff3" : "white",
      };
    },
    multiValue: (styles: any) => ({
      ...styles,
      backgroundColor: "#ffeff3",
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: "#ff386b",
      fontSize: "1rem",
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: "#ff386b",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#ff386b",
        color: "#ffeff3",
      },
    }),
  };

  // Handle creating a new playlist from the select component
  const handleCreatePlaylist = async (newPlaylist: string) => {
    createPlaylistSchema
      .validate({ name: newPlaylist })
      .then((data) => {
        if (data) {
          createPlaylist(data);
        }
      })
      .catch((error) => setInvalidPlaylistError(error.message));
  };

  return (
    <>
      <h4>Select playlist(s)</h4>
      <CreatableSelect
        isMulti
        name="playlists"
        defaultValue={selectedOptions}
        onChange={(options) => setSelectedOptions(options)}
        // Reset error message on focus
        onFocus={() => setInvalidPlaylistError(null)}
        onCreateOption={handleCreatePlaylist}
        options={formattedPlaylists}
        closeMenuOnSelect={false}
        isLoading={isLoading || isCreatingPlaylist}
        styles={colorStyles}
        style={{ width: "100%" }}
      />
      {/* Error message if playlist validation fails */}
      {invalidPlaylistError ? (
        <div style={{ fontSize: "var(--FS-s", color: "var(--red-500" }}>
          Couldn't create the playlist. Name must be at most 24 characters.
        </div>
      ) : null}
      <Button
        category="success"
        onClick={handleSubmit}
        isLoading={
          contentIsUpdating || isAddingPlaylists || isRemovingPlaylists
        }
        style={{
          display: "flex",
          margin: "1rem auto",
          justifyContent: "center",
          width: "40%",
        }}
      >
        Confirm
      </Button>
    </>
  );
};

export default SelectPlaylistsForm;
