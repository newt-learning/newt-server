import React from "react";
import Image from "react-bootstrap/Image";
import styles from "./StackedImages.module.css";

export type ImageUrlType = {
  url: string;
  alt: string | undefined;
};

interface StackedImagesProps {
  imageUrls: ImageUrlType[];
  containerStyle?: React.CSSProperties;
  imagesStyle?: React.CSSProperties;
}

const StackedImages = ({
  imageUrls,
  containerStyle,
  imagesStyle,
}: StackedImagesProps) => {
  return (
    <div className={styles.container} style={containerStyle}>
      {imageUrls[0] ? (
        <Image
          src={imageUrls[0]?.url}
          alt={imageUrls[0]?.alt}
          className={styles.front}
          style={imagesStyle}
          fluid
        />
      ) : null}
      {imageUrls[1] ? (
        <Image
          src={imageUrls[1]?.url}
          alt={imageUrls[1]?.alt}
          className={styles.middle}
          style={imagesStyle}
          fluid
        />
      ) : null}
      {imageUrls[2] ? (
        <Image
          src={imageUrls[2]?.url}
          alt={imageUrls[2]?.alt}
          className={styles.back}
          style={imagesStyle}
          fluid
        />
      ) : null}
    </div>
  );
};

export default StackedImages;
