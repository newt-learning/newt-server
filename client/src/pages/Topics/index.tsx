import React, { useState } from "react";
import _ from "lodash";
// API
import { useFetchAllTopics, useCreateTopic } from "../../api/topics";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  MessageBox,
  Button,
} from "../../components";
import TopicCard from "./TopicCard";
import TopicForm from "./TopicForm";
import Modal from "react-bootstrap/Modal";
// Styling
import styles from "./Topics.module.css";

interface TopicData {
  _id: string;
  name: string;
}

interface CreateTopicValues {
  name: string;
}

const TopicsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data, status, error } = useFetchAllTopics();
  const [createTopic, { error: createTopicError }] = useCreateTopic();

  const handleCreateTopic = (values: CreateTopicValues) => {
    createTopic(values);
    setShowCreateModal(false);
  };

  if (createTopicError) {
    console.log(createTopicError);
  }

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Topics</h2>
        <Button category="success" onClick={() => setShowCreateModal(true)}>
          Create topic
        </Button>
      </AppHeaderContainer>
      <AppContentContainer
        className={!_.isEmpty(data) ? styles.container : undefined}
      >
        {status === "loading" ? (
          "Loading..."
        ) : error ? (
          "Error"
        ) : _.isEmpty(data) ? (
          // UI for No topics
          <MessageBox>
            No topics yet.{" "}
            <span
              className={styles.create}
              onClick={() => setShowCreateModal(true)}
            >
              Create
            </span>{" "}
            your first topic!
          </MessageBox>
        ) : (
          // Cards for each topic
          data.map(({ _id, name }: TopicData) => (
            <TopicCard key={_id} id={_id} name={name} />
          ))
        )}
      </AppContentContainer>
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        size="lg"
        backdrop="static"
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <TopicForm onSubmit={handleCreateTopic} />
        </Modal.Body>
      </Modal>
    </AppMainContainer>
  );
};

export default TopicsPage;
