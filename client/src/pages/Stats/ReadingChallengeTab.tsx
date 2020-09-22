import React from "react";
import _ from "lodash";
import { useFetchChallenges } from "../../api/challenges";
import InProgressCard from "../Dashboard/InProgressCard";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Stats.module.css";

const ReadingChallengeTab = () => {
  const { isLoading, data: allChallengesData } = useFetchChallenges();

  const readingChallengeData = _.filter(allChallengesData, {
    challengeType: "reading",
  });

  console.table(readingChallengeData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (_.isEmpty(readingChallengeData)) {
    return <div>No reading challenges</div>;
  }

  const {
    numItemsFinished,
    totalItems,
    itemsFinished,
  } = readingChallengeData[0];
  const progress = numItemsFinished / totalItems;
  const finishedFraction = `${numItemsFinished} / ${totalItems}`;

  return (
    <>
      <div className={styles.challengeProgressContainer}>
        <div style={{ width: 225, height: 225 }}>
          <CircularProgressbar
            value={progress}
            maxValue={1}
            text={finishedFraction}
            styles={{
              path: {
                stroke: "#1089ff",
                transition: "stroke-dashoffset 0.5s ease 0s",
              },
              trail: { stroke: "#e2e8f0" },
              text: { fill: "#1089ff", fontSize: "12px" },
            }}
          />
        </div>
      </div>
      {/* Show finished boooks */}
      <div className={styles.finishedItems}>
        {!_.isEmpty(itemsFinished)
          ? itemsFinished.map((item: any) => (
              <InProgressCard
                title={item.name}
                authors={item.authors}
                thumbnailUrl={item.thumbnailUrl}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default ReadingChallengeTab;
