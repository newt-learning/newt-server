import React, { useState } from "react";
import _ from "lodash";
// API
import {
  useFetchAllPlaylists,
  useAddContentToPlaylists,
  useRemoveContentFromPlaylists,
} from "../../api/playlists";
import { useUpdateContent } from "../../api/content";
// Components
import Select from "react-select";
import { Button } from "../../components";

export type PlaylistSelectOptionType =
  | {
      id: string;
      value: string;
      label: string;
    }
  | undefined;
interface SelectPlaylistsFormProps {
  initialPlaylists: PlaylistSelectOptionType[] | [] | undefined;
  // initialPlaylists: any;
  contentId: string;
  closeModal: () => void;
}

const SelectPlaylistsForm = ({
  initialPlaylists,
  contentId,
  closeModal,
}: SelectPlaylistsFormProps) => {
  const [selectedOptions, setSelectedOptions] = useState<any>(initialPlaylists);
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

  const formattedPlaylists = allPlaylists?.map((playlist: any) => ({
    id: playlist._id,
    value: playlist.name,
    label: playlist.name,
  }));

  // Pretty much identical to mobile
  const handleSubmit = async () => {
    // Only get the playlist ids from the selected options
    const selectedPlaylistsIds = selectedOptions?.map(
      (option: any) => option.id
    );
    const initialPlaylistsIds = _.map(
      initialPlaylists,
      (playlist: PlaylistSelectOptionType) => playlist?.id
    );

    console.log(initialPlaylistsIds);

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
    updateContent({ contentId, data: { playlists: selectedPlaylistsIds } });
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

  return (
    <>
      <h4>Select playlist(s)</h4>
      <Select
        isMulti
        name="playlists"
        defaultValue={selectedOptions}
        onChange={(options) => setSelectedOptions(options)}
        options={formattedPlaylists}
        closeMenuOnSelect={false}
        isLoading={isLoading}
        styles={colorStyles}
        style={{ width: "100%" }}
      />
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
