import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FiMoreVertical } from "react-icons/fi";
import styles from "./OptionsDropdown.module.css";

export interface OptionsDropdownItemType {
  type: "item" | "divider";
  title?: string;
  onClick?: () => void;
}

interface OptionsDropdownProps {
  id: string;
  options: OptionsDropdownItemType[];
}

const OptionsDropdown = ({ id, options }: OptionsDropdownProps) => {
  return (
    <div className={styles.dropdown}>
      <Dropdown alignRight={true} drop="down">
        <Dropdown.Toggle id={id} className={styles.dropdownToggle} as="div">
          <FiMoreVertical size={24} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {/* Create dropdown menu by mapping through passed items. Allows for custom menus. */}
          {options.map((item: OptionsDropdownItemType, index: number) => {
            if (item.type === "divider") {
              return <Dropdown.Divider key={index} />;
            } else {
              return (
                <Dropdown.Item key={index} onClick={item.onClick}>
                  {item.title}
                </Dropdown.Item>
              );
            }
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default OptionsDropdown;
