import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  percentComplete: number;
}

const ProgressBar = ({ percentComplete }: ProgressBarProps) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.progressBar}
        style={{ width: `${percentComplete}%` }}
      >
        <span className={styles.label}>{`${percentComplete}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
