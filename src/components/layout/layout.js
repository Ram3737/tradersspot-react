import { Fragment, useContext } from "react";
import styles from "./main-navigation.module.css";
import MainNavigation from "./main-navigation";
import { Digital } from "react-activity";
import { AuthContext } from "../store/context/authContextProvider";

function Layout(props) {
  const { mainLoader } = useContext(AuthContext);
  return (
    <Fragment>
      {mainLoader ? (
        <Digital
          size={20}
          color="#0c969a"
          style={{ margin: "auto", marginTop: "25%" }}
        />
      ) : (
        <>
          <MainNavigation />
          <main className={styles.main_container}>{props.children}</main>
        </>
      )}
    </Fragment>
  );
}

export default Layout;
