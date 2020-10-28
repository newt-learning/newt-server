import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames/bind";
import styles from "./TopicCard.module.css";

const cx = classnames.bind(styles);

interface AddTopicCardProps {
  onClick: () => void;
}
interface TopicCardProps {
  id: string;
  name: string;
  variant: "card" | "pill";
}

export const AddTopicCard = ({ onClick }: AddTopicCardProps) => {
  return (
    <div
      className={cx(styles.container, styles.pill, styles.addPill)}
      onClick={onClick}
    >
      <h6 style={{ marginBottom: 0 }}>+ Add topic</h6>
    </div>
  );
};

const TopicCard = ({ id, name, variant }: TopicCardProps) => {
  return (
    <Link to={{ pathname: `/topics/${id}`, state: { name } }}>
      <div
        className={cx({
          container: true,
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

TopicCard.defaultProps = {
  variant: "card",
};

export default TopicCard;
