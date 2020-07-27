import React, { useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import keys from "../../config/keys";
// Components
import { Button, Input } from "../../components";
// Styling
import styles from "./LandingForm.module.css";

interface LandingFormProps {
  labelStyle?: string;
}

const LandingForm = ({ labelStyle }: LandingFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { addToast } = useToasts();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const handleFormSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (formRef && formRef.current) {
      // Set state to show loading spinner onn buttonn
      setIsSubmitting(true);

      // Send form data to url to add email field to Google Sheets
      const data = new FormData(formRef.current);
      fetch(keys.connectToGoogleSheetsUrl, { method: "POST", body: data })
        .then((res) => {
          setEmail("");
          setIsSubmitting(false);
          addToast("We've added you to the list!", { appearance: "success" });
        })
        .catch((error) => {
          setIsSubmitting(false);
          addToast("Sorry, looks like there was an error. Please try again.", {
            appearance: "error",
          });
        });
    }
  };

  return (
    <form
      name="submit-to-google-sheets"
      className={styles.form}
      ref={formRef}
      onSubmit={handleFormSubmit}
    >
      <label className={`${styles.label} ${labelStyle ? labelStyle : ""}`}>
        Sign up for early access
      </label>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        style={styles.input}
        value={email}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        category="primary"
        isLoading={isSubmitting}
        style={styles.btn}
      >
        Get early access
      </Button>
    </form>
  );
};

export default LandingForm;
