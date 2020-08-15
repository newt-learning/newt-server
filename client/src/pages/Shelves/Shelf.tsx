import React from "react";
import { Link } from "react-router-dom";
import ShelfContentCard from "./ShelfContentCard";
import styles from "./Shelf.module.css";

interface ShelfProps {
  id: "currently-learning" | "want-to-learn" | "finished-learning";
  name: string;
  data?: any;
}

const Shelf = ({ id, name, data }: ShelfProps) => {
  return (
    <div className={styles.container} id={styles[id]}>
      <div className={styles.nameContainer}>
        <Link
          to={(location) => `${location.pathname}/${id}`}
          className={styles.name}
          id={styles[id]}
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
                shelfId={id}
              />
            ))
        : null}
    </div>
  );
};

export default Shelf;
