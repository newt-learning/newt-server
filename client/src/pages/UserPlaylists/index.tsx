import React, { useState } from "react";
import _ from "lodash";
import { useToasts } from "react-toast-notifications";
// API
import { useFetchAllPlaylists, useCreatePlaylist } from "../../api/playlists";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  MessageBox,
  Button,
  Loader,
} from "../../components";
import PlaylistCard from "./PlaylistCard";
import PlaylistForm from "./PlaylistForm";
import Modal from "react-bootstrap/Modal";
// Hooks
import useMetaTags from "../../hooks/useMetaTags";
// Styling
import styles from "./Playlists.module.css";

interface PlaylistData {
  _id: string;
  name: string;
  isNewtPlaylist?: boolean;
}

interface CreatePlaylistValues {
  name: string;
}

const PlaylistsPage = () => {
  useMetaTags({
    title: "Playlists / Newt",
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const { addToast } = useToasts();

  const { data, status, error } = useFetchAllPlaylists();
  const [createPlaylist, { error: createPlaylistError }] = useCreatePlaylist();

  const handleCreatePlaylist = (values: CreatePlaylistValues) => {
    createPlaylist(values, {
      onSuccess: () => addToast("Playlist created", { appearance: "success" }),
      onError: () =>
        addToast("Sorry, there was an error creating the playlist", {
          appearance: "error",
        }),
    });
    setShowCreateModal(false);
  };

  if (createPlaylistError) {
    console.log(createPlaylistError);
  }

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Playlists</h2>
        <Button category="success" onClick={() => setShowCreateModal(true)}>
          Create playlist
        </Button>
      </AppHeaderContainer>
      <AppContentContainer
        className={!_.isEmpty(data) ? styles.container : undefined}
      >
        {status === "loading" ? (
          <Loader size={12} />
        ) : error ? (
          "Error"
        ) : _.isEmpty(data) ? (
          // UI for No playlists
          <MessageBox>
            No playlists yet.{" "}
            <span
              className={styles.create}
              onClick={() => setShowCreateModal(true)}
            >
              Create
            </span>{" "}
            your first playlist!
          </MessageBox>
        ) : (
          // Cards for each playlist
          data.map(({ _id, name, isNewtPlaylist }: PlaylistData) => (
            <PlaylistCard
              key={_id}
              id={_id}
              name={name}
              isNewtPlaylist={isNewtPlaylist ?? false}
            />
          ))
        )}
      </AppContentContainer>
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        size="lg"
        backdrop="static"
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <PlaylistForm onSubmit={handleCreatePlaylist} />
        </Modal.Body>
      </Modal>
    </AppMainContainer>
  );
};

export default PlaylistsPage;
