import React from "react";
import { Link } from "react-router-dom";
import ShelfContentCard from "./ShelfContentCard";
import styles from "./Shelf.module.css";

interface ShelfProps {
  name: string;
  data?: any;
}

const Shelf = ({ name, data }: ShelfProps) => {
  const divId = name.toLowerCase().split(" ").join("-");

  return (
    <div className={styles.container} id={styles[divId]}>
      <div className={styles.nameContainer}>
        <Link
          to={(location) => `${location.pathname}/${divId}`}
          className={styles.name}
          id={styles[divId]}
        >
          {name}
        </Link>
      </div>
      {/* Display first 3 items in the shelf */}
      {data
        ? data
            .slice(0, 3)
            .map((item: any) => (
              <ShelfContentCard
                key={item._id}
                name={item.name}
                thumbnailUrl={item.thumbnailUrl}
              />
            ))
        : null}
    </div>
  );
};

export default Shelf;
