import React from "react";
import classnames from "classnames/bind";
import styles from "./AppContentContainer.module.css";

let cx = classnames.bind(styles);

interface AppContentContainerProps {
  children?: React.ReactNode;
  variant?: "default" | "inbox";
  className?: string;
}

const AppContentContainer = ({
  children,
  variant,
  className,
}: AppContentContainerProps) => (
  <div
    className={cx(
      {
        container: true,
        inboxContainer: variant === "inbox",
      },
      className
    )}
  >
    {children}
  </div>
);

export default AppContentContainer;
