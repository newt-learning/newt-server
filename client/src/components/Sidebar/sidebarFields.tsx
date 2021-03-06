import React from "react";
import { FiPlus, FiGrid, FiTrello, FiFolder, FiBarChart } from "react-icons/fi";
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
    name: "Playlists",
    route: "/playlists",
    // icon: () => <FiArchive size={20} className={styles.icon} />,
    icon: () => <FiGrid size={20} className={styles.icon} />,
  },
  {
    name: "Stats",
    route: "/stats",
    icon: () => <FiBarChart size={20} className={styles.icon} />,
  },
];
