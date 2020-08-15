import React from "react";
import styles from "./Shelf.module.css";
import { Link } from "react-router-dom";

interface ShelfProps {
  name: string;
  data?: any;
}

const Shelf = ({ name, data }: ShelfProps) => {
  const divId = name.toLowerCase().split(" ").join("-");

  return (
    <div className={styles.container} id={styles[divId]}>
      <Link
        to={(location) => `${location.pathname}/${divId}`}
        className={styles.name}
        id={styles[divId]}
      >
        {/* <h2 className={styles.name} id={styles[divId]}> */}
        {name}
        {/* </h2> */}
      </Link>
    </div>
  );
};

export default Shelf;
