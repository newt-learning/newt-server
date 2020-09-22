import React from "react";
import _ from "lodash";
// Components
import { SideNavItem, SideNavLink } from "../../components";
import TabContainer from "react-bootstrap/TabContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/esm/Nav";
import TabContent from "react-bootstrap/TabContent";
import { default as BSTabPane } from "react-bootstrap/TabPane";
// Styling
import styles from "./TabPane.module.css";

export type TabPaneField = {
  id: string;
  name: string;
  type?: "nav" | "subheader";
  renderTabPane?: () => React.ReactNode;
};

interface TabPaneProps {
  id: string;
  fields: TabPaneField[];
}

const TabPane = ({ id, fields }: TabPaneProps) => {
  if (_.isEmpty(fields)) {
    return null;
  }

  return (
    <TabContainer
      id={id}
      defaultActiveKey={!_.isEmpty(fields) ? fields[0].id : null}
      transition={false}
    >
      <Row>
        <Col lg={3} className={styles.tabOptions}>
          <Nav variant="pills" className="flex-column">
            {/* Map the pills on the side (or top if smaller screen) */}
            {fields.map((field) => {
              // If subheader, return a navigation subheader, otherwise the nav pill
              return field.type === "subheader" ? (
                <h4 key={field.id} className={styles.subheader}>
                  {field.name}
                </h4>
              ) : (
                <Nav.Item key={field.id} as={SideNavItem}>
                  <Nav.Link as={SideNavLink} eventKey={field.id}>
                    {field.name}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Col>
        <Col lg={9} className={styles.tabPane}>
          <TabContent>
            {/* Map the Pane content */}
            {fields.map(({ id, name, type, renderTabPane }) => (
              <BSTabPane key={id} eventKey={id}>
                {renderTabPane ? renderTabPane() : null}
              </BSTabPane>
            ))}
          </TabContent>
        </Col>
      </Row>
    </TabContainer>
  );
};

export default TabPane;
