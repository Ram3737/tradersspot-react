import { motion } from "framer-motion";
import { Digital } from "react-activity";
import "react-activity/dist/library.css";
import styles from "./buttonComponent.module.css";

function ButtonComponent({
  style,
  text,
  handler,
  loader,
  disabled,
  indicator,
  children,
}) {
  return (
    <motion.button
      className={`${styles.button} ${style}`}
      whileHover={{
        scale: 1.05,
        backgroundColor: disabled ? "#9ba1a6" : "#31b5b9",
      }}
      onClick={handler}
      disabled={disabled}
    >
      {children && children}
      {indicator && <Digital size={13} color="#151718" />}
      {!indicator && text}
    </motion.button>
  );
}

export default ButtonComponent;
