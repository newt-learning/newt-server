import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
// API
import { useFetchAllTopics } from "../../api/topics";
// Components
import {
  AppMainContainer,
  AppHeaderContainer,
  AppContentContainer,
  Button,
} from "../../components";
import TopicCard from "./TopicCard";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
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

  const createTopicSchema = yup.object({
    name: yup.string().required("A topic name is required."),
  });

  const handleCreateTopic = (values: CreateTopicValues) => {
    console.log(values);
  };

  return (
    <AppMainContainer>
      <AppHeaderContainer>
        <h2>Topics</h2>
        <Button
          onClick={() => setShowCreateModal(true)}
          style={styles.createBtn}
        >
          Create topic
        </Button>
      </AppHeaderContainer>
      <AppContentContainer className={styles.container}>
        {status === "loading"
          ? "Loading..."
          : error
          ? "Error"
          : data.map(({ _id, name }: TopicData) => (
              <TopicCard key={_id} id={_id} name={name} />
            ))}
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
          <Formik
            validationSchema={createTopicSchema}
            initialValues={{ name: "" }}
            onSubmit={(values) => handleCreateTopic(values)}
          >
            {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
              <Form
                noValidate
                onSubmit={(event) => {
                  // Prevent default of adding params to url
                  event.preventDefault();
                  handleSubmit();
                }}
                className={styles.form}
              >
                <Form.Group controlId="topicName">
                  <Form.Label>Topic name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className={styles.buttonContainer}>
                  <Button category="primary" type="submit">
                    Create
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </AppMainContainer>
  );
};

export default TopicsPage;
