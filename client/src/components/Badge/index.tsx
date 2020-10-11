import React from "react";
import classnames from "classnames/bind";
import styles from "./Badge.module.css";

type BadgeSize = "small" | "large";

interface BadgeProps {
  children: React.ReactNode;
  size: BadgeSize;
  className?: string;
}

const cx = classnames.bind(styles);

const Badge = ({ children, size, className }: BadgeProps) => {
  return (
    <span
      className={cx(
        {
          badge: true,
          defaultBadge: true,
          small: size === "small",
          large: size === "large",
        },
        "badge",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
