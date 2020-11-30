import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";
// Styling
import styles from "./AddContent.module.css";

export type YoutubeFormValues = {
  videoUrl: string;
  playlistUrl: string;
};

interface YoutubeFormProps {
  initialValues?: YoutubeFormValues;
  onNext: (values: YoutubeFormValues) => void;
}

const youtubeFormSchema = yup.object({
  videoUrl: yup.string(),
  playlistUrl: yup.string(),
});

const YoutubeForm = ({
  initialValues = { videoUrl: "", playlistUrl: "" },
  onNext,
}: YoutubeFormProps) => {
  return (
    <Formik
      validationSchema={youtubeFormSchema}
      initialValues={initialValues}
      onSubmit={(values) => onNext(values)}
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
          <Form.Group controlId="videoUrl">
            <Form.Label>Video URL</Form.Label>
            <Form.Control
              type="text"
              name="videoUrl"
              value={values.videoUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.videoUrl}
            />
            <Form.Control.Feedback type="invalid">
              {errors.videoUrl}
            </Form.Control.Feedback>
          </Form.Group>
          <div className={styles.or}>OR</div>
          <Form.Group controlId="playlistUrl">
            <Form.Label>Playlist URL</Form.Label>
            <Form.Control
              type="text"
              name="playlistUrl"
              value={values.playlistUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.playlistUrl}
            />
            <Form.Control.Feedback type="invalid">
              {errors.playlistUrl}
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
