import React from "react";
import Link from "next/link";
import { Breadcrumbs, Button, Card, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import * as processHtml from "../../../services/processHtml";
import HttpService from "../../../services/HttpService";
import FontAwesome from "react-fontawesome";
import LoadingModal from "../../../components/LoadingModal";
import Layout from "../../../components/Admin/Layout";
import PagesEdit from "../../../components/Admin/Pages/PagesEdit";
import PagesList from "../../../components/Admin/Pages/PagesList";
import PagesView from "../../../components/Admin/Pages/PagesView";
import PagesNew from "../../../components/Admin/Pages/PagesNew";

export default function Mode() {
  const router = useRouter();
  const { decodeHtml } = processHtml;
  const isParam = router.query["mode"] ? true : false;
  const [page, setPage] = React.useState(null);
  const [view, setView] = React.useState(null);
  const [routes, setRoutes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [sent_confirm, setSentConfirm] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);
  const [code_confirmed, setCodeConfirmed] = React.useState(false);
  const modalClose = () => setModal({ ...modal_data, open: false });
  const [modal_data, setModal] = React.useState({
    open: false,
    onclose: modalClose,
  });
  React.useEffect(() => {}, []);

  React.useEffect(() => {
    console.log("router::", router.query);
    if (isParam) {
      const routes = router.query["mode"];
      let pgn = "";
      let tkn = "";
      if (routes) {
        if (routes.length == 0) {
          pgn = null;
          tkn = null;
        } else if (routes.length == 1) {
          pgn = routes[0];
          tkn = null;
        } else if (routes.length == 2) {
          pgn = routes[0];
          tkn = routes[1];
        }
      }
      console.log("PAGE::", pgn, "TOKEN::", tkn);
      setPage(pgn);
      setView(tkn);
    }
  }, [router.query["mode"]]);

  const navas = [
    { path: "profile", title: "Profile" },
    { path: "change_password", title: "Change Password" },
    { path: "address", title: "Wallet Address" },
  ];
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="container pxy20-resp">
            <Card sx={{ borderRadius: "0" }}>
              <div className="page-head bga">
                <div className="flex flex-row-resp px20">
                  <div className="inline-block py20">
                    <Breadcrumbs
                      aria-label="breadcrumb"
                      sx={{
                        width: "100%",
                      }}
                    >
                    <Link href="/admin/dashboard">Dashboard</Link>
                      <Link href="/admin/pages">Pages</Link>
                    </Breadcrumbs>
                    <h2 className="mt20">
                        {page==="edit" ? "Edit Page":
                    page==="new" ? "New Page":
                    page==="list" ? "Page List":""}</h2>
                  </div>
                </div>
              </div>

              <ul className="flat-nav border-bottom"></ul>
              <section className="pxy20">
                {page === "edit" && <PagesEdit id={view}/>}
                {page === "list" && <PagesList />}
                {page === "view" && <PagesView  id={view}/>}
                {page === "new" && <PagesNew />}
              </section>
            </Card>
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
}
