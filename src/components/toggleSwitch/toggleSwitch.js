import React from "react";
import { useState } from "react";
import Switch from "react-switch";
import styles from "./toggleSwitch.module.css";

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (checked) => {
    setIsChecked(checked);
  };

  return (
    <div className={styles.toggle_cont}>
      <span>{isChecked ? "Paid" : "Free"}</span>
      <Switch
        height={18}
        width={35}
        handleDiameter={12}
        onColor={"#333"}
        offColor={"#333"}
        activeBoxShadow="none"
        checkedIcon={false}
        onHandleColor={"#0c969a"}
        offHandleColor={"#0c969a"}
        uncheckedIcon={false}
        checked={isChecked}
        onChange={handleToggle}
      />
    </div>
  );
};

export default ToggleSwitch;
