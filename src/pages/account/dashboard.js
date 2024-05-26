import React from "react";
import Grid from "@mui/material/Grid";
import useAuthService from "../../services/useAuthService";
import HttpService from "../../services/HttpService";
import * as processHtml from "../../services/processHtml";
import PlaceHolder from "../../components/PlaceHolder";
import Link from "next/link";
import numberWithCommas from "../../pipes/Number";
import Layout from "../../components/Account/Layout";
import useFetchContract from "../../hooks/useFetchContract";
import CountdownTimer from "../../components/CountdownTimers";

const Dashboard = () => {
  const AuthServ = useAuthService();
  const usr = AuthServ.getCurrentUser();
  const { decodeHtml } = processHtml;
  const [dashboard, setDashboard] = React.useState(null);

  const {
    address,
    contract_loaded,
    saleEndTime,
    saleStartTime,
    total_raised_usd,
    total_target_usd,
    xrv_to_usd,
    tokenBalance,
    percProgres,
  } = useFetchContract();
  console.log(
    "DASHBOARD:::::::::::::::::::::::",
    address,
    contract_loaded,
    saleEndTime,
    saleStartTime,
    total_raised_usd,
    total_target_usd,
    xrv_to_usd,
    tokenBalance,
    percProgres
  );
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="z-high py10">
            {!contract_loaded && <PlaceHolder type="dash" />}
            {contract_loaded && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href="/account/dashboard" className="grid-card g7">
                      <CountdownTimer endTime={saleEndTime} />
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "stretch",
                    }}
                  >
                    <Link
                      href="/account/dashboard"
                      className="prog-container mt0"
                      style={{
                        display: "flex",
                        flexGrow: "1",
                        marginTop: "0",
                      }}
                    >
                      <div
                        className="prog-desc"
                        style={{ display: "flex", flexGrow: "1" }}
                      >
                        <div className="done-text px10">
                          <h4 className="txt-xem">Total Raised</h4>
                          <span className="txt-pcs">
                            {contract_loaded ? `$${total_raised_usd}` : "..."}
                          </span>
                        </div>
                        <div className="spacer"></div>
                        <div className="total-text text-right px10">
                          <h4 className="txt-xem">Target</h4>
                          <span className="txt-pcs">
                            {contract_loaded ? `$${total_target_usd}` : "..."}
                          </span>
                        </div>
                      </div>
                      <div className="prog-signal" style={{ flex: "0 0" }}>
                        <div className="status-bar">
                          <span
                            className="done-bar"
                            style={{
                              width: percProgres,
                            }}
                          >
                            {contract_loaded ? `${percProgres}%` : ""}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href="/account/dashboard" className="grid-card bga">
                      -----
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Link className="grid-card bga" href="/account/affiliate">
                      <div className="flex flex-row align-items-center pxy20">
                        <div className="spacer">
                          <div className="icon-pane mb10">
                            <i className="fa-users fas fa"></i>
                          </div>
                          <div className="txt-xsm">-</div>
                          <div className="pane-title">
                            <span>Affiliate</span>
                            <sup>
                              <i className="fa-check-circle color-approved fas fa"></i>
                            </sup>
                          </div>
                        </div>

                        <div className="spacer">
                          <div className="flex flex-row">
                            <div className="flex flex-col text-center">
                              <span className="txt-xsm">Earnings</span>
                              <h3 className="boldest">
                                <sup>$</sup>
                                {dashboard?.total_earnings}{" "}
                              </h3>
                            </div>
                            <span className="px10"></span>
                            <div className="flex flex-col text-center">
                              <span className="txt-xsm">Bal</span>
                              <h3 className="boldest">
                                <sup>$</sup>
                                {dashboard?.wallet_balance}
                              </h3>
                            </div>
                          </div>

                          <div className="flex flex-row justify-end pt10">
                            <div className="flex flex-col align-items-center pr20">
                              <span className="txt-xsm">Codes</span>
                              <h3 className="boldest">
                                {dashboard?.total_codes}
                              </h3>
                            </div>
                            <div className="flex align-items-center flex-col">
                              <span className="txt-xsm">Active</span>
                              <h3 className="boldest">
                                {dashboard?.active_codes}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
};

export default Dashboard;
