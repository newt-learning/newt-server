import React, { useState } from "react";
import { useLocation } from "react-router-dom";
// Context
import { useData as useAuthData } from "../../context/AuthContext";
// Components
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import { Button } from "..";
import GoogleSignInButton from "../../pages/Login/GoogleSignInButton";
// Styling
import styles from "./AddToLibrary.module.css";
// Types
import { ShelfType } from "../../pages/Content/ContentFlow";

export interface AddToLibraryFormValues {
  shelf: ShelfType;
  playlists: any;
  startDate: Date;
  finishDate: Date;
}
interface AddToLibraryProps {
  onSubmit: (values: AddToLibraryFormValues) => void;
  isLoading: boolean;
}

const AddToLibrary = ({ onSubmit, isLoading }: AddToLibraryProps) => {
  const {
    state: { exists },
  } = useAuthData();

  const [shelf, setShelf] = useState<ShelfType>("Want to Learn");
  const [startDate, setStartDate] = useState<any>(new Date());
  const [finishDate, setFinishDate] = useState<any>(new Date());

  const location = useLocation();

  return exists ? (
    <>
      {/* Form to choose shelf */}
      <Form.Group controlId="shelf">
        <Form.Label className={styles.subheader}>Shelf</Form.Label>
        <Form.Control
          as="select"
          name="shelf"
          defaultValue="Want to Learn"
          onChange={(e: any) => setShelf(e.target.value)}
        >
          <option value="Currently Learning">Currently Learning</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Finished Learning">Finished Learning</option>
        </Form.Control>
      </Form.Group>
      {/* Show start and finish date inputs if the Finished Learning shelf is selected */}
      {shelf === "Finished Learning" ? (
        <Form.Row>
          <Col sm={12} md={6}>
            <Form.Group>
              <Form.Label
                className={styles.subheader}
                style={{ marginRight: "1rem" }}
              >
                Start Date
              </Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group>
              <Form.Label
                className={styles.subheader}
                style={{ marginRight: "1rem" }}
              >
                Finish Date
              </Form.Label>
              <DatePicker
                selected={finishDate}
                onChange={(date) => setFinishDate(date)}
                minDate={startDate}
              />
            </Form.Group>
          </Col>
        </Form.Row>
      ) : null}
      <Button
        className={styles.addBtn}
        category="success"
        isLoading={isLoading}
        onClick={async () => {
          await onSubmit({
            shelf,
            playlists: [],
            startDate,
            finishDate,
          });
        }}
      >
        Add to Library
      </Button>
    </>
  ) : (
    <div className={styles.container}>
      <h5>Please sign in to add this to your Library</h5>
      <GoogleSignInButton
        redirectTo={location.pathname}
        className={styles.googleBtn}
      />
    </div>
  );
};

export default AddToLibrary;
