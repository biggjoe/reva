import React from "react";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import * as processHtml from "../../../services/processHtml";
import HttpService from "../../../services/HttpService";
import Layout from "../../../components/Admin/Layout";
import PagesList from "../../../components/Admin/Pages/PagesList";

const Pages = () => {

  return (
    <React.Fragment>
      <Layout> <section className="dashboard-pane">
          <div className="container pxy20-resp">
            <Card sx={{ borderRadius: "0" }}>
      <PagesList/>
      </Card>
      </div>
      </section>
      </Layout>
    </React.Fragment>
  );
};

export default Pages;
