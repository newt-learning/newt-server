// This is the container for viewing Content in inbox-style (list on left side,
// details on right) -- used in Playlists/Shelves
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import classnames from "classnames/bind";
// Context
import { useData as useAuthData } from "../../context/AuthContext";
// Components
import { FiArrowLeft } from "react-icons/fi";
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  AppContentList,
  AppContentListCard,
  AppContentDetails,
  Button,
  OptionsDropdown,
} from "..";
import ContentFlow from "../../pages/Content/ContentFlow";
import Skeleton from "react-loading-skeleton";
import Modal from "react-bootstrap/Modal";
import AddToLibrary, { AddToLibraryFormValues } from "./AddToLibrary";
// Styling
import styles from "./ContentInbox.module.css";
// Helpers
import { getFirstThreeThumbnailsForSeries } from "..";
// Types
import { OptionsDropdownItemType } from "../OptionsDropdown";

export type ContentTypeType = "book" | "video" | "series";

interface ContentInboxProps {
  title: string;
  creators?: string;
  isLoading?: boolean;
  isError?: boolean;
  contentData?: any;
  showOptionsDropdown?: boolean;
  optionsDropdownMenu?: OptionsDropdownItemType[];
  // To Add series/playlist from Discover to User Library
  addToLibrary?: "newt-series" | "newt-playlist";
  onAddToLibrary?: (values?: any) => void;
  className?: string; // Class for parent container (AppMainContainer)
  backButtonStyle?: string;
}

interface ContentData {
  _id: string;
  name: string;
  type: ContentTypeType;
  thumbnailUrl?: string;
  contentIds?: [any]; // Content in a series
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
  addToLibrary,
  onAddToLibrary,
  className,
  backButtonStyle,
}: ContentInboxProps) => {
  const history = useHistory();
  const {
    state: { exists },
  } = useAuthData();

  // Modal to add series to Library (in Discover screen)
  const [showAddToLibraryModal, setShowAddToLibraryModal] = useState(false);
  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);

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

  // Temp so both are handled
  const handlePressAddToLibraryButton = async () => {
    if (addToLibrary === "newt-series") {
      setShowAddToLibraryModal(true);
    } else if (addToLibrary === "newt-playlist") {
      if (exists && onAddToLibrary) {
        setIsAddingToLibrary(true);
        await onAddToLibrary();
        setIsAddingToLibrary(false);
      } else {
        setShowAddToLibraryModal(true);
      }
    }
  };

  // Set loading indicator, add series to library, then close modal
  const handleAddToLibrary = async (values: AddToLibraryFormValues) => {
    if (onAddToLibrary) {
      setIsAddingToLibrary(true);
      await onAddToLibrary(values);
      setShowAddToLibraryModal(false);
      setIsAddingToLibrary(false);
    }
  };

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
        {/* Only show the options container if should display either the Add to
            Library button or the Options dropdown */}
        {addToLibrary || showOptionsDropdown ? (
          <div className={styles.optionsContainer}>
            {/* Show Add to Library button if requested */}
            {addToLibrary ? (
              <Button
                category="success"
                isLoading={isAddingToLibrary}
                onClick={handlePressAddToLibraryButton}
                style={{
                  minWidth: "120px",
                  marginRight: showOptionsDropdown ? "1rem" : 0,
                }}
              >
                Add to Library
              </Button>
            ) : null}
            {/* Show 3-dot options menu with dropdown for additional options */}
            {showOptionsDropdown ? (
              <OptionsDropdown
                id={`${title}-page-more-dropdown`}
                options={optionsDropdownMenu}
              />
            ) : null}
          </div>
        ) : null}
      </AppHeaderContainer>
      <AppContentContainer variant="inbox">
        <AppContentList>
          {isLoading ? (
            <Skeleton height={100} count={4} />
          ) : (
            contentData?.map(
              (
                { _id, type, name, thumbnailUrl, contentIds }: ContentData,
                index: number
              ) => {
                // Refactor ?
                const thumbnails =
                  type === "series"
                    ? getFirstThreeThumbnailsForSeries(contentIds, "Newt")
                    : thumbnailUrl
                    ? [{ url: thumbnailUrl, alt: `Thumbnail for ${name}` }]
                    : [];

                return (
                  <AppContentListCard
                    name={name}
                    contentType={type}
                    thumbnails={thumbnails}
                    onClick={() => setCurrentContent(contentData[index])}
                    isActive={_id === currentContent?._id}
                    key={_id}
                  />
                );
              }
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
      {/* Add to Library modal */}
      {showAddToLibraryModal && addToLibrary && onAddToLibrary ? (
        <Modal
          show={showAddToLibraryModal}
          onHide={() => setShowAddToLibraryModal(false)}
          size="lg"
          animation={false}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <h3 style={{ margin: 0 }}>Add to Library</h3>
          </Modal.Header>
          <Modal.Body
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "3rem 4rem",
            }}
          >
            <AddToLibrary
              type={addToLibrary}
              onSubmit={handleAddToLibrary}
              isLoading={isAddingToLibrary}
            />
          </Modal.Body>
        </Modal>
      ) : null}
    </AppMainContainer>
  );
};

export default ContentInbox;
