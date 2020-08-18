import React, { useState } from "react";
import _ from "lodash";
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
import { OptionsDropdownItemType } from "../../components/ContentInbox";
import styles from "./Topics.module.css";
import Modal from "react-bootstrap/esm/Modal";
import TopicForm, { TopicFormValues } from "./TopicForm";

const IndividualTopicPage = () => {
  const { topicId } = useParams();
  // const location = useLocation();
  const history = useHistory();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // React router state type stuff was annoying. Couldn't access .name so ¯\_(ツ)_/¯
  // const state: any = location.state;

  // If topic name is passed through location state, use it
  // const [topicName] = useState(state ? state.name : null);

  const { isLoading, data, isError } = useFetchTopic(topicId);
  const [updateTopic, { error: updateTopicError }] = useUpdateTopic();
  const [deleteTopic, { error: deleteTopicError }] = useDeleteTopic();

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
  const handleDeleteTopic = () => {
    deleteTopic(topicId);
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
        title={data ? data.name : "..."}
        contentData={data?.content}
        showOptionsDropdown={true}
        optionsDropdownMenu={dropdownMenu}
        backButtonStyle={styles.backBtn}
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
      />
    </>
  );
};

export default IndividualTopicPage;
