import React from "react";
import { MainContainer, Navbar } from "../../components";

const AboutPage = () => {
  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <MainContainer>
        <h1>About</h1>
      </MainContainer>
    </section>
  );
};

export default AboutPage;
