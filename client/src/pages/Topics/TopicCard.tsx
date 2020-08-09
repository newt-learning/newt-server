import React from "react";
import { Link } from "react-router-dom";
import styles from "./TopicCard.module.css";

interface TopicCardProps {
  id: string;
  name: string;
}

const TopicCard = ({ id, name }: TopicCardProps) => {
  return (
    <Link to={`/topics/${id}`}>
      <div className={styles.card}>
        <h4>{name}</h4>
      </div>
    </Link>
  );
};

export default TopicCard;
