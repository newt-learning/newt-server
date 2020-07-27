import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.logo}>
        newt
      </NavLink>
      <div className={styles.navLinkGroup}>
        <NavLink
          to="/discover"
          className={styles.navLink}
          activeClassName={styles.activeNavLink}
        >
          Discover
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
