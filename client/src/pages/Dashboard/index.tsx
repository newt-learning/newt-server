import React from "react";
import _ from "lodash";
// API
import { useFetchAllContent } from "../../api/content";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
} from "../../components";
import InProgressCard from "./InProgressCard";
// Styling
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { data, isLoading } = useFetchAllContent();

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
        {isLoading
          ? "Loading..."
          : _.map(inProgressContent, (item) => (
              <InProgressCard
                key={item._id}
                title={item.name}
                authors={item.authors}
                description={item.description}
              />
            ))}
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default Dashboard;
