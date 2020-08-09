import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
// API
import { useFetchTopic } from "../../api/topics";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  AppContentList,
  AppContentDetails,
  AppContentListCard,
} from "../../components";

interface TopicContentData {
  _id: string;
  name: string;
}

const IndividualTopicPage = () => {
  const { topicId } = useParams();
  const [currentContent, setCurrentContent] = useState<any | null>(null);

  const { isLoading, data, isError } = useFetchTopic(topicId);

  useEffect(() => {
    if (!_.isEmpty(data?.content)) {
      setCurrentContent(data.content[0]);
    }
  }, [data]);

  console.log(currentContent?.name);

  return (
    <AppMainContainer variant="inbox">
      <AppHeaderContainer>
        <h2>{data ? data.name : "..."}</h2>
      </AppHeaderContainer>
      <AppContentContainer variant="inbox">
        <AppContentList>
          {data?.content.map(
            ({ _id, name }: TopicContentData, index: number) => (
              <AppContentListCard
                name={name}
                onClick={() => setCurrentContent(data.content[index])}
                isActive={_id === currentContent?._id}
                key={_id}
              />
            )
          )}
        </AppContentList>
        <AppContentDetails>{currentContent?.name}</AppContentDetails>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default IndividualTopicPage;
