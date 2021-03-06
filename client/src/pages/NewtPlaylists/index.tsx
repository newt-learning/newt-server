import React from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
// API
import { useFetchNewtPlaylistBySlug } from "../../api/newtContent";
import { useCreatePlaylistFromNewtPlaylist } from "../../api/playlists";
// Components
import { Link } from "react-router-dom";
import {
  Navbar,
  Badge,
  ContentInbox,
  formatNewtPlaylist,
} from "../../components";
// Hooks
import useMetaTags from "../../hooks/useMetaTags";
// Styling
import styles from "./NewtPlaylists.module.css";

const NewtPlaylistPage = () => {
  //@ts-ignore
  const { playlistSlug } = useParams();

  // Toasts
  const { addToast } = useToasts();

  const { data, isLoading, isError } = useFetchNewtPlaylistBySlug(playlistSlug);
  const [createPlaylistFromNewtPlaylist] = useCreatePlaylistFromNewtPlaylist();

  useMetaTags({
    title: data?.name ? `${data.name} Playlist / Newt` : "Discover / Newt",
  });

  // Handler to add newt playlist to user library
  const handleAddNewtPlaylist = async () => {
    const { playlistData, playlistContentData } = formatNewtPlaylist(data);

    await createPlaylistFromNewtPlaylist(
      { playlistData, playlistContentData },
      {
        // Toast notifications on success and error
        onSuccess: () =>
          addToast(
            <div>
              {`${data?.name} Playlist has been added to your `}
              <Link
                to="/playlists"
                style={{
                  color: "var(--lightGreen-900)",
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >
                Library
              </Link>
            </div>,
            {
              appearance: "success",
            }
          ),
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
