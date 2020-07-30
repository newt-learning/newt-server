import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Button.module.css";

export declare type ButtonCategory =
  | "primary"
  | "secondary"
  | "landing"
  | undefined;

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit";
  onClick?: () => void;
  category?: ButtonCategory;
  isLoading?: boolean;
  style?: string;
}

const Button = ({
  children,
  type,
  onClick,
  category,
  isLoading,
  style,
}: ButtonProps) => {
  const selectClassFromCategory = (category: ButtonCategory) => {
    switch (category) {
      case "landing":
        return styles.landingBtn;
      case "primary":
        return styles.primaryBtn;
      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${selectClassFromCategory(category)} ${style}`}
    >
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <ClipLoader color="#003e53" size="0.9rem" loading={isLoading} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  isLoading: false,
};

export default Button;
