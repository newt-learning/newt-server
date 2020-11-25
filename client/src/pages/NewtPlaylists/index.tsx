import React from "react";
import { useParams } from "react-router-dom";
// API
import { useFetchNewtPlaylistBySlug } from "../../api/newtContent";
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

  const { data, isLoading, isError } = useFetchNewtPlaylistBySlug(playlistSlug);

  const handleAddNewtPlaylist = async (values: any) => {
    const formattedPlaylist = formatNewtPlaylist(data);

    console.log(formattedPlaylist);
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
