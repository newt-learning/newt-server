import React from "react";
import styles from "./EnvironmentSection.module.css";

const EnvironmentSection = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>One unified environment</h2>
      <div className={styles.textContainer}>
        <p className={styles.text}>
          The Internet has changed the way we learn. We read books and articles,
          watch videos, listen to podcasts, and play games, created and shared
          by millions of incredble creators around the world. And that’s
          awesome. But the immense scale introduces some challenges:
        </p>
        <ul className={`${styles.text} ${styles.textList}`}>
          <li>
            it is difficult to <strong>organize</strong> <i>across</i> media
          </li>
          <li>
            it is time-consuming and tricky to <strong>find</strong> the right
            high-quality content
          </li>
          <li>
            it takes extra effort to <strong>retain</strong> what you’ve learned
          </li>
        </ul>
        <p className={styles.Text}>
          What if your learning flow could look something like this?
        </p>
      </div>
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
  );
};

export default EnvironmentSection;
