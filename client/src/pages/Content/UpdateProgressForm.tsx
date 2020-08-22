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
  onSubmit: (values: UpdateProgressFormValues) => void;
}

const updateProgressValidationSchema = yup.object({
  pagesRead: yup
    .number()
    .integer("Must be an integer")
    .required("Can't be blank, a number is required."),
});

const UpdateProgressForm = ({
  initialValues = { pagesRead: 0 },
  onSubmit,
}: UpdateProgressFormProps) => {
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
            <Button category="success" type="submit">
              Update
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateProgressForm;
