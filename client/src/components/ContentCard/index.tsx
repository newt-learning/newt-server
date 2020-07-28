import React from "react";
import styles from "./ContentCard.module.css";

export interface ContentCardProps {
  name: string;
  thumbnailUrl: string;
  creator: string;
}

const ContentCard = ({ name, thumbnailUrl, creator }: ContentCardProps) => {
  return (
    <div className={styles.card}>
      <img src={thumbnailUrl} className={styles.img} />
      <div className={styles.name}>{name}</div>
      <div className={styles.creator}>{`by ${creator}`}</div>
    </div>
  );
};

export default ContentCard;
