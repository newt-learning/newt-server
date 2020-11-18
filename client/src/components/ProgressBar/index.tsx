import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  percentComplete: number; // Between 0 and 100
  containerStyle?: React.CSSProperties;
}

const ProgressBar = ({ percentComplete, containerStyle }: ProgressBarProps) => {
  return (
    <div className={styles.container} style={containerStyle}>
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
