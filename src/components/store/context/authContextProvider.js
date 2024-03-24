import { createContext, useEffect, useState } from "react";
import {
  CallGetApiServices,
  CallPostApiServicesToVerifyToken,
} from "../../../utils/webServices/apiCalls";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  isAuthenticated: "",
  isValidToken: "",
  userName: "",
  token: "",
  paid: "",
  courseType: "",
  userType: "",
  userEmail: "",
  mblNo: "",
  triedToUpdate: "",
  analysisToDisplayBeforeLogin: "",
  setAnalysisToDisplayBeforeLogin: () => {},
  analysisToDisplayAfterLogin: "",
  setAnalysisToDisplayAfterLogin: () => {},
  userSelectedCourseFromPricingPage: "",
  setUserSelectedCourseFromPricingPage: () => {},
  registerSignupToggle: "",
  userSelectedCourse: "",
  setUserSelectedCourse: () => {},
  swingAnalysisStats: "",
  freeSwingAnalysisStats: "",
  allBreakoutAnalyses: "",
  swingAnalysisLoader: "",
  freeSwingAnalysisLoader: "",
  mainLoader: "",
  authenticationHandler: () => {},
  getUserDetails: () => {},
  nullCall: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [paid, setPaid] = useState(false);
  const [courseType, setCourseType] = useState("none");
  const [userType, setUserType] = useState("none");
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [mblNo, setMblNo] = useState(null);
  const [registerSignupToggle, setRegisterSignupToggle] = useState(false);
  const [userSelectedCourse, setUserSelectedCourse] = useState("none");
  const [triedToUpdate, setTriedToUpdate] = useState(false);
  const [swingAnalysisStats, setSwingAnalysisStats] = useState({});
  const [freeSwingAnalysisStats, setFreeSwingAnalysisStats] = useState({});
  const [allBreakoutAnalyses, setAllBreakoutAnalyses] = useState([]);
  const [swingAnalysisLoader, setSwingAnalysisLoader] = useState(false);
  const [freeSwingAnalysisLoader, setFreeSwingAnalysisLoader] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [analysisToDisplayBeforeLogin, setAnalysisToDisplayBeforeLogin] =
    useState(false);
  const [analysisToDisplayAfterLogin, setAnalysisToDisplayAfterLogin] =
    useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  const [
    userSelectedCourseFromPricingPage,
    setUserSelectedCourseFromPricingPage,
  ] = useState("none");

  function authenticationHandler() {
    setIsAuthenticated(!isAuthenticated);
  }

  function swingAnalysisStatsFn() {
    setSwingAnalysisLoader(true);
    CallGetApiServices(
      `/analysis/swing-analysis/sum-risk-reward-swing`,
      (response) => {
        if (response.status === 200) {
          setSwingAnalysisStats(response.data);
          setSwingAnalysisLoader(false);
        }
      },
      (err) => {
        setSwingAnalysisLoader(false);
        // Alert.alert("Server down", "Please try after sometime.");
        console.log("fetching sum risk reward swing-analysis stats err", err);
      }
    );
  }

  function freeSwingAnalysisStatsFn() {
    setFreeSwingAnalysisLoader(true);
    CallGetApiServices(
      `/analysis/free-swing-analysis/sum-risk-reward-free-swing`,
      (response) => {
        if (response.status === 200) {
          setFreeSwingAnalysisStats(response.data);
          setFreeSwingAnalysisLoader(false);
        }
      },
      (err) => {
        setFreeSwingAnalysisLoader(false);
        // Alert.alert("Server down", "Please try after sometime.");
        console.log(
          "fetching sum risk reward free-swing-analysis free analysis stats err",
          err
        );
      }
    );
  }

  function nullCall() {
    swingAnalysisStatsFn();
    freeSwingAnalysisStatsFn();
  }

  function getUserDetails() {
    setMainLoader(true);
    const tkn = localStorage.getItem("token");
    if (tkn) {
      setToken(tkn);
    } else {
      setToken(null);
      setMainLoader(false);
    }
    CallPostApiServicesToVerifyToken(
      `/user/verify-token`,
      {
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      },
      (response) => {
        if (response.status === 200 && response.data.valid) {
          if (tkn) {
            const decodedToken = jwtDecode(tkn);
            // console.log("dt", decodedToken);
            setCourseType(decodedToken.courseType);
            setMblNo(decodedToken.mobileNumber);
            setUserType(decodedToken.userType);
            setPaid(decodedToken.paid);
            setUserEmail(decodedToken.email);
            setUserName(decodedToken.name);

            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime) {
              setIsValidToken(false);
              setMainLoader(false);
            } else {
              setMainLoader(false);
              setIsValidToken(true);
              if (decodedToken.userType === "admin") {
                navigate("/");
                return;
              }
              if (decodedToken.courseType !== "none" && decodedToken.paid) {
                setTimeout(() => {
                  navigate("/course");
                }, 2000);
              }
              if (
                (decodedToken.courseType !== "none" ||
                  decodedToken.courseType === "none") &&
                !decodedToken.paid
              ) {
                setTimeout(() => {
                  navigate("/normal-user-dashboard");
                }, 2000);
              }
            }
          } else {
            setIsValidToken(false);
            setMainLoader(false);
          }
        } else {
          setIsValidToken(false);
          setMainLoader(false);
        }
      },
      (err) => {
        setIsValidToken(false);
        console.log("invalid tkn err in authcontext", err);
      }
    );
  }

  useEffect(() => {
    swingAnalysisStatsFn();
    freeSwingAnalysisStatsFn();
    getUserDetails();
  }, []);

  useEffect(() => {
    if (swingAnalysisStats.onlyBreakoutAnalyses && freeSwingAnalysisStats) {
      const mergeAllBreakoutAnalyses =
        swingAnalysisStats.onlyBreakoutAnalyses.concat(
          freeSwingAnalysisStats.onlyBreakoutAnalyses
        );
      setAllBreakoutAnalyses(mergeAllBreakoutAnalyses);
    }
  }, [swingAnalysisStats, freeSwingAnalysisStats]);

  function logout() {
    setMainLoader(true);
    localStorage.clear();
    setUserSelectedCourse("none");
    setUserSelectedCourseFromPricingPage("none");
    getUserDetails();
    setTimeout(() => {
      setMainLoader(false);
    }, 2000);
  }

  const value = {
    isAuthenticated: isAuthenticated,
    isValidToken: isValidToken,
    userName: userName,
    token: token,
    paid: paid,
    authenticationHandler: authenticationHandler,
    courseType: courseType,
    userType: userType,
    userEmail: userEmail,
    mblNo: mblNo,
    triedToUpdate: triedToUpdate,
    analysisToDisplayBeforeLogin: analysisToDisplayBeforeLogin,
    setAnalysisToDisplayBeforeLogin: setAnalysisToDisplayBeforeLogin,
    analysisToDisplayAfterLogin: analysisToDisplayAfterLogin,
    setAnalysisToDisplayAfterLogin: setAnalysisToDisplayAfterLogin,
    registerSignupToggle: registerSignupToggle,
    userSelectedCourse: userSelectedCourse,
    setUserSelectedCourse: setUserSelectedCourse,
    userSelectedCourseFromPricingPage: userSelectedCourseFromPricingPage,
    setUserSelectedCourseFromPricingPage: setUserSelectedCourseFromPricingPage,
    swingAnalysisStats: swingAnalysisStats,
    freeSwingAnalysisStats: freeSwingAnalysisStats,
    allBreakoutAnalyses: allBreakoutAnalyses,
    getUserDetails: getUserDetails,
    swingAnalysisLoader: swingAnalysisLoader,
    freeSwingAnalysisLoader: freeSwingAnalysisLoader,
    mainLoader: mainLoader,
    nullCall: nullCall,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
