import React, { useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import keys from "../../config/keys";
// Sections
import EnvironmentSection from "./EnvironmentSection";
import FeaturesSection from "./FeaturesSection";
import LastCallToActionSection from "./LastCallToActionSection";
// Components
import { Button, Header, Footer } from "../../components";
import PhoneGraphic from "./PhoneGraphic";
import styles from "./Landing.module.css";

const LandingPage = () => {
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
    <div className={styles.App}>
      <Header />
      <section className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Organize everything you're learning</h1>
          <form
            name="submit-to-google-sheets"
            className={styles.form}
            ref={formRef}
            onSubmit={handleFormSubmit}
          >
            <label className={styles.label}>Sign up for early access</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
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
        </div>
        <div className={styles.phoneGraphicContainer}>
          <PhoneGraphic />
        </div>
      </section>
      <EnvironmentSection />
      <FeaturesSection />
      <LastCallToActionSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
