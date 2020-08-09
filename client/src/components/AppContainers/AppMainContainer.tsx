import React from "react";
import styles from "./AppMainContainer.module.css";

interface AppMainContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const AppMainContainer = ({ children, className }: AppMainContainerProps) => {
  return (
    <section
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
    >
      {children}
    </section>
  );
};

export default AppMainContainer;
