import React from "react";
import { ReactComponent as PhoneGraphic } from "./assets/phone-graphic.svg";
import styles from "./App.module.css";

function App() {
  return (
    <section className={styles.App}>
      <nav className={styles.nav}>
        <h2 className={styles.logo}>newt</h2>
      </nav>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Organize everything you're learning</h1>
          <h5 className={styles.subtitle}>Sign up for early access</h5>
          <input type="email" placeholder="Email" className={styles.input} />
        </div>

        <div className={styles.phoneGraphicContainer}>
          <PhoneGraphic />
        </div>
      </div>
    </section>
  );
}

export default App;
