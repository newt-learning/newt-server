import React, { useState } from "react";
import { Formik } from "formik";
// import moment from "moment";
import { parseISO } from "date-fns";
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
  onSubmit: (startFinishDates: StartFinishDateType[]) => Promise<void>;
}

const AddEditDatesForm = ({
  initialValues,
  onSubmit,
}: AddEditDatesFormProps) => {
  const [datesRead, setDatesRead] = useState(initialValues.startFinishDates);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Delete the session
  const handleDeleteSession = (index: number) => {
    let updatedDatesRead = [...datesRead];
    // Remove 1 element starting at index
    updatedDatesRead.splice(index, 1);
    setDatesRead(updatedDatesRead);
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
      onSubmit={async () => {
        setIsSubmitting(true);
        await onSubmit(datesRead);
      }}
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>{`#${index + 1}`}</h4>
                <p
                  onClick={() => handleDeleteSession(index)}
                  style={{ color: "var(--red-500)", cursor: "pointer" }}
                >
                  Delete
                </p>
              </div>

              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group>
                    <Form.Label style={{ marginRight: "1rem" }}>
                      Start Date
                    </Form.Label>
                    <DatePicker
                      selected={
                        typeof date.dateStarted === "string"
                          ? parseISO(date.dateStarted)
                          : date.dateStarted
                      }
                      placeholderText="Select date"
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
                      selected={
                        typeof date.dateCompleted === "string"
                          ? parseISO(date.dateCompleted)
                          : date.dateCompleted
                      }
                      placeholderText="Select date"
                      onChange={(date) =>
                        handleDateChange(index, "Finish date", date)
                      }
                      minDate={
                        typeof date.dateStarted === "string"
                          ? parseISO(date.dateStarted)
                          : date.dateStarted
                      }
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
            <Button
              type="submit"
              category="success"
              isLoading={isSubmitting}
              style={{ marginTop: "2rem", width: "200px" }}
            >
              Confirm
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddEditDatesForm;
