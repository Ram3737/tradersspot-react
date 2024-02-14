import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import ButtonComponent from "../buttonComponent/buttonComponent";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import styles from "./main-navigation.module.css";

function MainNavigation(props) {
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false);
  const [session, setSession] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function menuBtnHandler() {
    setIsMenuBtnClicked(!isMenuBtnClicked);
  }

  function loginBtnHandler(event) {
    event.preventDefault();
  }

  function registerBtnHandler(event) {
    event.preventDefault();
  }

  function logoutBtnHandler(event) {
    event.preventDefault();
  }

  // useEffect(() => {
  //   if (session) {
  //     fetchUsers();
  //   }
  // }, [session]);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get(`/api/user/get-user-details-by-email`);
  //     console.log("user data", response.data);
  //   } catch (error) {
  //     console.error("Error fetching users by email:", error);
  //   }
  // };

  return (
    <div className={styles.header_outer}>
      <nav className={styles.nav}>
        {windowWidth >= 754 ? (
          <Fragment>
            <div className={styles.nav_left}>
              <div className={styles.logo_container}>
                <img src={Logo} alt="logo" width={25} height={25} />
              </div>

              <ul>
                <li>
                  <span>Dashboard</span>
                </li>
                <li>
                  <span>Analysis statistics</span>
                </li>
                <li>
                  <span>Pricing</span>
                </li>
              </ul>
            </div>
            {!session ? (
              <div className={styles.nav_right}>
                <ButtonComponent
                  text={"Sign Up"}
                  handler={registerBtnHandler}
                />
                <ButtonComponent
                  text={"Login"}
                  style={styles.button_transparent}
                  handler={loginBtnHandler}
                />
              </div>
            ) : (
              <div className={styles.nav_right}>
                <ButtonComponent
                  text={"Logout"}
                  style={styles.button_transparent}
                  handler={logoutBtnHandler}
                />
              </div>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <div className={styles.logo_container}>
              <img
                src={Logo}
                alt="Description of image"
                width={25}
                height={25}
              />
            </div>
            <div className={styles.menu_btn_and_btn}>
              <ButtonComponent
                text={"Try for free"}
                style={styles.menu_option_btn_default}
                handler={registerBtnHandler}
              />
              <div className={styles.menu_btn} onClick={menuBtnHandler}>
                {!isMenuBtnClicked ? (
                  <IoMenu size={25} color="#fff" />
                ) : (
                  <>
                    <IoCloseSharp size={25} color="#fff" />
                    <div
                      className={styles.menu_overlay}
                      onClick={menuBtnHandler}
                    >
                      <div className={styles.menu_container}>
                        <div className={styles.menu_option_container}>
                          <div
                            className={styles.menu_option}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Dashboard</span>
                          </div>
                          <div className={styles.menu_option}>
                            <span>Analysis statistics</span>
                          </div>
                          <div className={styles.menu_option}>
                            <span>Pricing</span>
                          </div>
                        </div>

                        {!session ? (
                          <div className={styles.menu_option_btn_container}>
                            <ButtonComponent
                              text={"Login"}
                              style={styles.menu_option_btn_transparent}
                              handler={loginBtnHandler}
                            />
                            <ButtonComponent
                              text={"Signup"}
                              style={styles.menu_option_btn_default}
                              handler={registerBtnHandler}
                            />
                          </div>
                        ) : (
                          <ButtonComponent
                            text={"Logout"}
                            style={styles.menu_option_btn_transparent}
                            handler={logoutBtnHandler}
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Fragment>
        )}
      </nav>
    </div>
  );
}

export default MainNavigation;