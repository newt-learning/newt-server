import React from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
// API
import { useFetchNewtPlaylistBySlug } from "../../api/newtContent";
import { useCreatePlaylistFromNewtPlaylist } from "../../api/playlists";
// Components
import {
  Navbar,
  Badge,
  ContentInbox,
  formatNewtPlaylist,
} from "../../components";
// Styling
import styles from "./NewtPlaylists.module.css";

const NewtPlaylistPage = () => {
  //@ts-ignore
  const { playlistSlug } = useParams();

  // Toasts
  const { addToast } = useToasts();

  const { data, isLoading, isError } = useFetchNewtPlaylistBySlug(playlistSlug);
  const [
    createPlaylistFromNewtPlaylist,
    { isLoading: isCreating },
  ] = useCreatePlaylistFromNewtPlaylist();

  const handleAddNewtPlaylist = async () => {
    const { playlistData, playlistContentData } = formatNewtPlaylist(data);

    await createPlaylistFromNewtPlaylist(
      { playlistData, playlistContentData },
      {
        // Toast notifications on success and error
        onSuccess: () =>
          addToast(`${data?.name} Playlist has been added to your Library`, {
            appearance: "success",
          }),
        onError: () =>
          addToast(
            "Sorry, there was an error adding this playlist. Please try again.",
            { appearance: "error" }
          ),
      }
    );
  };

  return (
    <section>
      <Navbar />
      {isError ? (
        "Sorry, there was an error"
      ) : (
        <>
          <div
            className={styles.infoContainer}
            style={{ backgroundColor: data?.colors?.backgroundColor }}
          >
            <h1>
              {data?.name}{" "}
              <Badge size="large" className={styles.badge}>
                Newt Playlist
              </Badge>
            </h1>
            <p>{data?.description}</p>
          </div>
          <ContentInbox
            title={data?.name}
            contentData={data?.content}
            isLoading={isLoading}
            className={styles.parentContainer}
            addToLibrary="newt-playlist"
            onAddToLibrary={handleAddNewtPlaylist}
          />
        </>
      )}
    </section>
  );
};

export default NewtPlaylistPage;
