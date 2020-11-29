import React from "react";
import classnames from "classnames/bind";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Button.module.css";

export declare type ButtonCategory =
  | "primary"
  | "secondary"
  | "landing"
  | "success"
  | "danger"
  | undefined;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  category?: ButtonCategory;
  isLoading?: boolean;
  isDisabled?: boolean;
}

let cx = classnames.bind(styles);

const Button = ({
  children,
  onClick,
  category,
  isLoading,
  isDisabled,
  ...props
}: ButtonProps) => {
  const selectClassFromCategory = (category: ButtonCategory) => {
    switch (category) {
      case "landing":
        return styles.landingBtn;
      case "primary":
        return styles.primaryBtn;
      case "secondary":
        return styles.secondaryBtn;
      case "success":
        return styles.successBtn;
      case "danger":
        return styles.dangerBtn;
      default:
        return "";
    }
  };

  return (
    <button
      {...props}
      onClick={isDisabled ? undefined : onClick}
      className={cx(
        styles.btn,
        selectClassFromCategory(category),
        // Don't show custom button styling if it's disabled
        isDisabled ? undefined : props.className,
        {
          disabledBtn: isDisabled,
        }
      )}
    >
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <ClipLoader
            color={selectClassFromCategory(category)}
            size="1rem"
            loading={isLoading}
          />
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
