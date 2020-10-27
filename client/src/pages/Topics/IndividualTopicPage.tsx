import React, { useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
// API
import {
  useFetchTopic,
  useUpdateTopic,
  useDeleteTopic,
} from "../../api/topics";
// Components
import { ContentInbox, DeleteItemModal } from "../../components";
// Types
import { OptionsDropdownItemType } from "../../components/OptionsDropdown";
import styles from "./Topics.module.css";
import Modal from "react-bootstrap/Modal";
import TopicForm, { TopicFormValues } from "./TopicForm";

const IndividualTopicPage = () => {
  // @ts-ignore
  const { topicId } = useParams();
  // Get name of topic from location state
  const location: any = useLocation();
  const { state: locationState } = location;

  const history = useHistory();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { isLoading, data, isError } = useFetchTopic(topicId);
  const [updateTopic, { error: updateTopicError }] = useUpdateTopic();
  const [
    deleteTopic,
    { isLoading: isDeleting, error: deleteTopicError },
  ] = useDeleteTopic();

  const dropdownMenu: OptionsDropdownItemType[] = [
    {
      type: "item",
      title: "Edit",
      onClick: () => setShowEditModal(true),
    },
    {
      type: "divider",
    },
    {
      type: "item",
      title: "Delete",
      onClick: () => setShowDeleteModal(true),
    },
  ];

  const handleEditTopic = (values: TopicFormValues) => {
    updateTopic({ topicId, data: values });
    setShowEditModal(false);
  };
  const handleDeleteTopic = async () => {
    await deleteTopic(topicId);
    // Close modal
    setShowDeleteModal(false);
    // Go back to Topics page
    history.goBack();
  };

  if (updateTopicError) {
    console.log(updateTopicError);
  }
  if (deleteTopicError) {
    console.error(deleteTopicError);
  }

  return (
    <>
      <ContentInbox
        title={data?.name || locationState?.name || "..."}
        contentData={data?.content}
        showOptionsDropdown={true}
        optionsDropdownMenu={dropdownMenu}
        backButtonStyle={styles.backBtn}
        isLoading={isLoading}
        isError={isError}
      />
      <Modal
        size="lg"
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        backdrop="static"
        animation={false}
      >
        <Modal.Header closeButton>Edit Topic</Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <TopicForm
            initialValues={{
              name: data ? data.name : "",
            }}
            onSubmit={handleEditTopic}
            buttonTitle="Edit"
            buttonCategory="secondary"
          />
        </Modal.Body>
      </Modal>
      <DeleteItemModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        itemToDelete="topic"
        onDelete={handleDeleteTopic}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default IndividualTopicPage;