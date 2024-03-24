import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { CallPostApiServices } from "../../utils/webServices/apiCalls";
import styles from "../signinPage/signinPage.module.css";
import { AuthContext } from "../../components/store/context/authContextProvider";
import ButtonComponent from "../../components/buttonComponent/buttonComponent";

Modal.setAppElement("#root");

function SignupPage() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mblNo, setMblNo] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [mblNoErr, setMblNoErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
  const [errFromBackend, setErrFromBackend] = useState(null);
  const [otpFromBackend, setOtpFromBackend] = useState("123");
  const [userEnteredOtp, setUserEnteredOtp] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [otpBtnLoader, setOtpBtnLoader] = useState(false);
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

  function signUpClickHandler(e) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      setEmailErr("Please enter a valid email address.");
      return;
    } else {
      setEmailErr("");
    }

    if (!name || name.length < 3) {
      toast.error("Name should have atleast 3 characters");
      setNameErr("Name should have atleast 3 characters");
      return;
    } else {
      setNameErr("");
    }

    if (!mblNo || mblNo.length !== 10) {
      toast.error("Invalid Mobile Number");
      setMblNoErr(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    } else {
      setMblNoErr("");
    }

    if (
      !Password ||
      Password.length < 6 ||
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]+$/.test(Password)
    ) {
      toast.error(
        "Password - least 6 characters - at least one digit - one special character."
      );
      setPasswordErr(
        "Password - least 6 characters - at least one digit - one special character."
      );
      return;
    } else {
      setPasswordErr("");
    }

    if (Password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      setConfirmPasswordErr("Password and Confirm Password do not match.");
      return;
    } else {
      setConfirmPasswordErr("");
    }

    setBtnLoader(true);

    CallPostApiServices(
      `/user/new-registration-otp`,
      {
        email: email,
      },
      (response) => {
        if (response.status === 200) {
          setBtnLoader(false);
          setOtpFromBackend(response.data.otp);
          setErrFromBackend(null);
          setShowModal(true);
          toast.success("OTP sent to your Email");
        }
      },
      (err) => {
        console.log("err sending otp on registration");
        setBtnLoader(false);
        if (err.response?.data.message) {
          toast.error(err.response.data.message);
          setErrFromBackend(err.response.data.message);
        } else if (err.message) {
          toast.error(err.message);
          setErrFromBackend(err.message);
        } else {
          toast.error("Server error");
        }
      }
    );
  }

  function registerAfterOTPHandler() {
    setBtnLoader(true);
    CallPostApiServices(
      `/user/create-user`,
      {
        name: name,
        email: email,
        mobileNumber: mblNo,
        password: Password,
        courseType: authCtx.userSelectedCourseFromPricingPage || "none",
        triedToUpdate: false,
      },
      (response) => {
        if (response.status === 201) {
          setErrFromBackend(null);
          toast.success("Registered successfully", { autoClose: 3000 });
          setTimeout(() => {
            setBtnLoader(false);
            navigate("/signin");
          }, 3500);
        }
      },
      (err) => {
        console.log("err on signup", err);
        setBtnLoader(false);
        if (err.response?.data.message) {
          toast.error(err.response.data.message);
          setErrFromBackend(err.response.data.message);
        } else if (err.message) {
          toast.error(err.message);
          setErrFromBackend(err.message);
        } else {
          toast.error("Server error");
        }
      }
    );
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleOtpSubmit() {
    if (otpFromBackend !== userEnteredOtp) {
      toast.error("Invalid OTP", { autoClose: 3000 });
      return;
    } else {
      setOtpBtnLoader(true);
      toast.success("OTP verified", { autoClose: 3000 });
      setTimeout(() => {
        setOtpBtnLoader(false);
        closeModal();
        setUserEnteredOtp(null);
        registerAfterOTPHandler();
      }, 3500);
    }
  }

  return (
    <div className={styles.login_container_main}>
      <div className={styles.login_container_sub}>
        <p className={styles.heading_text}>Create your account</p>{" "}
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="name">
                Username
              </label>
              <input
                className={styles.input_field}
                type="text"
                id="name"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="mobile">
                Mobile No
              </label>
              <input
                className={styles.input_field}
                type="tel"
                id="mobile"
                name="mobile"
                required
                onChange={(e) => setMblNo(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={styles.input_field}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <ButtonComponent
              text={"Register"}
              style={styles.submit_button}
              indicator={btnLoader}
              handler={signUpClickHandler}
            />
          </form>
        </div>
        <span className={styles.already_acc_text}>
          Already have an account ? &nbsp;<a href="/signin">Signin</a>
        </span>
      </div>

      <Modal
        isOpen={showModal}
        // onRequestClose={closeModal}
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
        <div className={styles.modal_div}>
          <input
            className={styles.input_field}
            placeholder="Enter OTP"
            style={{ backgroundColor: "#3f4345", textAlign: "center" }}
            type="text"
            value={userEnteredOtp}
            onChange={(e) => setUserEnteredOtp(e.target.value)}
          />
          <ButtonComponent
            handler={handleOtpSubmit}
            text={"Verify"}
            indicator={otpBtnLoader}
          />
        </div>
      </Modal>
    </div>
  );
}

export default SignupPage;
