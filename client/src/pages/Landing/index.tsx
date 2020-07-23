import React, { useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import keys from "../../config/keys";
// Components
import { Button } from "../../components";
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
      <nav className={styles.nav}>
        <h2 className={styles.logo}>newt</h2>
      </nav>
      <section className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Organize everything you're learning</h1>
          <h5 className={styles.subtitle}>Sign up for early access</h5>
          <form
            name="submit-to-google-sheets"
            className={styles.form}
            ref={formRef}
            onSubmit={handleFormSubmit}
          >
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
      <section className={styles.environmentContainer}>
        <h2 className={styles.environmentTitle}>One unified environment</h2>
        <div className={styles.newtFlowContainer}>
          <img
            src={require("../../assets/newt-flow-diagram.svg")}
            className={styles.newtFlowDiagram}
            alt="Newt data flow graphic"
          />
          <div className={styles.flowEndpointContainer}>
            <div className={`${styles.flowEndpoint} ${styles.flowEndpoint1}`}>
              <h3
                className={`${styles.flowEndpointTitle} ${styles.flowEndpointTitle1}`}
              >
                Discover
              </h3>
              <p className={styles.flowEndpointText}>
                Get personalized recommendations across all kinds of media.
              </p>
            </div>
            <div className={`${styles.flowEndpoint} ${styles.flowEndpoint2}`}>
              <h3
                className={`${styles.flowEndpointTitle} ${styles.flowEndpointTitle2}`}
              >
                Track
              </h3>
              <p className={styles.flowEndpointText}>
                See your reading and watching stats and follow your progress.
              </p>
            </div>
            <div className={`${styles.flowEndpoint} ${styles.flowEndpoint3}`}>
              <h3
                className={`${styles.flowEndpointTitle} ${styles.flowEndpointTitle3}`}
              >
                Learn
              </h3>
              <p className={styles.flowEndpointText}>
                Take quizzes with spaced repetition and increase your retention.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
