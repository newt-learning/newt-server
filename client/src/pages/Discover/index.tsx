import React from "react";
import { Navbar } from "../../components";
import styles from "./Discover.module.css";

const DiscoverPage = () => {
  return (
    <section>
      <Navbar />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Categories</h2>
        </aside>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Discover</h1>
          <p className={styles.description}>
            Find the next thing you want to learn from our curated library.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DiscoverPage;
