import React from "react";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import * as processHtml from "../../../services/processHtml";
import HttpService from "../../../services/HttpService";
import Layout from "../../../components/Admin/Layout";
import ListWhitepaper from "../../../components/Admin/Whitepaper/ListWhitepaper";

const Whitepaper = () => {

  return (
    <React.Fragment>
      <Layout>
      <ListWhitepaper/>
      </Layout>
    </React.Fragment>
  );
};

export default Whitepaper;
