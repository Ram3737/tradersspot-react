import styles from "./signinPage.module.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/buttonComponent/buttonComponent";
import { CallPostApiServicesWithTkn } from "../../utils/webServices/apiCalls";
import { useState } from "react";

function SigninPage() {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState(null);

  async function loginSubmitHandler(event) {
    event.preventDefault();

    if (!enteredEmail || !enteredPassword) {
      return;
    }

    CallPostApiServicesWithTkn(
      `/user/signin-user`,
      {
        email: enteredEmail,
        password: enteredPassword,
      },
      (response) => {
        if (response.status === 200) {
          console.log("login data", response.data);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("paid", response.data.paid.toString());
          localStorage.setItem("courseType", response.data.courseType);
          localStorage.setItem("userType", response.data.userType);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("mobileNo", response.data.mobileNumber);

          setEnteredEmail(null);
          setEnteredPassword(null);

          navigate("/course");
          // if (response.data.userType === "admin") {
          //   // navigation.navigate("adminLoggedIn");
          //   return;
          // }
          // if (
          //   response.data.token &&
          //   response.data.courseType !== "none" &&
          //   response.data.paid
          // ) {
          // } else if (
          //   response.data.token &&
          //   response.data.courseType !== "none"
          // ) {
          //   navigation.navigate("courses");
          // } else {
          //   navigation.navigate("dashboard");
          // }
        }
      },
      (err) => {
        // setBtnLoader(false);
        console.log(
          "errr",
          err.message || err.response?.data.message || "hiiiii"
        );
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
              style={styles.submit_button}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
