import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./PlaylistCard.module.css";

const cx = classnames.bind(styles);

interface AddPlaylistCardProps {
  onClick: () => void;
}
interface PlaylistCardProps {
  id: string;
  name: string;
  variant: "card" | "pill";
  isNewtPlaylist?: boolean;
}

export const AddPlaylistCard = ({ onClick }: AddPlaylistCardProps) => {
  return (
    <div
      className={cx(styles.container, styles.pill, styles.addPill)}
      onClick={onClick}
    >
      <h6 style={{ marginBottom: 0 }}>+ Add playlist</h6>
    </div>
  );
};

const PlaylistCard = ({
  id,
  name,
  variant,
  isNewtPlaylist,
}: PlaylistCardProps) => {
  return (
    <Link to={{ pathname: `/playlists/${id}`, state: { name } }}>
      <div
        className={cx({
          container: true,
          "newt-playlist": isNewtPlaylist,
          card: variant === "card",
          pill: variant === "pill",
        })}
      >
        {variant === "card" ? (
          <h4>{name}</h4>
        ) : (
          <h6 style={{ marginBottom: 0 }}>{name}</h6>
        )}
      </div>
    </Link>
  );
};

PlaylistCard.defaultProps = {
  variant: "card",
};

export default PlaylistCard;
