import React from "react";
import { useData as useAuthData } from "../../context/AuthContext";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  TabPane,
  Boop,
} from "../../components";
import { TabPaneField } from "../../components/TabPane";

const AccountTabPane = ({ userInfo }: { userInfo: any }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Boop
      boopConfig={{
        rotation: 180,
        timing: 1400,
        springConfig: {
          tension: 250,
          friction: 11,
        },
      }}
    >
      <img
        src={require("../../assets/icons8-owl-64.png")}
        height={64}
        alt="Icon of an owl"
      />
    </Boop>
    <h3 style={{ marginTop: "1rem" }}>{userInfo?.displayName}</h3>
  </div>
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
