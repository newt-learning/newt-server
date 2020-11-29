import React from "react";
import styles from "./PhoneGraphic.module.css";

interface MockPhoneProps {
  id: string;
  imageUrl: string;
  altText: string;
  phoneStyle?: string;
  screenshotStyle?: string;
}

export const MockPhone = ({
  id,
  imageUrl,
  altText,
  phoneStyle,
  screenshotStyle,
}: MockPhoneProps) => {
  return (
    <div
      className={`${styles.mockPhone} ${phoneStyle ? phoneStyle : ""}`}
      id={id}
    >
      <img
        src={imageUrl}
        height={462}
        alt={altText ? altText : "Screenshot on Newt mobile app"}
        className={`${styles.screenshot} ${
          screenshotStyle ? screenshotStyle : ""
        }`}
      />
    </div>
  );
};

const PhoneGraphic = () => {
  return (
    <div className={styles.svgContainer}>
      <MockPhone
        id={styles.phone1}
        imageUrl={require("../../assets/my_library_screenshot.png")}
        altText="Screenshot on My Library tab on the Newt mobile app"
      />
      <MockPhone
        id={styles.phone2}
        imageUrl={require("../../assets/video_screen_screenshot.png")}
        altText="Screenshot on Video screen on the Newt mobile app"
      />
      <img
        src={require("../../assets/background-circles.svg")}
        alt="A bunch of white and light-blue circles"
      />
    </div>
  );
};

export default PhoneGraphic;
