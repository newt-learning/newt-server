import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import styles from "./ShowMoreShowLess.module.css";
import { boolean } from "yup";

interface ShowMoreShowLessProps {
  showMore: boolean;
  onClick: () => void;
}

const ShowMoreShowLess = ({ showMore, onClick }: ShowMoreShowLessProps) => {
  return (
    <span className={styles.container} onClick={onClick}>
      {showMore ? (
        <>
          <FiChevronUp size={20} color="#718096" />
          <span>Show Less</span>
        </>
      ) : (
        <>
          <span>Show More</span>
          <FiChevronDown size={20} color="#718096" />
        </>
      )}
    </span>
  );
};

export default ShowMoreShowLess;
