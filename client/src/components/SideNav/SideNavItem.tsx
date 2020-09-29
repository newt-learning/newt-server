import React from "react";
import styles from "./SideNav.module.css";

interface SideNavItemProps {
  children: React.ReactNode;
}

const SideNavItem = ({ children }: SideNavItemProps) => (
  <div className={styles.navItem}>{children}</div>
);

export default SideNavItem;
