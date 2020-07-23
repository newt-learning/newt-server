import React from "react";
import { MockPhone } from "./PhoneGraphic";
import styles from "./FeaturesSection.module.css";

interface FeatureProps {
  id: string;
  title: string;
  Graphic: React.ReactNode;
}

const features = [
  {
    id: "organize",
    title: "Organize",
    isPhoneMockup: true,
    graphic: {
      id: "shelf-screenshot",
      imageUrl: require("../../assets/my_library_screenshot.png"),
      altText: "Screenshot of My Library screen on Newt app",
    },
  },
  {
    id: "track",
    title: "Track",
    isPhoneMockup: true,
    graphic: {
      id: "stats-screenshot",
      imageUrl: require("../../assets/stats_screenshot.png"),
      altText: "Screenshot of Stats screen on Newt app",
    },
  },
  {
    id: "learn",
    title: "Learn",
    isPhoneMockup: true,
    graphic: {
      id: "quiz-screenshot",
      imageUrl: require("../../assets/quiz_screenshot.png"),
      altText: "Screenshot of Quiz screen on Newt app",
    },
  },
  {
    id: "discover",
    title: "Discover",
    isPhoneMockup: false,
    graphic: {
      id: "discover-images",
      imageUrl: require("../../assets/discover_images.png"),
      altText:
        "Pictures of YouTube thumbnail, podcast thumbnail, and book cover",
    },
  },
];

const Feature = ({ id, title, Graphic }: FeatureProps) => {
  return (
    <div className={styles.feature}>
      <div id={styles[id]} className={styles.mockPhoneContainer}>
        {Graphic}
      </div>
      <div className={styles.descriptionContainer}>
        <h2 id={styles[id]} className={`${styles.descriptionHeader}`}>
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
          id={feature.id}
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
        />
      ))}
    </section>
  );
};

export default FeaturesSection;
