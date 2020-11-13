import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";
// Types
import { ButtonCategory } from "../../components/Button";

export type ReadingChallengeFormValues = {
  totalItems: number;
};

interface ReadingChallengeFormProps {
  initialValues?: ReadingChallengeFormValues;
  onSubmit: (values: ReadingChallengeFormValues) => void;
  buttonTitle?: string;
  buttonCategory?: ButtonCategory;
}

const ReadingChallengeForm = ({
  initialValues = { totalItems: 0 },
  onSubmit,
  buttonTitle = "Create",
  buttonCategory = "success",
}: ReadingChallengeFormProps) => {
  const readingChallengeSchema = yup.object({
    totalItems: yup
      .number()
      .required("A number is required.")
      .integer("Must be an integer")
      .typeError("Must be a number"),
  });

  return (
    <Formik
      validationSchema={readingChallengeSchema}
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
          style={{ margin: "1rem 0", width: "70%" }}
        >
          <Form.Group controlId="totalItems">
            <Form.Label>
              How many books do you wish to read this year?
            </Form.Label>
            <Form.Control
              type="text"
              name="totalItems"
              value={values.totalItems}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.totalItems}
            />
            <Form.Control.Feedback type="invalid">
              {errors.totalItems}
            </Form.Control.Feedback>
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              category={buttonCategory}
              type="submit"
              isDisabled={!!errors.totalItems}
            >
              {buttonTitle}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ReadingChallengeForm;
