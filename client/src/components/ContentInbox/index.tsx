// This is the container for viewing Content in inbox-style (list on left side,
// details on right) -- used in Topics/Shelves
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import classnames from "classnames/bind";
// Components
import { FiArrowLeft } from "react-icons/fi";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  AppContentList,
  AppContentDetails,
} from "../AppContainers";
import AppContentListCard from "../AppContentListCard";
import ContentFlow from "../../pages/Content/ContentFlow";
// Styling
import styles from "./ContentInbox.module.css";

interface ContentInboxProps {
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  contentData?: any;
  backButtonStyle?: string;
}

interface ContentData {
  _id: string;
  name: string;
}

const cx = classnames.bind(styles);

const ContentInbox = ({
  title,
  isLoading,
  isError,
  contentData,
  backButtonStyle,
}: // currentContent,
ContentInboxProps) => {
  const history = useHistory();

  const [currentContent, setCurrentContent] = useState<any>(null);

  useEffect(() => {
    if (!_.isEmpty(contentData)) {
      setCurrentContent(contentData[0]);
    }
  }, [contentData]);

  return (
    <AppMainContainer variant="inbox">
      <AppHeaderContainer>
        <>
          <div onClick={() => history.goBack()}>
            <FiArrowLeft
              size={24}
              className={cx({ backBtn: true }, backButtonStyle)}
            />
          </div>
          {/* If topicName exists, show that immediately. Otherwise wait for data to load */}
          <h2>{title}</h2>
        </>
      </AppHeaderContainer>
      <AppContentContainer variant="inbox">
        <AppContentList>
          {contentData?.map(({ _id, name }: ContentData, index: number) => (
            <AppContentListCard
              name={name}
              onClick={() => setCurrentContent(contentData[index])}
              isActive={_id === currentContent?._id}
              key={_id}
            />
          ))}
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

export default ContentInbox;
