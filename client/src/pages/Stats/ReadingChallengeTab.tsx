import React from "react";
import _ from "lodash";
import { useFetchChallenges } from "../../api/challenges";

const ChallengeTab = () => {
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

  return <div>{JSON.stringify(readingChallengeData)}</div>;
};

export default ChallengeTab;
