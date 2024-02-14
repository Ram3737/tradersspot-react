import "./index.css";
import Layout from "../src/components/layout/layout";
import BannerContainer from "./pages/beforeLoggedInPages/homePage/components/banner-container";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Layout>
        <div className="App">
          <BannerContainer />
        </div>
      </Layout>
    </Fragment>
  );
}

export default App;
