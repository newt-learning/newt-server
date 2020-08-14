import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useParams, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
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
import ContentFlow from "../Content/ContentFlow";
// Styling
import styles from "./Topics.module.css";

interface TopicContentData {
  _id: string;
  name: string;
}

const IndividualTopicPage = () => {
  const { topicId } = useParams();
  const history = useHistory();

  const [currentContent, setCurrentContent] = useState<any | null>(null);

  const { isLoading, data, isError } = useFetchTopic(topicId);

  useEffect(() => {
    if (!_.isEmpty(data?.content)) {
      setCurrentContent(data.content[0]);
    }
  }, [data]);

  return (
    <AppMainContainer variant="inbox">
      <AppHeaderContainer>
        <>
          <div onClick={() => history.goBack()}>
            <FiArrowLeft size={24} className={styles.backBtn} />
          </div>
          <h2>{data ? data.name : "..."}</h2>
        </>
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
        <AppContentDetails>
          <ContentFlow
            variant="inbox"
            title={currentContent?.name}
            type={currentContent?.type}
            source={currentContent?.videoInfo?.source}
            mediaId={currentContent?.videoInfo?.videoId}
            description={currentContent?.description}
            // hasQuiz={currentContent?.isOnNewtContentDatabase ?? false}
            hasQuiz={false} // Don't show for now
          />
        </AppContentDetails>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default IndividualTopicPage;
