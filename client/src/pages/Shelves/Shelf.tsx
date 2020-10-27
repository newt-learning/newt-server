import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import ShelfContentCard from "./ShelfContentCard";
import styles from "./Shelf.module.css";
import { FiChevronRight } from "react-icons/fi";

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
          <FiChevronRight size={26} className={styles.icon} />
        </Link>
      </div>
      {/* If empty, display empty message, otherwise first 3 items in the shelf */}
      {_.isEmpty(data) ? (
        <div className={styles.empty}>
          Shelf is empty. <Link to="/add-content">Add a book or video</Link>
        </div>
      ) : (
        /* Display first 3 items in the shelf */
        data
          .slice(0, 3)
          .map((item: any) => (
            <ShelfContentCard
              key={item._id}
              name={item.name}
              thumbnailUrl={item.thumbnailUrl}
              shelfId={id}
            />
          ))
      )}
    </div>
  );
};

export default Shelf;
