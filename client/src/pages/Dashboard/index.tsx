import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
// API
import { useFetchAllContentAndSeries } from "../../api/content";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  ContentCard,
  MessageBox,
  Badge,
  getFirstThreeThumbnailsForSeries,
} from "../../components";
// Hooks
import useMetaTags from "../../hooks/useMetaTags";
// Styling
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  useMetaTags({
    title: "Dashboard / Newt",
  });

  const { data, isLoading, isError } = useFetchAllContentAndSeries();

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
          _.map(inProgressContent, (item) => {
            // Refactor ?
            const thumbnails =
              item.type === "series"
                ? getFirstThreeThumbnailsForSeries(item.contentIds, "Newt")
                : item.thumbnailUrl
                ? [
                    {
                      url: item.thumbnailUrl,
                      alt: `Thumbnail for ${item.name}`,
                    },
                  ]
                : [];

            return (
              <ContentCard
                key={item._id}
                type={item.type}
                title={item.name}
                authors={item.authors}
                description={item.description}
                thumbnails={thumbnails}
                titleLink={`/shelves/currently-learning/${item._id}`}
                progressInfo={
                  item.type === "series"
                    ? {
                        total: item.contentIds.length,
                        numCompleted: _.filter(item.contentIds, {
                          shelf: "Finished Learning",
                        }).length,
                      }
                    : undefined
                }
              />
            );
          })
        )}
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default Dashboard;
