import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import sidebarFields from "./sidebarFields";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
// Styling
import styles from "./Sidebar.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={
        isCollapsed
          ? `${styles.sidebar} ${styles.collapsedSidebar}`
          : `${styles.sidebar} ${styles.expandedSidebar}`
      }
    >
      <div>
        <div className={styles.logo}>
          <Link to="/">
            <h4>n</h4>
          </Link>
        </div>
        <div className={styles.sidebarNavlinks}>
          {/* <ul>{this.renderNavlinks()}</ul> */}
          <ul>
            {sidebarFields.map(({ name, route, icon }) => {
              // If the sidebar's collapsed, show tooltip on hover. Otherwise no tooltip
              return isCollapsed ? (
                <OverlayTrigger
                  trigger="hover"
                  key={name}
                  placement="right"
                  overlay={<Tooltip id={`${name}-tooltip`}>{name}</Tooltip>}
                >
                  <li>
                    <NavLink to={route} activeClassName={styles.activeNav}>
                      <div className={styles.navlinkRow}>
                        {icon()}
                        {!isCollapsed && <div>{name}</div>}
                      </div>
                    </NavLink>
                  </li>
                </OverlayTrigger>
              ) : (
                <li key={name}>
                  <NavLink to={route} activeClassName={styles.activeNav}>
                    <div className={styles.navlinkRow}>
                      {icon()}
                      {!isCollapsed && <div>{name}</div>}
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={styles.collapse}>
        <div className={styles.collapseIcon} onClick={toggleSidebar}>
          {isCollapsed ? (
            <FiChevronRight size={25} />
          ) : (
            <FiChevronLeft size={25} />
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
