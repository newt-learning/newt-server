import React from "react";
import classNames from "classnames/bind";
// Context
import { useData } from "../../context/AuthContext";
// Components
import Button from "../Button";
import { NavLink } from "react-router-dom";
import { default as BootstrapNavbar } from "react-bootstrap/Navbar";
import { default as BootstrapNav } from "react-bootstrap/Nav";
// Styling
import styles from "./Navbar.module.css";

let cx = classNames.bind(styles);

interface NavbarProps {
  variant: "landing" | "default";
}

const Navbar = ({ variant }: NavbarProps) => {
  const {
    state: { exists: isAuthenticated },
    signOut,
  } = useData();

  return (
    <BootstrapNavbar
      expand="sm"
      className={cx({
        nav: true,
        landingNav: variant === "landing",
      })}
    >
      <BootstrapNavbar.Brand className={styles.logoContainer}>
        <NavLink
          to="/"
          className={cx({
            logo: true,
            landingLogo: variant === "landing",
          })}
        >
          newt
        </NavLink>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse
        id="navbar-nav"
        className={styles.collapsedNavbar}
      >
        <BootstrapNav className="mx-auto">
          <BootstrapNav.Link>
            <NavLink
              to="/discover"
              className={cx({
                navLink: true,
                landingNavLink: variant === "landing",
              })}
              activeClassName={cx({
                activeNavLink: true,
                landingActiveNavLink: variant === "landing",
              })}
            >
              Discover
            </NavLink>
          </BootstrapNav.Link>
        </BootstrapNav>
        {isAuthenticated ? (
          <div>
            <NavLink
              to="/dashboard"
              className={cx({
                navLink: true,
                landingNavLink: variant === "landing",
                toDash: true,
              })}
              activeClassName={cx({
                activeNavLink: true,
                landingActiveNavLink: variant === "landing",
              })}
            >
              Go to Dashboard
            </NavLink>
            <Button
              style={cx({
                signInBtn: true,
                landingSignInBtn: variant === "landing",
              })}
              onClick={signOut}
            >
              Log out
            </Button>
          </div>
        ) : (
          <NavLink to="/login">
            <Button
              style={cx({
                signInBtn: true,
                landingSignInBtn: variant === "landing",
              })}
            >
              Sign in
            </Button>
          </NavLink>
        )}
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

Navbar.defaultProps = {
  variant: "default",
};

export default Navbar;
