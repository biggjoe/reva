import React from "react";
import Link from "next/link";
import { Breadcrumbs, Button, Card, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import * as processHtml from "../../../services/processHtml";
import HttpService from "../../../services/HttpService";
import FontAwesome from "react-fontawesome";
import LoadingModal from "../../../components/LoadingModal";
import Layout from "../../../components/Account/Layout";
import TransactionList from "../../../components/Account/Transactions/List";
import TransactionDetails from "../../../components/Account/Transactions/Details";
export default function Page() {
  const router = useRouter();
  const { decodeHtml } = processHtml;
  const isParam = router.query["page"] ? true : false;
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
      const routes = router.query["page"];
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
      console.log("ID::", pgn, "TOKEN::", tkn);
      setPage(pgn);
      setView(tkn);
    }
  }, [router.query["page"]]);

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
              {page === "details" && (
                <TransactionDetails page="account" tid={view} />
              )}
              {page === "list" && <TransactionList page="account" />}
            </Card>
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
}
