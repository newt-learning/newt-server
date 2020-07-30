import React from "react";
import { Navbar, MainContainer } from "../../components";
import ContentFlow from "./ContentFlow";
import styles from "./Content.module.css";

const ContentPage = () => {
  return (
    <section>
      <Navbar />
      <MainContainer style={styles.container}>
        <div className={styles.contentFlowContainer}>
          <ContentFlow />
        </div>
        <div className={styles.contentInfoContainer}>
          <div className={styles.contentInfo}></div>
        </div>
      </MainContainer>
    </section>
  );
};

export default ContentPage;
