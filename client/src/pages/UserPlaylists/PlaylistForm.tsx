import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";
// Types
import { ButtonCategory } from "../../components/Button";
// Styling
import styles from "./Playlists.module.css";

export type PlaylistFormValues = {
  name: string;
};

interface PlaylistFormProps {
  initialValues?: { name: string };
  onSubmit: (values: PlaylistFormValues) => void;
  buttonTitle?: string;
  buttonCategory?: ButtonCategory;
}

const CHARACTER_LIMIT = 24;

export const createPlaylistSchema = yup.object({
  name: yup
    .string()
    .required("A playlist name is required.")
    .max(CHARACTER_LIMIT),
});

const PlaylistForm = ({
  initialValues = { name: "" },
  onSubmit,
  buttonTitle = "Create",
  buttonCategory = "success",
}: PlaylistFormProps) => {
  return (
    <Formik
      validationSchema={createPlaylistSchema}
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
          <Form.Group controlId="playlistName">
            <Form.Label>Playlist name</Form.Label>
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
            <Button
              category={buttonCategory}
              type="submit"
              isDisabled={!!errors.name}
            >
              {buttonTitle}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PlaylistForm;
