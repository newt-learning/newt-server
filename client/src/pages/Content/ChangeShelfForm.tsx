import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";

export type ChangeShelfFormValues = {
  shelf: "Currently Learning" | "Want to Learn" | "Finished Learning";
};

interface ChangeShelfFormProps {
  initialValues: ChangeShelfFormValues;
  onSubmit: (values: ChangeShelfFormValues) => void;
}

const ChangeShelfForm = ({ initialValues, onSubmit }: ChangeShelfFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleChange, handleSubmit }) => (
        <Form
          noValidate
          onSubmit={(event) => {
            // Prevent default of adding params to url
            event.preventDefault();
            handleSubmit();
          }}
          style={{ margin: "1rem 0", width: "70%" }}
        >
          <Form.Group controlId="shelf">
            <Form.Label>Shelf</Form.Label>
            <Form.Control
              as="select"
              name="shelf"
              defaultValue={initialValues.shelf}
              onChange={handleChange}
            >
              <option>Currently Learning</option>
              <option>Want to Learn</option>
              <option>Finished Learning</option>
            </Form.Control>
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

export default ChangeShelfForm;
