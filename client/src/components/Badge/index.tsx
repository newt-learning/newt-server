import React from "react";
import classnames from "classnames/bind";
import styles from "./Badge.module.css";

type BadgeVariant =
  | "default"
  | "Currently Learning"
  | "Want to Learn"
  | "Finished Learning";

type BadgeSize = "small" | "large";

interface BadgeProps {
  children: React.ReactNode;
  variant: BadgeVariant;
  size: BadgeSize;
  className?: string;
}

const cx = classnames.bind(styles);

const Badge = ({ children, variant, size, className }: BadgeProps) => {
  const selectBadgeStyle = (variant: BadgeVariant) => {
    switch (variant) {
      case "Currently Learning":
        return styles.currentlyLearningBadge;
      case "Want to Learn":
        return styles.wantToLearnBadge;
      case "Finished Learning":
        return styles.finishedLearningBadge;
      default:
        return styles.defaultBtn;
    }
  };

  const selectBadgeSize = (size: BadgeSize) => {
    switch (size) {
      case "small":
        return styles.small;
      case "large":
        return styles.large;
      default:
        return styles.small;
    }
  };

  return (
    <span
      // className={`${styles.badge} ${selectBadgeStyle(variant)} ${
      //   className ? className : ""
      // }`}
      className={cx(
        "badge",
        selectBadgeSize(size),
        selectBadgeStyle(variant),
        className
      )}
    >
      {children}
    </span>
  );
};

Badge.defaultProps = {
  variant: "default",
  size: "small",
};

export default Badge;
