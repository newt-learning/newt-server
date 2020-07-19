import React, { useState, useRef } from "react";
import { ReactComponent as PhoneGraphic } from "./assets/phone-graphic.svg";
import keys from "./config/keys";
// Components
import { Button } from "./components";
// Styling
import styles from "./App.module.css";

function App() {
  const [email, setEmail] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const handleFormSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (formRef && formRef.current) {
      // Send form data to url to add email field to Google Sheets
      const data = new FormData(formRef.current);
      fetch(keys.connectToGoogleSheetsUrl, { method: "POST", body: data })
        .then((res) => console.log("Success! "))
        .catch((error) => console.log("Error! "));
    }
  };

  return (
    <section className={styles.App}>
      <nav className={styles.nav}>
        <h2 className={styles.logo}>newt</h2>
      </nav>
      <div className={styles.mainContainer}>
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
            <Button type="submit" category="primary" style={styles.btn}>
              Get early access
            </Button>
          </form>
        </div>

        <div className={styles.phoneGraphicContainer}>
          <PhoneGraphic />
        </div>
      </div>
    </section>
  );
}

export default App;
