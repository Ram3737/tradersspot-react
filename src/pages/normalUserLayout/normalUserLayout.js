import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/layout/layout";

function NormalUserLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default NormalUserLayout;
