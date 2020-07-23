import React from "react";
import { MockPhone } from "./PhoneGraphic";
import styles from "./FeaturesSection.module.css";

interface FeatureProps {
  title: string;
  Graphic: React.ReactNode;
  headerStyle: string;
}

const features = [
  {
    title: "Organize",
    isPhoneMockup: true,
    graphic: {
      id: "shelf-screenshot",
      imageUrl: require("../../assets/my_library_screenshot.png"),
      altText: "Screenshot of My Library screen on Newt app",
    },
    headerStyle: styles.organizeHeader,
  },
  {
    title: "Track",
    isPhoneMockup: true,
    graphic: {
      id: "stats-screenshot",
      imageUrl: require("../../assets/stats_screenshot.png"),
      altText: "Screenshot of Stats screen on Newt app",
    },
    headerStyle: styles.trackHeader,
  },
  {
    title: "Learn",
    isPhoneMockup: true,
    graphic: {
      id: "quiz-screenshot",
      imageUrl: require("../../assets/quiz_screenshot.png"),
      altText: "Screenshot of Quiz screen on Newt app",
    },
    headerStyle: styles.learnHeader,
  },
  {
    title: "Discover",
    isPhoneMockup: false,
    graphic: {
      id: "discover-images",
      imageUrl: require("../../assets/discover_images.png"),
      altText:
        "Pictures of YouTube thumbnail, podcast thumbnail, and book cover",
    },
    headerStyle: styles.discoverHeader,
  },
];

const Feature = ({ title, Graphic, headerStyle }: FeatureProps) => {
  const mockPhoneContainerStyle = (title: string) => {
    switch (title) {
      case "Organize":
        return `${styles.mockPhoneContainer} ${styles.mockPhoneContainer1}`;
      case "Track":
        return `${styles.mockPhoneContainer} ${styles.mockPhoneContainer2}`;
      case "Learn":
        return `${styles.mockPhoneContainer} ${styles.mockPhoneContainer3}`;
      case "Discover":
        return `${styles.mockPhoneContainer} ${styles.mockPhoneContainer4}`;
      default:
        return styles.mockPhoneContainer;
    }
  };

  return (
    <div className={styles.feature}>
      <div className={mockPhoneContainerStyle(title)}>{Graphic}</div>
      <div className={styles.descriptionContainer}>
        <h2 className={`${styles.descriptionHeader} ${headerStyle}`}>
          {title}
        </h2>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className={styles.container}>
      {features.map((feature) => (
        <Feature
          title={feature.title}
          Graphic={
            feature.isPhoneMockup ? (
              <MockPhone
                {...feature.graphic}
                phoneStyle={styles.mockPhone}
                screenshotStyle={styles.screenshot}
              />
            ) : (
              <img
                src={feature.graphic.imageUrl}
                alt={feature.graphic.altText}
                className={styles.discoverImage}
              />
            )
          }
          headerStyle={feature.headerStyle}
        />
      ))}
    </section>
  );
};

export default FeaturesSection;
