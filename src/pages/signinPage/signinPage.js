import styles from "./signinPage.module.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/buttonComponent/buttonComponent";
import { CallPostApiServices } from "../../utils/webServices/apiCalls";
import { AuthContext } from "../../components/store/context/authContextProvider";
import { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

function SigninPage() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState(null);

  async function loginSubmitHandler(event) {
    event.preventDefault();

    if (!enteredEmail || !enteredPassword) {
      return;
    }

    CallPostApiServices(
      `/user/signin-user-web`,
      {
        email: enteredEmail,
        password: enteredPassword,
      },
      (response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          setEnteredEmail(null);
          setEnteredPassword(null);
          authCtx.getUserDetails();
        }
      },
      (err) => {
        console.log(
          "errr",
          err.message || err.response?.data.message || "hiiiii"
        );
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
