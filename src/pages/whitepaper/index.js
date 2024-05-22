import React, { Component } from "react";
import useFetchPage from "../../hooks/useFetchPage";
import * as processHtml from "../../services/processHtml";
import LinearProgress from "@mui/material/LinearProgress";
import Layout from "../../components/whitepaper/Layout";
const { decodeHtml } = processHtml;

const Home = () => {
  const { page, loaded_page, loading_page } = useFetchPage({
    slug: "whitepaper",
  });
  return (
    <Layout page_data={page}>
      {" "}
      <div className="pxy20">
        {loading_page && <LinearProgress />}
        {loaded_page && (
          <div
            dangerouslySetInnerHTML={{
              __html: decodeHtml(page.description),
            }}
          ></div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
