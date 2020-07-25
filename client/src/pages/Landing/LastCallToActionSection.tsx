import React from "react";
import styles from "./LastCallToActionSection.module.css";

const LastCallToActionSection = () => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <text className={styles.label}>Sign up for early access</text>
      </div>
    </section>
  );
};

export default LastCallToActionSection;
