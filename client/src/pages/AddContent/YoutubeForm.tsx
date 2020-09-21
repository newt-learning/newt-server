import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";
// Styling
import styles from "./AddContent.module.css";

export type YoutubeFormValues = {
  url: string;
};

interface YoutubeFormProps {
  initialValues?: { url: string };
  onSubmit: (values: YoutubeFormValues) => void;
}

const youtubeFormSchema = yup.object({
  url: yup.string().required(),
});

const YoutubeForm = ({
  initialValues = { url: "" },
  onSubmit,
}: YoutubeFormProps) => {
  return (
    <Formik
      validationSchema={youtubeFormSchema}
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
          <Form.Group controlId="url">
            <Form.Label>Video URL</Form.Label>
            <Form.Control
              type="text"
              name="url"
              value={values.url}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.url}
            />
            <Form.Control.Feedback type="invalid">
              {errors.url}
            </Form.Control.Feedback>
          </Form.Group>
          <div className={styles.buttonContainer}>
            <Button category="primary" type="submit">
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default YoutubeForm;
