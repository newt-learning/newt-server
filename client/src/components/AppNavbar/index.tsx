// Navbar used only in the App. Should eventually be just one navbar but...
// ...this was quicker ¯\_(ツ)_/¯
import React from "react";
import { useToasts } from "react-toast-notifications";
// Context
import { useData as useAuthData } from "../../context/AuthContext";
// Components
import { NavLink, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
// Styling
import styles from "./AppNavbar.module.css";
import { FiUser } from "react-icons/fi";

const AppNavbar = () => {
  const history = useHistory();
  const { signOut } = useAuthData();

  const { addToast } = useToasts();

  const handleSignOut = async () => {
    await signOut();
    history.push("/");
    addToast("Successfully signed out", { appearance: "success" });
  };

  return (
    <nav className={styles.container}>
      <NavLink
        to="/discover"
        className={styles.navLink}
        activeClassName={styles.activeNavLink}
      >
        Discover
      </NavLink>
      <Dropdown alignRight={true} drop="down" className={styles.userIcon}>
        <Dropdown.Toggle id="navbar-options-dropdown" as="div">
          <FiUser size={22} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <LinkContainer to="/profile">
            <Dropdown.Item>Profile</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleSignOut}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default AppNavbar;
