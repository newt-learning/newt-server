import React from "react";
import styles from "./AppContentContainer.module.css";

interface AppContentContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const AppContentContainer = ({
  children,
  className,
}: AppContentContainerProps) => (
  <div
    className={
      className ? `${styles.container} ${className}` : styles.container
    }
  >
    {children}
  </div>
);

export default AppContentContainer;
