import React from "react";
import styles from "./SideNav.module.css";

interface SideNavLinkProps {
  children: React.ReactNode;
}

const SideNavLink = ({ children, ...props }: SideNavLinkProps) => (
  <a {...props} className={styles.navLink}>
    {children}
  </a>
);

export default SideNavLink;
