import React from "react";
import { Link } from "react-router-dom";
import styles from "./EnvironmentSection.module.css";

const EnvironmentSection = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>One unified environment</h2>
      <div className={styles.textContainer}>
        <p className={styles.text}>
          The Internet has changed the way we learn. We read books and articles,
          watch videos, listen to podcasts, and play games, created and shared
          by millions of incredible creators around the world. And that’s
          awesome. But the immense scale introduces some challenges:
        </p>
        <ul className={`${styles.text} ${styles.textList}`}>
          <li>
            it is difficult to <strong>organize</strong> content <i>across</i>{" "}
            media
          </li>
          <li>
            it is time-consuming and tricky to <strong>find</strong> the right
            high-quality content
          </li>
          <li>
            it takes extra effort to <strong>retain</strong> what you’ve learned
          </li>
        </ul>
        <p className={styles.text}>
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
          <div id={styles["discover-endpoint"]} className={styles.flowEndpoint}>
            <Link to={"/discover"}>
              <h3
                id={styles["discover-title"]}
                className={styles.flowEndpointTitle}
              >
                Discover
              </h3>
            </Link>
            <p className={styles.flowEndpointText}>
              Get personalized recommendations across all kinds of media.
            </p>
          </div>
          <div id={styles["track-endpoint"]} className={styles.flowEndpoint}>
            <Link to="/stats">
              <h3
                id={styles["track-title"]}
                className={styles.flowEndpointTitle}
              >
                Track
              </h3>
            </Link>
            <p className={styles.flowEndpointText}>
              See your reading, watching, and listening stats and follow your
              progress.
            </p>
          </div>
          <div id={styles["learn-endpoint"]} className={styles.flowEndpoint}>
            <h3 id={styles["learn-title"]} className={styles.flowEndpointTitle}>
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
