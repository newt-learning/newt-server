import React from "react";
import styles from "./Shelf.module.css";

interface ShelfProps {
  name: string;
  data?: any;
}

const Shelf = ({ name, data }: ShelfProps) => {
  const divId = name.toLowerCase().split(" ").join("-");

  return (
    <div className={styles.container} id={styles[divId]}>
      <h2 className={styles.name} id={styles[divId]}>
        {name}
      </h2>
    </div>
  );
};

export default Shelf;
