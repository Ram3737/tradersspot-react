import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import styles from "./pricingPage.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../../components/store/context/authContextProvider";

function PricingPage() {
  const navigate = useNavigate();
  const {
    setUserSelectedCourseFromPricingPage,
    setUserSelectedCourse,
    courseType,
    paid,
  } = useContext(AuthContext);

  function courseDetailBtnHandler(course) {
    setUserSelectedCourseFromPricingPage(course);
    setUserSelectedCourse(course);
    navigate("/course-details");
  }

  return (
    <div className={styles.pricing_container_main}>
      <span className={styles.pricing_text}>Our plans</span>
      <div className={styles.pricing_container_sub}>
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 8px 0.5px #313538",
          }}
          className={styles.pricing_card}
        >
          <div className={styles.card_img_cont}>
            <div className={styles.card_img_cont_sub_one}></div>
            <div className={styles.pricing_card_float}>
              <div className={styles.pricing_card_float_sub}>
                <span>BASIC</span>
              </div>
            </div>
            <span>₹ 4,999</span>
          </div>
          <div className={styles.pricing_card_text_cont}>
            <span>PRICE ACTION - THE ONE COMPLETE COURSE</span>
          </div>

          <div className={styles.pricing_card_features_text_cont}>
            <span>Access to 14 hours of technical course content</span>
            <span>Access to weekly free analysis stats</span>
            <span>1 month unlimited course access</span>
            <span>Any time doubt clearence</span>
            <span
              style={{
                textDecoration: "underline",
                color: "#0c969a",
                cursor: "pointer",
              }}
              onClick={() => {
                if (courseType === "basic" && paid) {
                  return;
                } else {
                  courseDetailBtnHandler("basic");
                }
              }}
            >
              view more
            </span>
          </div>

          <div className={styles.btn_cont}>
            <ButtonComponent
              text={
                courseType === "basic" && paid
                  ? "Your current course"
                  : "Get this course"
              }
              disabled={courseType === "basic" && paid}
              handler={() => courseDetailBtnHandler("basic")}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 8px 0.5px #313538",
          }}
          className={styles.pricing_card}
        >
          <div className={styles.card_img_cont}>
            <div className={styles.card_img_cont_sub_two}></div>
            <div className={styles.pricing_card_float}>
              <div className={styles.pricing_card_float_sub}>
                <span>STANDARD</span>
              </div>
            </div>
            <span>₹ 7,999</span>
          </div>
          <div className={styles.pricing_card_text_cont}>
            <span>
              DOMINATE MARKETS : MASTER PRICE ACTION WITH STOCK ANALYSIS
            </span>
          </div>

          <div className={styles.pricing_card_features_text_cont}>
            <span>Access to 14 hours of technical course content</span>
            <span>Access to potential stock analysis - 6/week</span>
            <span>3 months unlimited course access</span>
            <span>Any time doubt clearence</span>
            <span
              style={{
                textDecoration: "underline",
                color: "#0c969a",
                cursor: "pointer",
              }}
              onClick={() => {
                if (courseType === "standard" && paid) {
                  return;
                } else {
                  courseDetailBtnHandler("standard");
                }
              }}
            >
              view more
            </span>
          </div>

          <div className={styles.btn_cont}>
            <ButtonComponent
              text={
                courseType === "standard" && paid
                  ? "Your current course"
                  : "Get this course"
              }
              disabled={courseType === "standard" && paid}
              handler={() => courseDetailBtnHandler("standard")}
            />
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 8px 0.5px #313538",
          }}
          className={styles.pricing_card}
        >
          <div className={styles.card_img_cont}>
            <div className={styles.card_img_cont_sub_three}></div>
            <div className={styles.pricing_card_float}>
              <div className={styles.pricing_card_float_sub}>
                <span>PRO</span>
              </div>
            </div>
            <span>₹ 12,999</span>
          </div>
          <div className={styles.pricing_card_text_cont}>
            <span>
              SYNERGIZING PRICE ACTION WITH FUNDAMENTALS FOR MARKET MASTERY
            </span>
          </div>

          <div className={styles.pricing_card_features_text_cont}>
            <span>Access to 3 hours of fundamental course content</span>
            <span>Access to 14 hours of technical course content</span>
            <span>1 year unlimited access to everything</span>
            <span>1 - 1 doubt clearence</span>
            <span
              style={{
                textDecoration: "underline",
                color: "#0c969a",
                cursor: "pointer",
              }}
              onClick={() => {
                if (courseType === "pro" && paid) {
                  return;
                } else {
                  courseDetailBtnHandler("pro");
                }
              }}
            >
              view more
            </span>
          </div>

          <div className={styles.btn_cont}>
            <ButtonComponent
              text={
                courseType === "pro" && paid
                  ? "Your current course"
                  : "Get this course"
              }
              disabled={courseType === "pro" && paid}
              handler={() => courseDetailBtnHandler("pro")}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PricingPage;
