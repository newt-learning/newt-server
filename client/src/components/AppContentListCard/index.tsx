import React from "react";
import classnames from "classnames/bind";
import styles from "./AppContentListCard.module.css";

let cx = classnames.bind(styles);

interface AppContentListCardProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const AppContentListCard = ({
  name,
  isActive,
  onClick,
}: AppContentListCardProps) => {
  return (
    <div
      className={cx({
        card: true,
        active: isActive,
      })}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default AppContentListCard;
