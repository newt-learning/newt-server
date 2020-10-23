import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";
// Types
import { ButtonCategory } from "../../components/Button";
// Styling
import styles from "./Topics.module.css";

export type TopicFormValues = {
  name: string;
};

interface TopicFormProps {
  initialValues?: { name: string };
  onSubmit: (values: TopicFormValues) => void;
  buttonTitle?: string;
  buttonCategory?: ButtonCategory;
}

const CHARACTER_LIMIT = 24;

const TopicForm = ({
  initialValues = { name: "" },
  onSubmit,
  buttonTitle = "Create",
  buttonCategory = "success",
}: TopicFormProps) => {
  const createTopicSchema = yup.object({
    name: yup
      .string()
      .required("A topic name is required.")
      .max(CHARACTER_LIMIT),
  });

  return (
    <Formik
      validationSchema={createTopicSchema}
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
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
            <Button category={buttonCategory} type="submit">
              {buttonTitle}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TopicForm;
