import React from "react";
import { MainContainer, Navbar } from "../../components";
import styles from "./About.module.css";

const AboutPage = () => {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Navbar />
      <MainContainer style={styles.container}>
        <h1>The Story of Newt</h1>
        <h3 className={styles.lede}>
          How it started, what I'm building, and my vision for the future of
          education
        </h3>
        <p>
          In 2016, while I was an Engineering undergraduate at the University of
          British Columbia, I realized I was getting incredibly frustrated with
          my educational experience.
        </p>
      </MainContainer>
    </section>
  );
};

export default AboutPage;
