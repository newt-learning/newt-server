import React from "react";
import { useData as useAuthData } from "../../context/AuthContext";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
} from "../../components";
import styles from "./Profile.module.css";

const ProfilePage = () => {
  const {
    state: { userInfo },
  } = useAuthData();

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Profile</h2>
      </AppHeaderContainer>
      <AppContentContainer>
        <div className={styles.optionsContainer}>
          <ul>
            <li className={`${styles.option} ${styles.active}`}>Account</li>
          </ul>
        </div>
        <div className={styles.detailsContainer}>
          <h3>Account</h3>
          <label>First Name</label>
          <input value={userInfo?.firstName} />
          <label>Last Name</label>
          <input value={userInfo?.lastName} />
        </div>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default ProfilePage;
