import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../store/context/authContextProvider";
import Switch from "react-switch";
import styles from "./toggleSwitch.module.css";

const ToggleSwitch = () => {
  const authCtx = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = (checked) => {
    setIsChecked(checked);
    if (authCtx.isValidToken) {
      authCtx.setAnalysisToDisplayAfterLogin(checked);
    } else {
      authCtx.setAnalysisToDisplayBeforeLogin(checked);
    }
  };

  return (
    <div className={styles.toggle_cont}>
      <span>{isChecked ? "Free" : "Paid"}</span>
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
