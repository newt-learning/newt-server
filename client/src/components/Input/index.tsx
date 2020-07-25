import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: string;
}

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  style,
}: InputProps) => {
  console.log(styles.input);
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${styles.input} ${style ? style : ""}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
