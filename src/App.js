import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NormalUserLayout from "./pages/normalUserLayout/normalUserLayout";
import HomePage from "./pages/beforeLoggedInPages/homePage/homePage";
import DashboardPage from "./pages/beforeLoggedInPages/dashboardPage/dashboard";
import SigninPage from "./pages/signinPage/signinPage";
import SignupPage from "./pages/signupPage/signupPage";
import MyCoursePage from "./pages/afterLoggedInPages/myCoursesPage/myCourses";
import { checkAuthTokenPaid, checkAuthTokenNormal } from "./utils/auth/auth";
import AnalysisStatsPage from "./pages/beforeLoggedInPages/analysisStatsPage/analysisStatsPage";
import PrivacyPolicyPage from "./pages/generalPages/privacyPolicy/privacyPolicyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NormalUserLayout />,
    loader: checkAuthTokenNormal,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "analysis-statistics", element: <AnalysisStatsPage /> },
      { path: "signin", element: <SigninPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "privacy-policy", element: <PrivacyPolicyPage /> },
    ],
  },
  {
    path: "/course",
    element: <NormalUserLayout />,
    loader: checkAuthTokenPaid,
    children: [{ index: true, element: <MyCoursePage /> }],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
