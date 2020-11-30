import React from "react";
import classNames from "classnames/bind";
import { useToasts } from "react-toast-notifications";
// Context
import { useData } from "../../context/AuthContext";
// Components
import { Button, ShiftBy, Boop } from "..";
import { NavLink } from "react-router-dom";
import { default as BootstrapNavbar } from "react-bootstrap/Navbar";
import { default as BootstrapNav } from "react-bootstrap/Nav";
import { FiArrowRight } from "react-icons/fi";
// Hooks
import { useBoop } from "../../hooks";
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

  const [boopStyle, trigger] = useBoop({ x: 4, timing: 200 });

  const { addToast } = useToasts();

  const handleSignOut = async () => {
    await signOut();
    addToast("Successfully signed out", { appearance: "success" });
  };

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
          <NavLink
            to="/about"
            className={cx({
              navLink: true,
              landingNavLink: variant === "landing",
            })}
            activeClassName={cx({
              activeNavLink: true,
              landingActiveNavLink: variant === "landing",
            })}
          >
            The Story
          </NavLink>
        </BootstrapNav>
        {isAuthenticated ? (
          <div className={styles.rightNav}>
            <NavLink
              to="/dashboard"
              style={{
                display: "flex",
                flexWrap: "nowrap",
                marginRight: "1rem",
              }}
            >
              <Button
                className={cx({
                  signInBtn: true,
                  landingSignInBtn: variant === "landing",
                })}
                //@ts-ignore
                onMouseEnter={trigger}
              >
                Go to Dashboard
                <Boop disableTrigger overrideStyle={boopStyle}>
                  <ShiftBy y={-1}>
                    <FiArrowRight
                      size={21}
                      className={cx({
                        rightArrow: true,
                        landingRightArrow: variant === "landing",
                      })}
                    />
                  </ShiftBy>
                </Boop>
              </Button>
            </NavLink>
            <div
              className={cx({
                navLink: true,
                logout: true,
                landingNavLink: variant === "landing",
              })}
              onClick={handleSignOut}
            >
              Log out
            </div>
          </div>
        ) : (
          <NavLink to="/login">
            <Button
              className={cx({
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
