import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import styles from "./main-navigation.module.css";
import { getAuthToken } from "../../utils/auth/auth";
import ButtonComponent from "../buttonComponent/buttonComponent";

function MainNavigation(props) {
  const navigate = useNavigate();
  const tkn = localStorage.getItem("token");
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [isMenuBtnClicked, setIsMenuBtnClicked] = useState(false);
  const [token, setToken] = useState();

  // function getAllUsers(page = 1) {
  //   if (token) {
  //     CallGetApiServices(
  //       `/user/get-all-users?page=${1}&courseType=${null}&ttu=${null}&paid=${null}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //       (response) => {
  //         if (response.status === 200) {
  //           console.log("users data", response.data);
  //         }
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }

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

  useEffect(() => {
    setToken(tkn);
  }, [tkn]);

  // useEffect(() => {
  //   getAllUsers();
  // }, [token]);

  function menuBtnHandler() {
    setIsMenuBtnClicked(!isMenuBtnClicked);
  }

  function signinBtnHandler(event) {
    event.preventDefault();
    navigate("signin");
  }

  function signupBtnHandler(event) {
    event.preventDefault();
    navigate("signup");
  }

  function logoutBtnHandler(event) {
    event.preventDefault();
    localStorage.clear();
    navigate("/");
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
                  <Link to={"dashboard"}>Dashboard</Link>
                </li>
                <li>
                  <Link to={"analysis-statistics"}>Analysis statistics</Link>
                </li>
                <li>
                  <Link to={""}>Pricing</Link>
                </li>
              </ul>
            </div>
            <AnimatePresence mode="wait">
              {!token ? (
                <div className={styles.nav_right} key="login">
                  <ButtonComponent
                    text={"Sign Up"}
                    style={styles.button}
                    handler={signupBtnHandler}
                  />
                  <ButtonComponent
                    text={"Signin"}
                    style={styles.button_transparent}
                    handler={signinBtnHandler}
                  />
                </div>
              ) : (
                <div className={styles.nav_right} key="logout">
                  <ButtonComponent
                    text={"Logout"}
                    style={styles.button_transparent}
                    handler={logoutBtnHandler}
                  />
                </div>
              )}
            </AnimatePresence>
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
                handler={signupBtnHandler}
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
                            <Link to={"analysis-statistics"}>
                              Analysis statistics
                            </Link>
                          </div>
                          <div className={styles.menu_option}>
                            <span>Pricing</span>
                          </div>
                        </div>

                        {!token ? (
                          <div className={styles.menu_option_btn_container}>
                            <ButtonComponent
                              text={"Signin"}
                              style={styles.menu_option_btn_transparent}
                              handler={signinBtnHandler}
                            />
                            <ButtonComponent
                              text={"Signup"}
                              style={styles.menu_option_btn_default}
                              handler={signupBtnHandler}
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
