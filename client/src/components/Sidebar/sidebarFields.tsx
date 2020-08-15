import React from "react";
import { FiBook, FiArchive, FiTrello, FiFolder } from "react-icons/fi";
// import { FaBrain } from "react-icons/fa";
import styles from "./Sidebar.module.css";

export default [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: () => <FiTrello size={20} className={styles.icon} />,
  },
  {
    name: "Shelves",
    route: "/shelves",
    icon: () => <FiFolder size={20} className={styles.icon} />,
  },
  {
    name: "Topics",
    route: "/topics",
    icon: () => <FiArchive size={20} className={styles.icon} />,
  },
];
