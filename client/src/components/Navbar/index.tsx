import React from "react";
import styles from "./Navbar.module.css";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>newt</div>
    </nav>
  );
};

export default Header;
