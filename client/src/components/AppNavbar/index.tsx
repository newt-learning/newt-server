// Navbar used only in the App. Should eventually be just one navbar but...
// ...this was quicker ¯\_(ツ)_/¯
import React from "react";
// Context
import { useData as useAuthData } from "../../context/AuthContext";
// Components
import { LinkContainer } from "react-router-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
// Styling
import styles from "./AppNavbar.module.css";
import { FiUser } from "react-icons/fi";

const AppNavbar = () => {
  const { signOut } = useAuthData();

  return (
    <nav className={styles.container}>
      <Dropdown alignRight={true} drop="down" className={styles.userIcon}>
        <Dropdown.Toggle id="navbar-options-dropdown" as="div">
          <FiUser size={22} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <LinkContainer to="/profile">
            <Dropdown.Item>Profile</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Divider />
          <Dropdown.Item onClick={signOut}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default AppNavbar;
