import React, { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
// API
import {
  useFetchPlaylist,
  useUpdatePlaylist,
  useDeletePlaylist,
} from "../../api/playlists";
// Components
import { ContentInbox, DeleteItemModal } from "../../components";
// Types
import { OptionsDropdownItemType } from "../../components/OptionsDropdown";
import styles from "./Playlists.module.css";
import Modal from "react-bootstrap/Modal";
import PlaylistForm, { PlaylistFormValues } from "./PlaylistForm";

const IndividualPlaylistPage = () => {
  // @ts-ignore
  const { playlistId } = useParams();
  // Get name of playlist from location state
  const location: any = useLocation();
  const { state: locationState } = location;

  const history = useHistory();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { isLoading, data, isError } = useFetchPlaylist(playlistId);
  const [updatePlaylist, { error: updatePlaylistError }] = useUpdatePlaylist();
  const [
    deletePlaylist,
    { isLoading: isDeleting, error: deletePlaylistError },
  ] = useDeletePlaylist();

  const dropdownMenu: OptionsDropdownItemType[] = [
    {
      type: "item",
      title: "Edit",
      onClick: () => setShowEditModal(true),
    },
    {
      type: "divider",
    },
    {
      type: "item",
      title: "Delete",
      onClick: () => setShowDeleteModal(true),
    },
  ];

  const handleEditPlaylist = (values: PlaylistFormValues) => {
    updatePlaylist({ playlistId, data: values });
    setShowEditModal(false);
  };
  const handleDeletePlaylist = async () => {
    await deletePlaylist(playlistId);
    // Close modal
    setShowDeleteModal(false);
    // Go back to Playlists page
    history.goBack();
  };

  if (updatePlaylistError) {
    console.log(updatePlaylistError);
  }
  if (deletePlaylistError) {
    console.error(deletePlaylistError);
  }

  return (
    <>
      <ContentInbox
        title={data?.name || locationState?.name || "..."}
        contentData={data?.content}
        showOptionsDropdown={true}
        optionsDropdownMenu={dropdownMenu}
        backButtonStyle={styles.backBtn}
        isLoading={isLoading}
        isError={isError}
      />
      <Modal
        size="lg"
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        backdrop="static"
        animation={false}
      >
        <Modal.Header closeButton>Edit Playlist</Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <PlaylistForm
            initialValues={{
              name: data ? data.name : "",
            }}
            onSubmit={handleEditPlaylist}
            buttonTitle="Edit"
            buttonCategory="secondary"
          />
        </Modal.Body>
      </Modal>
      <DeleteItemModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        itemToDelete="playlist"
        onDelete={handleDeletePlaylist}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default IndividualPlaylistPage;
