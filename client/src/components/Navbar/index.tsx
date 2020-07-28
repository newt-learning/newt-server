import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

interface NavbarProps {
  variant: "landing" | "default";
}

const Navbar = ({ variant }: NavbarProps) => {
  return (
    <nav
      className={`${styles.nav} ${variant === "landing" && styles.landingNav}`}
    >
      <div className={styles.logoContainer}>
        <NavLink
          to="/"
          className={`${styles.logo} ${
            variant === "landing" && styles.landingLogo
          }`}
        >
          newt
        </NavLink>
      </div>
      <div className={styles.navLinkGroup}>
        <NavLink
          to="/discover"
          className={`${styles.navLink} ${
            variant === "landing" && styles.landingNavLink
          }`}
          activeClassName={`${styles.activeNavLink} ${
            variant === "landing" && styles.activeLandingNavLink
          }`}
        >
          Discover
        </NavLink>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  variant: "default",
};

export default Navbar;
