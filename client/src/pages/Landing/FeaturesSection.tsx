import React from "react";
import { MockPhone } from "./PhoneGraphic";
import styles from "./FeaturesSection.module.css";

interface FeatureProps {
  title: string;
  Graphic: React.ReactNode;
}

const Feature = ({ title, Graphic }: FeatureProps) => {
  const headerStyle = (title: string) => {
    switch (title) {
      case "Organize":
        return styles.organizeHeader;
      case "Track":
        return styles.trackHeader;
      case "Learn":
        return styles.learnHeader;
      case "Discover":
        return styles.discoverHeader;
      default:
        return;
    }
  };

  return (
    <div className={styles.feature}>
      <div className={styles.mockPhoneContainer}>{Graphic}</div>
      <div className={styles.descriptionContainer}>
        <h2 className={`${styles.descriptionHeader} ${headerStyle(title)}`}>
          {title}
        </h2>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className={styles.container}>
      <Feature
        title="Organize"
        Graphic={
          <MockPhone
            id="shelf-screenshot"
            imageUrl={require("../../assets/my_library_screenshot.png")}
            altText="Screenshot of My Library screen on Newt app"
            phoneStyle={styles.mockPhone}
            screenshotStyle={styles.screenshot}
          />
        }
      />
      <Feature
        title="Track"
        Graphic={
          <MockPhone
            id="shelf-screenshot"
            imageUrl={require("../../assets/stats_screenshot.png")}
            altText="Screenshot of Stats screen on Newt app"
            phoneStyle={styles.mockPhone}
            screenshotStyle={styles.screenshot}
          />
        }
      />
      <Feature
        title="Learn"
        Graphic={
          <MockPhone
            id="shelf-screenshot"
            imageUrl={require("../../assets/quiz_screenshot.png")}
            altText="Screenshot of Quiz screen on Newt app"
            phoneStyle={styles.mockPhone}
            screenshotStyle={styles.screenshot}
          />
        }
      />
      <Feature
        title="Discover"
        Graphic={
          <img
            className={styles.discoverImage}
            src={require("../../assets/discover_images.png")}
            alt="Screenshot of My Library screen on Newt app"
          />
        }
      />
    </section>
  );
};

export default FeaturesSection;
