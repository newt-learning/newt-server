import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";

export type UpdateProgressFormValues = {
  pagesRead: number | undefined;
};

interface UpdateProgressFormProps {
  initialValues: UpdateProgressFormValues;
  totalPages: number;
  onSubmit: (values: UpdateProgressFormValues) => void;
}

const UpdateProgressForm = ({
  initialValues = { pagesRead: 0 },
  totalPages,
  onSubmit,
}: UpdateProgressFormProps) => {
  const emDash = String.fromCharCode(8212);

  console.log(totalPages);

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
          style={{ margin: "1rem 0", width: "70%" }}
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
          <div style={{ display: "flex", justifyContent: "center" }}>
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
