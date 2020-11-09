import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
// Components
import { Button } from "../../components";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
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

  // Update the date in state
  const handleDateChange = (
    index: number,
    title: string,
    selectedDate: any
  ) => {
    let updatedDatesRead = [...datesRead];
    switch (title) {
      case "Start date":
        updatedDatesRead[index].dateStarted = selectedDate;
        setDatesRead(updatedDatesRead);
        return;
      case "Finish date":
        updatedDatesRead[index].dateCompleted = selectedDate;
        setDatesRead(updatedDatesRead);
        return;
      default:
        return;
    }
  };

  // Add another session
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
            margin: "1rem",
          }}
        >
          {datesRead.map((date, index) => (
            <div key={index}>
              <h4>{`#${index + 1}`}</h4>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <Form.Label style={{ marginRight: "1rem" }}>
                      Start Date
                    </Form.Label>
                    <DatePicker
                      selected={date.dateStarted}
                      onChange={(date) =>
                        handleDateChange(index, "Start date", date)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <Form.Label style={{ marginRight: "1rem" }}>
                      Finish Date
                    </Form.Label>
                    <DatePicker
                      selected={date.dateCompleted}
                      onChange={(date) =>
                        handleDateChange(index, "Finish date", date)
                      }
                      minDate={date.dateStarted}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
            </div>
          ))}
          <p
            style={{
              color: "var(--blue)",
              margin: "1rem 0",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
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
