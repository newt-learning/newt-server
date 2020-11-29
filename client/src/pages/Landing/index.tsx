import React from "react";
// Sections
import EnvironmentSection from "./EnvironmentSection";
import FeaturesSection from "./FeaturesSection";
// Components
import { Navbar, Footer } from "../../components";
import PhoneGraphic from "./PhoneGraphic";
import GetStartedButton from "./GetStartedButton";
// Hooks
import { useMetaTags } from "../../hooks";
// Styling
import styles from "./Landing.module.css";

const LandingPage = () => {
  useMetaTags({
    title: "Newt",
  });

  return (
    <div className={styles.App}>
      <Navbar variant="landing" />
      <section className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Organize everything you're learning</h1>
          <p className={styles.subtitle}>
            Everything you want to learn from &mdash; books, videos, online
            courses, podcasts, interactive games &mdash; all in one place
          </p>
          <GetStartedButton />
        </div>
        <div className={styles.phoneGraphicContainer}>
          <PhoneGraphic />
        </div>
      </section>
      <EnvironmentSection />
      <FeaturesSection />
      <section className={styles.lastCTA}>
        <h2 style={{ marginBottom: "3rem" }}>Supercharge your learning</h2>
        <GetStartedButton variant="last" />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
