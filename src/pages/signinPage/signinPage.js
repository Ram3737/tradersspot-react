import styles from "./signinPage.module.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/buttonComponent/buttonComponent";
import { CallPostApiServices } from "../../utils/webServices/apiCalls";
import { AuthContext } from "../../components/store/context/authContextProvider";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function SigninPage() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState(null);
  const [enteredNewPassword, setEnteredNewPassword] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState(null);
  const [signInBtnLoader, setSignInBtnLoader] = useState(false);
  const [enteredEmailForOtp, setEnteredEmailForOtp] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [otpErr, setOtpErr] = useState(null);
  const [newPasswordErr, setNewPasswordErr] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [otpSendLoader, setOtpSendLoader] = useState(false);
  const [otpValidateLoader, setOtpValidateLoader] = useState(false);
  const [newPasswordLoader, setNewPasswordLoader] = useState(false);
  const [otpSentMsg, setOtpSentMsg] = useState(false);
  const [otpVerifiedMsg, setOtpVerifiedMsg] = useState(false);
  const [PasswordResettedMsg, setPasswordResettedMsg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(undefined);

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

  async function loginSubmitHandler(event) {
    event.preventDefault();

    if (!enteredEmail || !enteredPassword) {
      return;
    }

    setSignInBtnLoader(true);

    CallPostApiServices(
      `/user/signin-user-web`,
      {
        email: enteredEmail,
        password: enteredPassword,
      },
      (response) => {
        if (response.status === 200) {
          setSignInBtnLoader(false);
          localStorage.setItem("token", response.data.token);
          setEnteredEmail(null);
          setEnteredPassword(null);
          authCtx.getUserDetails();
        }
      },
      (err) => {
        setSignInBtnLoader(false);
        console.log(
          "errr",
          err.message || err.response?.data.message || "hiiiii"
        );
        if (err.response?.data.message) {
          toast.error(err.response.data.message);
        } else if (err.message) {
          toast.error(err.message);
        } else {
          toast.error("Server error");
        }

        console.log(err);
        //   if (err.response?.data.message) {
        //     console.log(1);
        //     setErrFromBackend(err.response.data.message);
        //   } else {
        //     console.log(2);
        //     setErrFromBackend(err.message);
        //   }
      }
    );
  }

  //forgot password logic

  //1
  function emailValidatdHandler() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!enteredEmailForOtp || !emailRegex.test(enteredEmailForOtp)) {
      setEmailErr("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    } else {
      setEmailErr(null);
      otpHandler();
    }
  }

  //2
  function otpHandler() {
    setOtpSendLoader(true);
    CallPostApiServices(
      `/user/forgot-password`,
      {
        email: enteredEmailForOtp,
      },
      (response) => {
        if (response.status === 200) {
          toast.success("OTP sent to your email", { autoClose: 3000 });
          if (emailErr) {
            setEmailErr(null);
          }
          setTimeout(() => {
            setIsOtpSent(true);
            setOtpSendLoader(false);
          }, 3500);
          console.log("res", response.data?.message);
        }
      },
      (err) => {
        setOtpSendLoader(false);
        if (err.response?.data?.message) {
          setEmailErr(err.response?.data?.message);
          toast.error(err.response?.data?.message);
        } else {
          toast.error("Server error");
        }
        console.log("otp err", err.response?.data?.message);
      }
    );
  }

  //3
  function otpValidatdHandler() {
    setOtpValidateLoader(true);
    CallPostApiServices(
      `/user/verify-otp`,
      {
        email: enteredEmailForOtp,
        enteredOTP: enteredOtp,
      },
      (response) => {
        if (response.status === 200) {
          toast.success("OTP verified", { autoClose: 3000 });

          if (otpErr) {
            setOtpErr(null);
          }
          setTimeout(() => {
            setOtpValidateLoader(false);
            setIsOtpValid(true);
            setIsOtpSent(false);
          }, 3500);
          console.log("res", response.data?.message);
        }
      },
      (err) => {
        setOtpValidateLoader(false);
        setOtpErr(err.response?.data?.message);
        if (err?.response?.status === 400) {
          toast.error("OTP expired", { autoClose: 2000 });
          setTimeout(() => {
            closeModal();
          }, 500);
          return;
        }

        if (err.response?.data?.message) {
          setEmailErr(err.response?.data?.message);
          toast.error(err.response?.data?.message);
        } else {
          toast.error("Server error");
        }

        console.log("otp err", err.response?.data?.message);
      }
    );
  }

  //4
  function resetNewPasswordHandler() {
    if (enteredNewPassword.length === 0) {
      setNewPasswordErr(null);
    } else if (
      enteredNewPassword.length < 6 ||
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(
        enteredNewPassword
      )
    ) {
      setNewPasswordErr(
        "Password - at least 6 characters - at least one digit - one special character."
      );
      toast.error(
        "Password - at least 6 characters - at least one digit - one special character."
      );
    } else {
      setNewPasswordErr(null);
      setNewPasswordLoader(true);
      CallPostApiServices(
        `/user/reset-password`,
        {
          email: enteredEmailForOtp,
          newPassword: enteredNewPassword,
        },
        (response) => {
          if (response.status === 200) {
            toast.success("Password updated successfully", { autoClose: 3000 });
            setTimeout(() => {
              setNewPasswordLoader(false);
              closeModal();
            }, 3500);
          }
        },
        (err) => {
          console.log("err updating new password");
          setNewPasswordLoader(false);
          if (err.response?.data?.message) {
            setNewPasswordErr(err.response?.data?.message);
            toast.error(err.response?.data?.message);
          } else {
            toast.error("Server error, Try again later.");
          }
          setTimeout(() => {
            closeModal();
          }, 1000);
        }
      );
    }
  }

  function closeModal() {
    setEnteredEmailForOtp(null);
    setEnteredOtp(null);
    setEnteredNewPassword(null);
    setEmailErr(null);
    setOtpErr(null);
    setNewPasswordErr(null);
    setOtpValidateLoader(false);
    setOtpSendLoader(false);
    setNewPasswordLoader(false);
    setIsOtpSent(false);
    setIsOtpValid(false);
    setOtpSentMsg(false);
    setOtpVerifiedMsg(false);
    setPasswordResettedMsg(false);
    setShowModal(false);
  }

  return (
    <div className={styles.login_container_main}>
      <div className={styles.login_container_sub}>
        <p className={styles.heading_text}>Log in to Trader's spot</p>{" "}
        <div className={styles.login_container}>
          <form>
            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input_field}
                type="email"
                id="email"
                name="email"
                required
                onChange={(event) => setEnteredEmail(event.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input_field}
                type="password"
                id="password"
                name="password"
                required
                onChange={(event) => setEnteredPassword(event.target.value)}
              />
            </div>
            <ButtonComponent
              handler={loginSubmitHandler}
              text={"Login"}
              indicator={signInBtnLoader}
              disabled={signInBtnLoader}
              style={styles.submit_button}
            />
          </form>
        </div>
        <span
          className={styles.forgot_pw_text}
          onClick={() => setShowModal(true)}
        >
          Forgot Password ?
        </span>
        <span className={styles.already_acc_text}>
          Don't have an account ? &nbsp;<a href="/signup">Signup</a>
        </span>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="OTP Modal"
        style={{
          overlay: {
            position: "fixed",
            zIndex: 1020,
            margin: "auto",
            width: "100vw",
            height: "100vh",
            background: "rgba(30, 30, 30, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          },
          content: {
            background: "rgba(30, 30, 30, 1)",
            minWidth: windowWidth <= 460 ? "90%" : "25rem",
            height: "13rem",
            overflowY: "auto",
            border: "1px solid #3f4345",
            borderRadius: "0.3rem",
            position: "unset",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        {!isOtpSent && !isOtpValid && (
          <div className={styles.modal_div} style={{ width: "20rem" }}>
            <input
              className={styles.input_field}
              placeholder="Enter your email"
              style={{ backgroundColor: "#3f4345" }}
              type="text"
              value={enteredEmailForOtp}
              onChange={(e) =>
                setEnteredEmailForOtp(e.target.value.toLowerCase())
              }
            />
            <ButtonComponent
              handler={emailValidatdHandler}
              text={"Send OTP"}
              indicator={otpSendLoader}
              disabled={otpSendLoader}
            />
          </div>
        )}

        {isOtpSent && !isOtpValid && (
          <div className={styles.modal_div}>
            <input
              className={styles.input_field}
              placeholder="Enter the OTP"
              style={{ backgroundColor: "#3f4345", textAlign: "center" }}
              type="text"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
            />
            <ButtonComponent
              handler={otpValidatdHandler}
              text={"Validate OTP"}
              indicator={otpValidateLoader}
              disabled={otpValidateLoader || !enteredOtp}
            />
          </div>
        )}
        {isOtpValid && (
          <div className={styles.modal_div} style={{ width: "20rem" }}>
            <input
              className={styles.input_field}
              placeholder="Enter new password"
              style={{ backgroundColor: "#3f4345" }}
              type="password"
              value={enteredNewPassword}
              onChange={(e) => setEnteredNewPassword(e.target.value)}
            />
            <ButtonComponent
              handler={resetNewPasswordHandler}
              text={"Update"}
              indicator={newPasswordLoader}
              disabled={newPasswordLoader || !enteredNewPassword}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SigninPage;
