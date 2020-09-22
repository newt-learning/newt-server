import React from "react";
import { useData as useAuthData } from "../../context/AuthContext";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  TabPane,
} from "../../components";
import { TabPaneField } from "../../components/TabPane";

const AccountTabPane = ({ userInfo }: { userInfo: any }) => (
  <>
    <h3>Account</h3>
    <label>First Name</label>
    <input value={userInfo?.firstName} readOnly />
    <label>Last Name</label>
    <input value={userInfo?.lastName} readOnly />
  </>
);

const ProfilePage = () => {
  const {
    state: { userInfo },
  } = useAuthData();

  let tabFields: TabPaneField[] = [
    {
      id: "account",
      name: "Account",
      type: "nav",
      renderTabPane: () => <AccountTabPane userInfo={userInfo} />,
    },
  ];

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Profile</h2>
      </AppHeaderContainer>
      <AppContentContainer variant="tab-pane">
        <TabPane id="profile-tabs" fields={tabFields} />
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default ProfilePage;
