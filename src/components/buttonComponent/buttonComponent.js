import { motion } from "framer-motion";
import styles from "./buttonComponent.module.css";

function ButtonComponent({ style, text, handler, loader, disabled }) {
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
      {text}
    </motion.button>
  );
}

export default ButtonComponent;
