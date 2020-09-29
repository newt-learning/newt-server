import React from "react";
import styles from "./AppHeaderContainer.module.css";

interface AppHeaderContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const AppHeaderContainer = ({
  children,
  className,
}: AppHeaderContainerProps) => (
  <div
    className={
      className ? `${styles.container} ${className}` : styles.container
    }
  >
    {children}
  </div>
);

export default AppHeaderContainer;
