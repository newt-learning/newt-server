import React from "react";
import classNames from "classnames/bind";
// Context
import { useData } from "../../context/AuthContext";
// Components
import Button from "../Button";
import { NavLink } from "react-router-dom";
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
    <nav
      className={cx({
        nav: true,
        landingNav: variant === "landing",
      })}
    >
      <div className={styles.logoContainer}>
        <NavLink
          to="/"
          className={cx({
            logo: true,
            landingLogo: variant === "landing",
          })}
        >
          newt
        </NavLink>
      </div>
      <div className={styles.navLinkGroup}>
        <div>
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
        </div>
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
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  variant: "default",
};

export default Navbar;
