import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";
// Styling
import styles from "./UpdateProgressForm.module.css";

export type UpdateProgressFormValues = {
  pagesRead: number;
};

interface UpdateProgressFormProps {
  initialValues: UpdateProgressFormValues;
  totalPages: number;
  onSubmit: (values: UpdateProgressFormValues) => void;
  onFinishBook: () => void;
}

const UpdateProgressForm = ({
  initialValues = { pagesRead: 0 },
  totalPages,
  onSubmit,
  onFinishBook,
}: UpdateProgressFormProps) => {
  const emDash = String.fromCharCode(8212);

  const updateProgressValidationSchema = yup.object({
    pagesRead: yup
      .number()
      .integer("Must be an integer")
      .min(
        0,
        "Not sure how you've managed to read negative pages. The number needs to be positive."
      )
      .lessThan(
        totalPages,
        `The number of pages you've read can't be more than the total number of pages in the book ${emDash} obviously.`
      )
      .required("Can't be blank, a number is required."),
  });

  return (
    <Formik
      validationSchema={updateProgressValidationSchema}
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <Form
          noValidate
          onSubmit={(event) => {
            // Prevent default of adding params to url
            event.preventDefault();
            handleSubmit();
          }}
          className={styles.form}
        >
          <Form.Group controlId="pagesRead">
            <Form.Label>Pages read</Form.Label>
            <Form.Control
              type="text"
              name="pagesRead"
              value={values.pagesRead}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.pagesRead}
            />
            <Form.Control.Feedback type="invalid">
              {touched.pagesRead ? errors.pagesRead : null}
            </Form.Control.Feedback>
          </Form.Group>
          <p className={styles.finishedBook} onClick={onFinishBook}>
            I've finished the book
          </p>
          <div className={styles.btnContainer}>
            <Button category="success" isDisabled={!isValid} type="submit">
              Update
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProgressForm;
