import React from "react";
import classnames from "classnames/bind";
import styles from "./AppMainContainer.module.css";

let cx = classnames.bind(styles);

interface AppMainContainerProps {
  children?: React.ReactNode;
  variant?: "default" | "inbox"; // Inbox style is list on left side, details on right (like an inbox)
  className?: string;
}

const AppMainContainer = ({
  children,
  variant,
  className,
}: AppMainContainerProps) => {
  return (
    <section
      className={cx(
        {
          container: true,
          inboxContainer: variant === "inbox",
        },
        // Add passed className prop
        className
      )}
    >
      {children}
    </section>
  );
};

export default AppMainContainer;
