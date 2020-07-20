import React from "react";
import styles from "./PhoneGraphic.module.css";

const PhoneGraphic = () => {
  return (
    <div className={styles.svgContainer}>
      <div className={styles.mockPhone} id={styles.phone1}>
        <img
          src={require("../../assets/my_library_screenshot.png")}
          className={styles.screenshot}
        />
      </div>
      <div className={styles.mockPhone} id={styles.phone2}>
        <img
          src={require("../../assets/video_screen_screenshot.png")}
          className={styles.screenshot}
        />
      </div>
      <img src={require("../../assets/background-circles.svg")} />
    </div>
  );
};

export default PhoneGraphic;
