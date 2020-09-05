import React, { useState } from "react";
// API
import { useUpdateBookProgress } from "../../api/content";
import { useCreateLearningUpdate } from "../../api/learningUpdates";
// Components
import { Button, ProgressBar } from "../../components";
import Modal from "react-bootstrap/Modal";
import UpdateProgressForm, {
  UpdateProgressFormValues,
} from "./UpdateProgressForm";
// Styling
import styles from "./BookSection.module.css";

interface BookSectionProps {
  id: string;
  title: string;
  authors?: string[];
  thumbnailUrl?: string;
  pageCount?: number;
  pagesRead: number;
}

const BookSection = ({
  id,
  title,
  thumbnailUrl,
  authors,
  pageCount,
  pagesRead = 0,
}: BookSectionProps) => {
  const [showUpdateProgressModal, setShowUpdateProgressModal] = useState(false);
  const [updateBookProgress] = useUpdateBookProgress();
  const [createLearningUpdate] = useCreateLearningUpdate();

  const calculatePercentComplete = (
    pagesRead: number | undefined,
    totalPages: number | undefined
  ) => {
    return pagesRead && totalPages
      ? Math.round((pagesRead / totalPages) * 100)
      : 0;
  };

  const handleUpdateProgress = (values: UpdateProgressFormValues) => {
    const learningUpdateData = {
      contentId: id,
      previousPagesRead: pagesRead,
      updatedPagesRead: values.pagesRead,
      numPagesRead: values.pagesRead - pagesRead,
      contentType: "book",
    };

    updateBookProgress({ contentId: id, data: values });
    createLearningUpdate(learningUpdateData);
    setShowUpdateProgressModal(false);
  };

  return (
    <div className={styles.container}>
      <img src={thumbnailUrl} alt={title} />
      <div className={styles.bookInfo}>
        <div>
          {authors ? (
            <div className={styles.authors}>{`by ${authors.join(", ")}`}</div>
          ) : null}
          {pageCount ? (
            <div className={styles.pageCount}>{`${pageCount} pages`}</div>
          ) : null}
        </div>
        <div className={styles.progressBarContainer}>
          <ProgressBar
            percentComplete={calculatePercentComplete(pagesRead, pageCount)}
          />
          <Button
            category="secondary"
            style={styles.updateBtn}
            onClick={() => setShowUpdateProgressModal(true)}
          >
            Update Progress
          </Button>
        </div>
      </div>
      <Modal
        show={showUpdateProgressModal}
        onHide={() => setShowUpdateProgressModal(false)}
        animation={false}
        backdrop="static"
      >
        <Modal.Header closeButton>Update Progress</Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UpdateProgressForm
            initialValues={pagesRead ? { pagesRead } : { pagesRead: 0 }}
            totalPages={pageCount ? pageCount : 1000000000} // Max is a billion pages if not specified. Hack to ensure page validation
            onSubmit={handleUpdateProgress}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookSection;
