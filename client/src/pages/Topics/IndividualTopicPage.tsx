import React, { useState } from "react";
import _ from "lodash";
import { useParams, useLocation } from "react-router-dom";
// API
import { useFetchTopic } from "../../api/topics";
// Components
import { ContentInbox } from "../../components";
// Types
import { OptionsDropdownItemType } from "../../components/ContentInbox";
import styles from "./Topics.module.css";
import Modal from "react-bootstrap/esm/Modal";

interface TopicContentData {
  _id: string;
  name: string;
}

const IndividualTopicPage = () => {
  const { topicId } = useParams();
  const location = useLocation();

  const [showEditModal, setShowEditModal] = useState(false);

  // React router state type stuff was annoying. Couldn't access .name so ¯\_(ツ)_/¯
  const state: any = location.state;

  // If topic name is passed through location state, use it
  const [topicName] = useState(state ? state.name : null);

  const { isLoading, data, isError } = useFetchTopic(topicId);

  const dropdownMenu: OptionsDropdownItemType[] = [
    {
      type: "item",
      title: "Edit",
      onClick: () => setShowEditModal(true),
    },
  ];

  return (
    <>
      <ContentInbox
        title={topicName ? topicName : data ? data.name : "..."}
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
      </Modal>
    </>
  );
};

export default IndividualTopicPage;
