// Container for the left-side list of cards
// (e.g. used in Topic page to list content)
import React from "react";
import styles from "./AppContentList.module.css";

interface AppContentListProps {
  children: React.ReactNode;
}

const AppContentList = ({ children }: AppContentListProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default AppContentList;
