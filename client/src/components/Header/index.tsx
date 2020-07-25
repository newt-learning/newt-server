import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>newt</div>
    </nav>
  );
};

export default Header;
