import React from "react";
import {
  FiPlus,
  FiArchive,
  FiTrello,
  FiFolder,
  FiBarChart,
} from "react-icons/fi";
import styles from "./Sidebar.module.css";

export default [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: () => <FiTrello size={20} className={styles.icon} />,
  },
  {
    name: "Add Content",
    route: "/add-content",
    icon: () => <FiPlus size={20} className={styles.icon} />,
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
  {
    name: "Stats",
    route: "/stats",
    icon: () => <FiBarChart size={20} className={styles.icon} />,
  },
];
