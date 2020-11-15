import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
// API
import { useFetchAllContent } from "../../api/content";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  ContentCard,
  MessageBox,
  Badge,
} from "../../components";
// Styling
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { data, isLoading, isError } = useFetchAllContent();

  // Filter out content in progress (currently learning) + order by last updated
  const inProgressContent = _.chain(data)
    .filter((item) => item.shelf === "Currently Learning")
    .orderBy("lastUpdated", "desc")
    .value();

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>In Progress</h2>
      </AppHeaderContainer>
      <AppContentContainer className={styles.container}>
        {isLoading ? (
          "Loading..."
        ) : isError ? (
          "Error"
        ) : _.isEmpty(inProgressContent) ? (
          <MessageBox>
            Looks like your{" "}
            <Badge variant="Currently Learning" className={styles.badge}>
              Currently Learning
            </Badge>{" "}
            shelf is empty. <br />
            <br /> You can{" "}
            <Link to="/add-content">add a new book or video</Link> in there, or
            move one from your{" "}
            <Link to="/shelves/want-to-learn">
              <Badge variant="Want to Learn" className={styles.badge}>
                Want to Learn
              </Badge>
            </Link>{" "}
            shelf. See you soon!
          </MessageBox>
        ) : (
          _.map(inProgressContent, (item) => (
            <ContentCard
              key={item._id}
              title={item.name}
              authors={item.authors}
              description={item.description}
              thumbnailUrl={item.thumbnailUrl}
              titleLink={`/shelves/currently-learning/${item._id}`}
            />
          ))
        )}
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default Dashboard;
