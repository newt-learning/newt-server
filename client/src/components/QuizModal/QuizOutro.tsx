import React from "react";
// Components
import Image from "react-bootstrap/Image";
// Styling
import styles from "./QuizModal.module.css";

const QuizOutro = () => (
  <div className={styles.quizBody}>
    <div className={styles.finishSection}>
      <h4>Thanks for the taking the demo quiz!</h4>
      <p style={{ marginBottom: "0.75rem" }}>
        When we finish and release this feature, at this point we'll ask you to
        schedule another quiz. The time interval between quizzes as well as the
        questions asked in the next one will be based on how you did on this
        one. This process, called spaced repetition, will solidify what you're
        learning.
      </p>
      <p style={{ marginBottom: "1.5rem" }}>
        We're working on this. Until then, enjoy this picture of two adorable
        puppies:
      </p>
      <Image src={require("../../assets/puppies.jpeg")} rounded />
    </div>
  </div>
);

export default QuizOutro;
