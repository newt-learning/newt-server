import React from "react";
import styles from "./MessageBox.module.css";

interface MessageBoxProps {
  children: React.ReactNode;
}

const MessageBox = ({ children }: MessageBoxProps) => (
  <div className={styles.messageBox}>{children}</div>
);

export default MessageBox;
