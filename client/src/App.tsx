import React from "react";
import { ReactComponent as BackgroundCircles } from "./assets/background-circles.svg";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <h1>Newt</h1>
      <div className={styles.backgroundCircleContainer}>
        <BackgroundCircles />
      </div>
    </div>
  );
}

export default App;
