import React, { useState } from "react";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  TabPane,
} from "../../components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { TabPaneField } from "../../components/TabPane";
import { useStatsByPeriod, StatsPeriodType } from "../../api/stats";

const BooksPane = () => {
  const [period, setPeriod] = useState<StatsPeriodType>("week");
  const { isLoading, data: allStatsData } = useStatsByPeriod(period);

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
      {/* <Row> */}
      {isLoading ? (
        <div>Loading...</div>
      ) : period === "day" ? (
        <div>{JSON.stringify(data)}</div>
      ) : (
        <div>
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{ top: 50, bottom: 5 }}
          >
            <YAxis />
            <XAxis dataKey="x" />
            <Bar dataKey="y" fill="#1089ff" radius={[5, 5, 0, 0]} />
          </BarChart>
        </div>
      )}
      {/* </Row> */}
    </Container>
  );
};

const StatsPage = () => {
  const tabFields: TabPaneField[] = [
    {
      id: "books",
      name: "Books",
      renderTabPane: () => <BooksPane />,
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
