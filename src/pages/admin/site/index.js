import React from "react";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import * as processHtml from "../../../services/processHtml";
import HttpService from "../../../services/HttpService";
import Layout from "../../../components/Admin/Layout";
import SiteList from "../../../components/Admin/Site/SiteList";

const Site = () => {
  return (
    <React.Fragment>
      <Layout>
        <SiteList />
      </Layout>
    </React.Fragment>
  );
};

export default Site;
