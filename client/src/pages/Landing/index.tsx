import React from "react";
// Sections
import LandingForm from "./LandingForm";
import EnvironmentSection from "./EnvironmentSection";
import FeaturesSection from "./FeaturesSection";
import LastCallToActionSection from "./LastCallToActionSection";
// Components
import { Navbar, Footer } from "../../components";
import PhoneGraphic from "./PhoneGraphic";
import styles from "./Landing.module.css";

const LandingPage = () => {
  return (
    <div className={styles.App}>
      <Navbar variant="landing" />
      <section className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Organize everything you're learning</h1>
          <LandingForm />
        </div>
        <div className={styles.phoneGraphicContainer}>
          <PhoneGraphic />
        </div>
      </section>
      <EnvironmentSection />
      <FeaturesSection />
      <LastCallToActionSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
