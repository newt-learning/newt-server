import React from "react";
import classnames from "classnames/bind";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Button, Boop, ShiftBy } from "../../components";
import { useBoop } from "../../hooks";
import styles from "./GetStartedButton.module.css";

const cx = classnames.bind(styles);

interface GetStartedButtonProps {
  variant?: "default" | "last";
}

const GetStartedButton = ({ variant = "default" }: GetStartedButtonProps) => {
  const [iconBoop, trigger] = useBoop({ x: 4, timing: 200 });

  return (
    <Link
      to="/dashboard"
      className={cx({
        container: true,
        lastContainer: variant === "last",
      })}
    >
      <Button
        className={cx({
          btn: true,
          lastBtn: variant === "last",
        })}
        //@ts-ignore
        onMouseEnter={trigger}
      >
        Get Started
        <Boop disableTrigger overrideStyle={iconBoop}>
          <ShiftBy y={-1}>
            <FiArrowRight size={16} className={styles.rightArrow} />
          </ShiftBy>
        </Boop>
      </Button>
    </Link>
  );
};

export default GetStartedButton;
