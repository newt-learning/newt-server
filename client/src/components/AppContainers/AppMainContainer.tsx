import React from "react";
import styles from "./AppMainContainer.module.css";

interface AppMainContainerProps {
  children?: React.ReactNode;
}

const AppMainContainer = ({ children }: AppMainContainerProps) => {
  return <section className={styles.container}>{children}</section>;
};

export default AppMainContainer;
