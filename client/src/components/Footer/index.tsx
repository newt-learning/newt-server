import React from "react";
import { FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <a
        href="https://www.twitter.com/newtlearning"
        target="_blank"
        rel="noreferrer noopener"
      >
        <FaTwitter color="#fff" size={24} className={styles.icon} />
      </a>
      <a
        href="https://www.twitter.com/newtlearning"
        target="_blank"
        rel="noreferrer noopener"
        className={styles.text}
      >
        Follow us on Twitter!
      </a>
    </footer>
  );
};

export default Footer;
