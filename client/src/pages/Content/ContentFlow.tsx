import React, { useState } from "react";
import _ from "lodash";
import classnames from "classnames/bind";
// API
import { useUpdateContent, useDeleteContent } from "../../api/content";
import { useAddContentToChallenge } from "../../api/challenges";
// Components
import {
  Button,
  Badge,
  OptionsDropdown,
  DeleteItemModal,
} from "../../components";
import BookSection from "./BookSection";
import ChangeShelfForm from "./ChangeShelfForm";
import SelectPlaylistsForm, {
  PlaylistSelectOptionType,
} from "./SelectPlaylistsForm";
import AddEditDatesForm from "./AddEditDatesForm";
import ShowMoreShowLess from "./ShowMoreShowLess";
import PlaylistCard, { AddPlaylistCard } from "../UserPlaylists/PlaylistCard";
import Modal from "react-bootstrap/Modal";
import Skeleton from "react-loading-skeleton";
// Styling
import styles from "./ContentFlow.module.css";
// Helpers
import { shortenText } from "../Shelves/helpers";
import { figureOutShelfMovingDataChanges } from "./helpers";
// Types
import { OptionsDropdownItemType } from "../../components/OptionsDropdown";

export type PlaylistType =
  | {
      _id: string;
      name: string;
    }
  | string;
type ShelfType = "Currently Learning" | "Want to Learn" | "Finished Learning";
export type StartFinishDateType = {
  dateStarted: Date | number | null;
  dateCompleted: Date | number | null;
};

interface ContentFlowProps {
  id: string;
  title: string;
  type: string;
  shelf: ShelfType;
  startFinishDates: StartFinishDateType[];
  authors?: string[];
  playlists?: PlaylistType[];
  source?: string;
  mediaId?: string;
  thumbnailUrl?: string;
  description?: string;
  bookInfo?: {
    pageCount: number | undefined;
    pagesRead: number | undefined;
  };
  hasQuiz?: boolean;
  onTakeQuiz?: () => void;
  buttonText?: string;
  variant: "default" | "inbox"; // No container styling for inbox
  isLoading?: boolean;
}

let cx = classnames.bind(styles);

const ContentFlow = ({
  id,
  title,
  authors,
  type,
  shelf,
  startFinishDates,
  playlists,
  source,
  mediaId,
  thumbnailUrl,
  description,
  bookInfo,
  hasQuiz,
  onTakeQuiz,
  buttonText,
  variant,
  isLoading,
}: ContentFlowProps) => {
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [showChangeShelfModal, setShowChangeShelfModal] = useState(false);
  const [showAddPlaylistsModal, setShowAddPlaylistsModal] = useState(false);
  const [showAddEditDatesModal, setShowAddEditDatesModal] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Updating content
  const [updateContent] = useUpdateContent();
  const [deleteContent, { isLoading: isDeleting }] = useDeleteContent();
  const [addContentToChallenge] = useAddContentToChallenge();

  const updateShelf = (selectedShelf: ShelfType) => {
    const updateData = figureOutShelfMovingDataChanges(shelf, selectedShelf, {
      startFinishDates,
    });

    updateContent({ contentId: id, data: updateData });

    // If it's a book and the selected shelf is "Finished Learning", do
    // additional stuff like updating the reading challenge
    if (type === "book" && selectedShelf === "Finished Learning") {
      // Update the reading challenge by adding this book to the finished list
      // if a challenge exists.
      addContentToChallenge(id);
    }

    // Close modal
    setShowChangeShelfModal(false);
  };

  const handleDeleteItem = async () => {
    await deleteContent(id);
    setShowDeleteItemModal(false);
  };

  // Render a new iframe each time because if I just change src, it affects browser
  // history (clicking the back button cycles through previous iframes)
  const IFrame = ({ title, src }: any) => (
    <iframe
      id="ytplayer"
      title={title}
      width="640"
      height="360"
      src={src}
      frameBorder="0"
      allowFullScreen
    />
  );

  const dropdownMenu: OptionsDropdownItemType[] = [
    {
      type: "item",
      title: `Add/Edit Dates ${
        type === "book" ? "Read" : type === "video" ? "Watched" : ""
      }`,
      onClick: () => setShowAddEditDatesModal(true),
    },
    {
      type: "divider",
    },
    {
      type: "item",
      title: "Delete",
      onClick: () => setShowDeleteItemModal(true),
    },
  ];

  return (
    <div
      className={cx({
        container: true,
        inbox: variant === "inbox",
      })}
    >
      {isLoading ? (
        <Skeleton />
      ) : title ? (
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            {title}{" "}
            {/* Do this a better way where there's type-checking AND I can just pass data.
              Might have to set types for all the data */}
            {shelf ? (
              <Badge variant={shelf ? shelf : "default"}>{shelf}</Badge>
            ) : null}
          </h2>
          <OptionsDropdown
            id={`${title}-options-dropdown`}
            options={dropdownMenu}
          />
        </div>
      ) : null}
      <div className={styles.flowContainer}>
        {/* If video, display Watch video instruction */}
        {type === "video" ? (
          <h4 className={styles.instruction}>1. Watch the video</h4>
        ) : null}
        {/* If video and from youtube, embed video */}
        {type === "video" && source?.toLowerCase() === "youtube" ? (
          <div className={styles.videoContainer}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <IFrame
                title={title}
                src={`https://www.youtube.com/embed/${mediaId}`}
              />
            )}
          </div>
        ) : // The !shelf is for books in Newt Discover section (not user added)
        type === "book" && !shelf ? (
          <div className={styles.bookContainer}>
            <img
              src={thumbnailUrl}
              alt={title}
              className={styles.bookThumbnail}
            />
            <div className={styles.bookInfo}>
              {authors ? (
                <div className={styles.authors}>{`by ${authors.join(
                  ", "
                )}`}</div>
              ) : null}
            </div>
          </div>
        ) : // Otherwise, if it's a book, show Book Section (user added)
        type === "book" ? (
          <BookSection
            id={id}
            title={title}
            thumbnailUrl={thumbnailUrl}
            authors={authors}
            pageCount={bookInfo?.pageCount}
            pagesRead={bookInfo?.pagesRead || 0}
            startFinishDates={startFinishDates}
            showProgressBar={
              shelf === "Currently Learning" || shelf === "Finished Learning"
            }
          />
        ) : null}
        {/* Shelf info */}
        {shelf ? (
          <div>
            <h4 className={styles.subheading}>Shelf</h4>
            <div className={styles.shelfContainer}>
              <Badge variant={shelf ? shelf : "default"} size="large">
                {shelf}
              </Badge>
              <Button
                category="secondary"
                onClick={() => setShowChangeShelfModal(true)}
              >
                Change Shelf
              </Button>
            </div>
            <p></p>
          </div>
        ) : null}
        {/* Playlists */}
        {playlists && typeof playlists[0] !== "string" ? (
          <>
            <h4 className={styles.subheading}>Playlists</h4>
            <div className={styles.playlists}>
              {_.map(playlists, (playlist) => {
                return typeof playlist === "string" ? null : (
                  <PlaylistCard
                    key={playlist._id}
                    variant="pill"
                    id={playlist._id}
                    name={playlist.name}
                  />
                );
              })}
              <AddPlaylistCard onClick={() => setShowAddPlaylistsModal(true)} />
            </div>
          </>
        ) : null}
        {/* Display description if it's there */}
        {description ? (
          <>
            <h4 className={styles.subheading}>Description</h4>
            <p className={styles.description}>
              {showMore ? description : shortenText(description, 400)}
              <ShowMoreShowLess
                showMore={showMore}
                onClick={() => setShowMore(!showMore)}
              />
            </p>
          </>
        ) : null}
        {/* If there's a quiz available, show button to take/view it */}
        {hasQuiz ? (
          <>
            <h4 className={styles.instruction}>2. Check your understanding</h4>
            <div className={styles.btnContainer}>
              <Button
                category="primary"
                className={styles.quizBtn}
                onClick={onTakeQuiz}
              >
                {buttonText}
              </Button>
            </div>
          </>
        ) : null}
      </div>
      {/* Modal to change shelf */}
      <Modal
        show={showChangeShelfModal}
        onHide={() => setShowChangeShelfModal(false)}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>Change Shelf</Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChangeShelfForm
            initialValues={{ shelf }}
            onSubmit={(values) => updateShelf(values.shelf)}
          />
        </Modal.Body>
      </Modal>
      {/* Modal to add playlists */}
      <Modal
        show={showAddPlaylistsModal}
        onHide={() => setShowAddPlaylistsModal(false)}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>Add Playlists</Modal.Header>
        <Modal.Body>
          <SelectPlaylistsForm
            initialPlaylists={playlists?.map((playlist: PlaylistType) => {
              // Convert from db playlist type to input selection type
              if (playlist && typeof playlist !== "string") {
                const playlistOption: PlaylistSelectOptionType = {
                  id: playlist._id,
                  value: playlist.name,
                  label: playlist.name,
                };

                return playlistOption;
              }
            })}
            contentId={id}
            closeModal={() => setShowAddPlaylistsModal(false)}
          />
        </Modal.Body>
      </Modal>
      {/* Modal to add/edit dates read/watched */}
      <Modal
        show={showAddEditDatesModal}
        onHide={() => setShowAddEditDatesModal(false)}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          {`Add/Edit Dates ${
            type === "book" ? "Read" : type === "video" ? "Watched" : ""
          }`}
        </Modal.Header>
        <Modal.Body>
          <AddEditDatesForm initialValues={{ startFinishDates }} />
        </Modal.Body>
      </Modal>
      {/* Modal to delete content */}
      <DeleteItemModal
        show={showDeleteItemModal}
        onHide={() => setShowDeleteItemModal(false)}
        itemToDelete={type}
        onDelete={handleDeleteItem}
        isDeleting={isDeleting}
      />
    </div>
  );
};

ContentFlow.defaultProps = {
  buttonText: "Take the quiz",
  variant: "default",
};

export default ContentFlow;
