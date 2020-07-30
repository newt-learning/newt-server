// Container under navbar
import React from "react";
import styles from "./MainContainer.module.css";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: MainContainerProps) => {
  return <section className={styles.container}>{children}</section>;
};

export default MainContainer;
