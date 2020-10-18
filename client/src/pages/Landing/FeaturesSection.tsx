import React from "react";
import { MockPhone } from "./PhoneGraphic";
import styles from "./FeaturesSection.module.css";

interface FeatureProps {
  id: string;
  title: string;
  description: React.ReactNode[];
  Graphic: React.ReactNode;
}

const features = [
  {
    id: "organize",
    title: "Organize",
    description: [
      "Everything you want to learn from \u2014 books, videos, articles, online courses, podcasts, interactive games, etc. \u2014 in one place.",
      <span>
        Sort content by <b>shelf</b> (Currently Learning, Want to Learn,
        Finished Learning) or by <b>topics</b> (make as many as you like).
      </span>,
    ],
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
    description: [
      "Get stats on what you've read, watched, listened to, and played.",
      "Follow your progress over time.",
      "Learn more consistently.",
    ],
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
    description: [
      "Have you ever read a book or watched a video, only to forget most of it a few weeks later?",
      "Retaining stuff takes time and effort: taking notes, quizzing yourself, and doing it over and over again.",
      <span>
        We make it remarkably easy with <b>personalized quizzes</b> and{" "}
        <b>spaced repetition</b> for select content, so let us handle it for
        you.
      </span>,
    ],
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
    description: [
      "Why should recommendations be limited in the medium that they are in?",
      "After finishing a book, what if the best next thing is not another book, but a documentary? Or an interactive game?",
      <span>
        Find your next favourite thing at our <b>curated</b> library filled with
        incredible content.
      </span>,
    ],
    isPhoneMockup: false,
    graphic: {
      id: "discover-images",
      imageUrl: require("../../assets/discover_images.png"),
      altText:
        "Pictures of YouTube thumbnail, podcast thumbnail, and book cover",
    },
  },
];

const Feature = ({ id, title, description, Graphic }: FeatureProps) => {
  return (
    <div className={styles.feature}>
      <div id={styles[id]} className={styles.mockPhoneContainer}>
        {Graphic}
      </div>
      <div className={styles.descriptionContainer}>
        <h2 id={styles[id]} className={`${styles.descriptionHeader}`}>
          {title}
        </h2>
        {description.map((para, index) => (
          <p className={styles.descriptionText} key={`${id}-${para}-${index}`}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.features}>
        {features.map((feature) => (
          <Feature
            id={feature.id}
            title={feature.title}
            description={feature.description}
            key={feature.id}
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
      </div>
    </section>
  );
};

export default FeaturesSection;
