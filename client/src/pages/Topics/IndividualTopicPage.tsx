import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useParams, useLocation, useHistory } from "react-router-dom";
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
  const location = useLocation();

  // React router state type stuff was annoying. Couldn't access .name so ¯\_(ツ)_/¯
  const state: any = location.state;

  // If topic name is passed through location state, use it
  const [topicName] = useState(state ? state.name : null);

  const history = useHistory();

  const [currentContent, setCurrentContent] = useState<any | null>(null);

  console.log(currentContent);

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
          {/* If topicName exists, show that immediately. Otherwise wait for data to load */}
          <h2>{topicName ? topicName : data ? data.name : "..."}</h2>
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
            authors={currentContent?.authors}
            source={currentContent?.videoInfo?.source}
            mediaId={currentContent?.videoInfo?.videoId}
            thumbnailUrl={currentContent?.thumbnailUrl}
            description={currentContent?.description}
            bookInfo={{
              pageCount: currentContent?.bookInfo?.pageCount,
              pagesRead: currentContent?.bookInfo?.pagesRead,
            }}
            // hasQuiz={currentContent?.isOnNewtContentDatabase ?? false}
            hasQuiz={false} // Don't show for now
          />
        </AppContentDetails>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default IndividualTopicPage;
