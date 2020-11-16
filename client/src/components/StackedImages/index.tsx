import React from "react";
import Image from "react-bootstrap/Image";
import styles from "./StackedImages.module.css";

interface StackedImagesProps {
  imageUrls: {
    url: string;
    alt: string;
  }[];
}

const StackedImages = ({ imageUrls }: StackedImagesProps) => {
  return (
    <div className={styles.container}>
      {imageUrls[0] ? (
        <Image
          src={imageUrls[0]?.url}
          alt={imageUrls[0]?.alt}
          className={styles.front}
          fluid
        />
      ) : null}
      {imageUrls[1] ? (
        <Image
          src={imageUrls[1]?.url}
          alt={imageUrls[1]?.alt}
          className={styles.middle}
          fluid
        />
      ) : null}
      <Image
        src={imageUrls[2]?.url}
        alt={imageUrls[2]?.alt}
        className={styles.back}
        fluid
      />
    </div>
  );
};

export default StackedImages;
