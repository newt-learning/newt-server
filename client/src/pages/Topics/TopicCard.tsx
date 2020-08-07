import React from "react";
import styles from "./TopicCard.module.css";

interface TopicCardProps {
  name: string;
}

const TopicCard = ({ name }: TopicCardProps) => {
  return (
    <div className={styles.card}>
      <h4>{name}</h4>
    </div>
  );
};

export default TopicCard;
