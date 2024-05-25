import React from "react";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import * as processHtml from "../../../services/processHtml";
import HttpService from "../../../services/HttpService";
import Layout from "../../../components/Admin/Layout";
import FaqList from "../../../components/Admin/Faq/faqList";

const Faq = () => {

  return (
    <React.Fragment>
      <Layout>
        
        <section className="dashboard-pane">
          <div className="container pxy20-resp">
            <Card sx={{ borderRadius: "0" }}>
      <FaqList/>
      </Card>
      </div>
      </section>
      </Layout>
    </React.Fragment>
  );
};

export default Faq;
