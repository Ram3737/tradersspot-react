import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NormalUserLayout from "./pages/normalUserLayout/normalUserLayout";
import HomePage from "./pages/beforeLoggedInPages/homePage/homePage";
import DashboardPage from "./pages/beforeLoggedInPages/dashboardPage/dashboard";
import SigninPage from "./pages/signinPage/signinPage";
import SignupPage from "./pages/signupPage/signupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NormalUserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "signin", element: <SigninPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
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
