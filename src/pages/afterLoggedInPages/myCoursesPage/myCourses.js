import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../components/store/context/authContextProvider";
import technicalTradingImage from "../../../assets/images/technical_trading_image.jpg";
import fundamentalTradingImage from "../../../assets/images/fundamental_trading_image.jpg";
import styles from "./myCourses.module.css";
import { IoIosArrowForward } from "react-icons/io";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";

function MyCoursePage() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  function technicalContentBtnHandler() {
    navigate("/technical-content");
  }

  function fundamentalContentBtnHandler() {
    navigate("/fundamental-content");
  }

  return (
    <div className={styles.course_container_main}>
      <span className={styles.course_text}>My Learnings</span>
      <div className={styles.course_container_sub}>
        <div className={styles.course_card}>
          <div className={styles.course_card_float}>
            <div className={styles.course_card_float_sub}>
              <span>14</span>
              <span>Total Hours</span>
            </div>
            <div className={styles.course_card_float_sub}>
              <span>29</span>
              <span>Total Videos</span>
            </div>
            <ButtonComponent handler={technicalContentBtnHandler}>
              <IoIosArrowForward size={18} color="#000" />
            </ButtonComponent>
          </div>
          <div className={styles.card_img_cont}>
            <img src={technicalTradingImage} alt="technical-trading-image" />
          </div>
          <div className={styles.card_text_cont}>
            <span>Technical course</span>
            <span>Learn the technical aspects of stock market trading</span>
          </div>
        </div>
        <div className={styles.course_card}>
          <div className={styles.course_card_float}>
            <div className={styles.course_card_float_sub}>
              <span>10</span>
              <span>Total Hours</span>
            </div>
            <div className={styles.course_card_float_sub}>
              <span>20</span>
              <span>Total Videos</span>
            </div>
            <ButtonComponent handler={fundamentalContentBtnHandler}>
              <IoIosArrowForward size={18} color="#000" />
            </ButtonComponent>
          </div>
          <div className={styles.card_img_cont}>
            <img
              src={fundamentalTradingImage}
              alt="fundamental-trading-image"
            />
          </div>
          <div className={styles.card_text_cont}>
            <span>Fundamental course</span>
            <span>Learn the fundamental aspects of stock market trading</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCoursePage;
