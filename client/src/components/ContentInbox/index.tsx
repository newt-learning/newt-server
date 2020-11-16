// This is the container for viewing Content in inbox-style (list on left side,
// details on right) -- used in Playlists/Shelves
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
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
import OptionsDropdown, { OptionsDropdownItemType } from "../OptionsDropdown";
import ContentFlow from "../../pages/Content/ContentFlow";
import Skeleton from "react-loading-skeleton";
// Styling
import styles from "./ContentInbox.module.css";

interface ContentInboxProps {
  title: string;
  creators?: string;
  isLoading?: boolean;
  isError?: boolean;
  contentData?: any;
  showOptionsDropdown?: boolean;
  optionsDropdownMenu?: OptionsDropdownItemType[];
  className?: string; // Class for parent container (AppMainContainer)
  backButtonStyle?: string;
}

interface ContentData {
  _id: string;
  name: string;
  thumbnailUrl?: string;
}

const cx = classnames.bind(styles);

const ContentInbox = ({
  title,
  creators,
  isLoading,
  isError,
  contentData,
  showOptionsDropdown = false,
  optionsDropdownMenu,
  className,
  backButtonStyle,
}: ContentInboxProps) => {
  const history = useHistory();

  const [currentContent, setCurrentContent] = useState<any>(null);
  // @ts-ignore
  // Get contentId from route params, if it exists. This is used to set the inbox
  // to the right content immediately, rather than always starting at the top
  const { contentId } = useParams();

  // Okay there's this weird bug where the Inbox keeps moving to the first item
  // if I go to a different tab, or go off screen, or even open Inspector and close
  // it, but ONLY for Shelves, not for Playlists. Must be something from changing data,
  // but can't seem to find it. Adding the second condition fixes it. :S
  // Nevermind went back to old one bec data wouldn't update instantly after
  // changes (does in Shelves, doesn't in Playlists??)
  useEffect(() => {
    if (!_.isEmpty(contentData)) {
      // If a contentId exists as a URL parameter, use that to filter the data
      // and jump to that specific item. If not, start at first one
      if (contentId) {
        const chosenContent = _.filter(contentData, { _id: contentId })[0];
        setCurrentContent(chosenContent);
      } else {
        setCurrentContent(contentData[0]);
      }
    } else {
      setCurrentContent(null);
    }
  }, [contentData, contentId]);

  return (
    <AppMainContainer variant="inbox" className={className}>
      <AppHeaderContainer>
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <div onClick={() => history.goBack()}>
              <FiArrowLeft
                size={24}
                className={cx({ backBtn: true }, backButtonStyle)}
              />
            </div>
            {/* If playlistName exists, show that immediately. Otherwise wait for data to load */}
            {isLoading ? <Skeleton /> : <h2>{title}</h2>}
          </div>
          <div className={styles.creatorsContainer}>
            {/* Creators */}
            {creators ? (
              <p className={styles.creators}>{`by ${creators}`}</p>
            ) : null}
            {/* Number of items in series/playlist */}
            {/* {!_.isEmpty(contentData) ? ( */}
            {!isLoading && (
              <p className={styles.numItems}>{`${
                contentData?.length || 0
              } items`}</p>
            )}
            {/* ) : null} */}
          </div>
        </div>
        {/* Show 3-dot options menu with dropdown for additional options */}
        {showOptionsDropdown ? (
          <OptionsDropdown
            id={`${title}-page-more-dropdown`}
            options={optionsDropdownMenu}
          />
        ) : null}
      </AppHeaderContainer>
      <AppContentContainer variant="inbox">
        <AppContentList>
          {isLoading ? (
            <Skeleton height={100} count={4} />
          ) : (
            contentData?.map(
              ({ _id, name, thumbnailUrl }: ContentData, index: number) => (
                <AppContentListCard
                  name={name}
                  thumbnailUrl={thumbnailUrl}
                  onClick={() => setCurrentContent(contentData[index])}
                  isActive={_id === currentContent?._id}
                  key={_id}
                />
              )
            )
          )}
        </AppContentList>
        <AppContentDetails>
          <ContentFlow
            variant="inbox"
            id={currentContent?._id}
            title={currentContent?.name}
            type={currentContent?.type}
            shelf={currentContent?.shelf}
            startFinishDates={currentContent?.startFinishDates}
            // .authors for user data, .contentCreators for Newt Discover data
            authors={
              currentContent?.authors ||
              currentContent?.contentCreators?.map(
                (creator: any) => creator.name
              )
            }
            playlists={currentContent?.playlists}
            source={currentContent?.videoInfo?.source || currentContent?.source}
            mediaId={
              currentContent?.videoInfo?.videoId || currentContent?.sourceId
            }
            thumbnailUrl={currentContent?.thumbnailUrl}
            description={currentContent?.description}
            bookInfo={{
              pageCount: currentContent?.bookInfo?.pageCount,
              pagesRead: currentContent?.bookInfo?.pagesRead,
            }}
            seriesInfo={{
              seriesContent: currentContent?.contentIds,
            }}
            isLoading={isLoading}
            // hasQuiz={currentContent?.isOnNewtContentDatabase ?? false}
            hasQuiz={false} // Don't show for now
          />
        </AppContentDetails>
      </AppContentContainer>
    </AppMainContainer>
  );
};

export default ContentInbox;
