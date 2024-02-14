import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./carousel.module.css";
import SliderOne from "../../assets/images/slider_one.svg";
import SliderTwo from "../../assets/images/slider_two.svg";
import SliderThree from "../../assets/images/slider_three.svg";

const SliderCarousel = () => {
  return (
    <div className={styles.main_carousel}>
      <Carousel controls={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={SliderOne}
            alt="First slide"
            height={580}
            width={300}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={SliderTwo}
            alt="Second slide"
            height={580}
            width={300}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={SliderThree}
            alt="Third slide"
            height={580}
            width={300}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default SliderCarousel;
