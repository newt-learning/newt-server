import React from "react";
import styles from "./Badge.module.css";

type BadgeVariant =
  | "default"
  | "currently-learning"
  | "want-to-learn"
  | "finished-learning";

interface BadgeProps {
  children: React.ReactNode;
  variant: BadgeVariant;
}

const Badge = ({ children, variant }: BadgeProps) => {
  const selectBadgeStyle = (variant: BadgeVariant) => {
    switch (variant) {
      case "currently-learning":
        return styles.currentlyLearningBadge;
      case "want-to-learn":
        return styles.wantToLearnBadge;
      case "finished-learning":
        return styles.finishedLearningBadge;
      default:
        return styles.defaultBtn;
    }
  };

  return (
    <span className={`${styles.badge} ${selectBadgeStyle(variant)}`}>
      {children}
    </span>
  );
};

Badge.defaultProps = {
  variant: "default",
};

export default Badge;
