import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";
// Types
import { StartFinishDateType } from "./ContentFlow";

export type AddEditDatesFormValues = {
  startFinishDates: StartFinishDateType[];
};

interface AddEditDatesFormProps {
  initialValues: AddEditDatesFormValues;
}

const AddEditDatesForm = ({ initialValues }: AddEditDatesFormProps) => {
  const [datesRead, setDatesRead] = useState(initialValues.startFinishDates);

  const handleAddSession = () => {
    let updatedDatesRead = [
      ...datesRead,
      { dateStarted: null, dateCompleted: null },
    ];

    setDatesRead(updatedDatesRead);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
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
          style={{
            margin: "1rem 0",
            width: "70%",
          }}
        >
          {datesRead.map((date, index) => (
            <div key={index}>{JSON.stringify(date)}</div>
          ))}
          <p
            style={{
              color: "var(--blue)",
              margin: "1rem 0",
              cursor: "pointer",
            }}
            onClick={handleAddSession}
          >
            Add dates
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default AddEditDatesForm;
