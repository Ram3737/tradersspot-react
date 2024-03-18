import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/layout";
import HomePage from "./pages/beforeLoggedInPages/homePage/homePage";
import DashboardPage from "./pages/beforeLoggedInPages/dashboardPage/dashboard";
import SigninPage from "./pages/signinPage/signinPage";
import SignupPage from "./pages/signupPage/signupPage";
import MyCoursePage from "./pages/afterLoggedInPages/myCoursesPage/myCourses";
import { checkAuthTokenPaid, checkAuthTokenNormal } from "./utils/auth/auth";
import AnalysisStatsPage from "./pages/beforeLoggedInPages/analysisStatsPage/analysisStatsPage";
import PrivacyPolicyPage from "./pages/generalPages/privacyPolicy/privacyPolicyPage";
import { AuthContext } from "./components/store/context/authContextProvider";
import { useContext } from "react";
import AnalysisPage from "./pages/afterLoggedInPages/analysisPage/analysisPage";
import TechnicalContentPage from "./pages/afterLoggedInPages/myCoursesPage/contents/technicalContentPage";
import FundamentalContentPage from "./pages/afterLoggedInPages/myCoursesPage/contents/fundamentalContentPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Layout>
        {authCtx.isValidToken && authCtx.paid ? (
          <Routes>
            <Route exact path="/course" element={<MyCoursePage />} />
            <Route exact path="/analyses" element={<AnalysisPage />} />
            <Route
              exact
              path="/technical-content"
              element={<TechnicalContentPage />}
            />
            <Route
              exact
              path="/fundamental-content"
              element={<FundamentalContentPage />}
            />
            <Route exact path="*" element={<Navigate to="/course" replace />} />
          </Routes>
        ) : authCtx.isValidToken && !authCtx.paid ? (
          <Routes>
            <Route exact path="/normal-user" element={<DashboardPage />} />
            <Route
              exact
              path="/analysis-statistics"
              element={<AnalysisStatsPage />}
            />
            <Route
              exact
              path="*"
              element={<Navigate to="/normal-user" replace />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route
              exact
              path="analysis-statistics"
              element={<AnalysisStatsPage />}
            />
            <Route exact path="/signin" element={<SigninPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route
              exact
              path="/privacy-policy"
              element={<PrivacyPolicyPage />}
            />
            <Route exact path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </Layout>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        toastStyle={{ backgroundColor: "#242627", color: "#c9c8c7" }}
      />
    </div>
  );
}

export default App;
