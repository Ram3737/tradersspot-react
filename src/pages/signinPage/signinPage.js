import styles from "./signinPage.module.css";
import ButtonComponent from "../../components/buttonComponent/buttonComponent";
import { useState } from "react";

function SigninPage() {
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [enteredPassword, setEnteredPassword] = useState(null);

  async function loginSubmitHandler(event) {
    event.preventDefault();

    if (!enteredEmail && !enteredPassword) {
      return;
    }
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
