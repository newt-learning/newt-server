// Container under navbar
import React from "react";
import styles from "./MainContainer.module.css";

interface MainContainerProps {
  children: React.ReactNode;
  style?: string;
}

const MainContainer = ({ children, style }: MainContainerProps) => {
  return (
    <section className={`${styles.container} ${style ? style : ""}`}>
      {children}
    </section>
  );
};

export default MainContainer;
