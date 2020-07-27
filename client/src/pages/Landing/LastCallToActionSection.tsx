import React from "react";
import LandingForm from "./LandingForm";
import styles from "./LastCallToActionSection.module.css";

const LastCallToActionSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <LandingForm labelStyle={styles.label} />
      </div>
    </section>
  );
};

export default LastCallToActionSection;
