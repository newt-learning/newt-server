// Container for the right-side details section
// (e.g. used in Playlist page to show content details)
import React from "react";
import styles from "./AppContentDetails.module.css";

interface AppContentDetailsProps {
  children: React.ReactNode;
}

const AppContentDetails = ({ children }: AppContentDetailsProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default AppContentDetails;
