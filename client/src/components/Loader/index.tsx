import React from "react";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "./Loader.module.css";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader = ({ size, color }: LoaderProps) => {
  return (
    <div className={styles.container}>
      <SyncLoader size={size} color={color} />
    </div>
  );
};

Loader.defaultProps = {
  size: 18,
  color: "#38ceff",
};

export default Loader;
