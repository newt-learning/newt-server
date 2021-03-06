import React, { useState } from "react";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  TabPane,
} from "../../components";
import ReadingChallengeTab from "./ReadingChallengeTab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { TabPaneField } from "../../components/TabPane";
// Hooks
import useMetaTags from "../../hooks/useMetaTags";
// API
import { useStatsByPeriod, StatsPeriodType } from "../../api/stats";
import styles from "./Stats.module.css";

const BooksPane = () => {
  const [period, setPeriod] = useState<StatsPeriodType>("week");
  const { isLoading, isError, data: allStatsData } = useStatsByPeriod(period);

  const data = allStatsData ? allStatsData[period] : null;

  return (
    <Container>
      <Row style={{ justifyContent: "center" }}>
        <ToggleButtonGroup
          type="radio"
          name="periods"
          value={period}
          onChange={setPeriod}
        >
          <ToggleButton variant="light" value="day">
            Day
          </ToggleButton>
          <ToggleButton variant="light" value="week">
            Week
          </ToggleButton>
          <ToggleButton variant="light" value="month">
            Month
          </ToggleButton>
          <ToggleButton variant="light" value="year">
            Year
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : period === "day" ? (
        <div
          className={styles.chartContainer}
        >{`${data[0].value} ${data[0].unit} today.`}</div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 50, bottom: 5 }}>
            <YAxis />
            <XAxis dataKey="x" />
            <Bar dataKey="y" fill="#1089ff" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

const StatsPage = () => {
  useMetaTags({
    title: "Stats / Newt",
  });

  const tabFields: TabPaneField[] = [
    {
      id: "books",
      name: "Books",
      type: "nav",
      renderTabPane: () => <BooksPane />,
    },
    {
      id: "challengesHeader",
      name: "Challenges",
      type: "subheader",
    },
    {
      id: "reading-challenge",
      name: "Reading Challenge",
      type: "nav",
      renderTabPane: () => <ReadingChallengeTab />,
    },
  ];

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Stats</h2>
      </AppHeaderContainer>
      <AppContentContainer variant="tab-pane">
        <TabPane id="stats-tabs" fields={tabFields} />
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default StatsPage;
