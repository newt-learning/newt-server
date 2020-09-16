import React from "react";
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
// Styling
import styles from "./AddContent.module.css";

const AddContentPage = () => {
  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Add Content</h2>
      </AppHeaderContainer>
      <AppContentContainer className={styles.contentForms}>
        <TabContainer id="add-content-tabs" defaultActiveKey="youtube">
          <Row>
            <Col lg={3} style={{ marginTop: "1rem" }}>
              <h5 style={{ color: "#666", marginBottom: "1rem" }}>
                Content Type
              </h5>
              <Nav variant="pills" className="flex-column">
                <Nav.Item as={SideNavItem}>
                  <Nav.Link as={SideNavLink} eventKey="youtube">
                    YouTube
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as={SideNavItem}>
                  <Nav.Link as={SideNavLink} eventKey="book">
                    Book
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col lg={9} className={styles.tabPane}>
              <TabContent>
                <TabPane eventKey="youtube">
                  <h2>Youtube form</h2>
                </TabPane>
                <TabPane eventKey="book">
                  <h2>Book search</h2>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default AddContentPage;
