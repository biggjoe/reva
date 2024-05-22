import React, { useCallback } from "react";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import * as processHtml from "../../services/processHtml";
import HttpService from "../../services/HttpService";
import Layout from "../../components/whitepaper/Layout";
import Category from "../../components/whitepaper/category";

export default function Home() {
  const router = useRouter();

  const { decodeHtml } = processHtml;
  const isParam = router.query.whitepaper ? true : false;
  const [mode, setMode] = React.useState(null);
  const [routes, setRoutes] = React.useState(null);
  const [slug, setSlug] = React.useState(false);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    console.log("router::", router.query.whitepaper);
    if (isParam) {
      const routes = router.query.whitepaper;
      let slu = "";
      let mod = "";
      if (routes) {
        if (routes.length == 1) {
          mod = "category";
          slu = routes[0];
        } else if (routes.length == 2) {
          mod = "sub";
          slu = routes[1];
        }
      }
      console.log("SLUGGGG:::::::", slu, "MODE:::::::", mod);
      setMode(mod);
      setSlug(slu);
    }
  }, [router.query.whitepaper]);

  const [page_data, setPageData] = React.useState({});
  const return_page = (data) => {
    setPageData({ ...data, mode: mode });
  };
  return (
    <Layout page_data={page_data}>
      <Category mode={mode} slug={slug} return_page={return_page} />
    </Layout>
  );
}
