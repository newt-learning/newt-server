import React from "react";
import { useData as useAuthData } from "../../context/AuthContext";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  SideNavItem,
  SideNavLink,
} from "../../components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
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
      <AppContentContainer className={styles.contentForms}>
        {/* <div className={styles.optionsContainer}>
          <ul>
            <li className={`${styles.option} ${styles.active}`}>Account</li>
          </ul>
        </div>
        <div className={styles.detailsContainer}>
          
        </div> */}
        <TabContainer
          id="add-content-tabs"
          defaultActiveKey="account"
          transition={false}
        >
          <Row>
            <Col lg={3} style={{ marginTop: "1rem" }}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item as={SideNavItem}>
                  <Nav.Link as={SideNavLink} eventKey="account">
                    Account
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col lg={9} className={styles.tabPane}>
              <TabContent>
                <TabPane eventKey="account">
                  <h3>Account</h3>
                  <label>First Name</label>
                  <input value={userInfo?.firstName} readOnly />
                  <label>Last Name</label>
                  <input value={userInfo?.lastName} readOnly />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default ProfilePage;
