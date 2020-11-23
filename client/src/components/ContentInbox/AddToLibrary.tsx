import React from "react";
import { useLocation } from "react-router-dom";
// Context
import { useData as useAuthData } from "../../context/AuthContext";
// Components
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { Button } from "..";
import GoogleSignInButton from "../../pages/Login/GoogleSignInButton";
// Styling
import styles from "./AddToLibrary.module.css";

const AddToLibrary = () => {
  const {
    state: { exists },
  } = useAuthData();

  const location = useLocation();

  return (
    <div className={styles.container}>
      {exists ? (
        <Formik
          initialValues={{ shelf: "Want to Learn" }}
          onSubmit={(values) => console.log(values)}
        >
          {({ initialValues, handleChange, handleSubmit }) => (
            <Form
              noValidate
              onSubmit={(event) => {
                // Prevent default of adding params to url
                event.preventDefault();
                handleSubmit();
              }}
              style={{ width: "70%" }}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <Button
                  category="success"
                  type="submit"
                  style={{ width: "250px" }}
                >
                  Add to Library
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          <h5>You need to sign in to add this to your Library</h5>
          <GoogleSignInButton
            redirectTo={location.pathname}
            className={styles.googleBtn}
          />
        </>
      )}
    </div>
  );
};

export default AddToLibrary;
