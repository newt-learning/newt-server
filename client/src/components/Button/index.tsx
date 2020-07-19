import React from "react";
import styles from "./Button.module.css";

export declare type ButtonCategory = "primary" | "secondary" | undefined;

interface ButtonProps {
  children: React.ReactNode;
  type: "button";
  category?: ButtonCategory;
  style?: string;
}

const Button = ({ children, type, category, style }: ButtonProps) => {
  const selectClassFromCategory = (category: ButtonCategory) => {
    switch (category) {
      case "primary":
        return styles.primaryBtn;
      default:
        return "";
    }
  };

  return (
    <button
      type={type}
      className={`${styles.btn} ${selectClassFromCategory(category)} ${style}`}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
};

export default Button;
