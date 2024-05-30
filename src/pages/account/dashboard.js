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
import FontAwesome from "react-fontawesome";
import { Divider } from "@mui/material";
import useFetchRates from "../../hooks/useFetchRates";
import DatePipe from "../../pipes/DatePipe";

const Dashboard = () => {
  const AuthServ = useAuthService();
  const usr = AuthServ.getCurrentUser();
  const { decodeHtml } = processHtml;
  const [dashboard, setDashboard] = React.useState(null);

  const { bnb_rate, usdc_rate, usdt_rate } = useFetchRates();
  React.useEffect(() => {
    getBalance();
    getAffiliate();
  }, []);
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

  const [token_balance, setBalance] = React.useState(0.0);

  const [loading_balance, setLoadingBalance] = React.useState(false);
  const [loaded_balance, setLoadedBalance] = React.useState(false);
  const getBalance = () => {
    setLoadingBalance(true);
    setLoadedBalance(false);
    HttpService.postHeader("token_balance", {})
      .then((response) => {
        console.log("TOKEN BAL:::", response);
        setBalance(response.token_balance);
      })
      .finally(() => {
        setLoadingBalance(false);
        setLoadedBalance(true);
      });
  };
  const [affiliate, setAffiliate] = React.useState(null);
  const [loading_affiliate, setLoadingAffiliate] = React.useState(false);
  const [loaded_affiliate, setLoadedAffiliate] = React.useState(false);
  const getAffiliate = () => {
    setLoadingAffiliate(true);
    setLoadedAffiliate(false);
    HttpService.fetchAffiliate()
      .then((res) => {
        console.log("affiliate_data :: ");
        console.log(res);
        setAffiliate(res);
      })
      .finally(() => {
        setLoadingAffiliate(false);
        setLoadedAffiliate(true);
      });
  };
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="z-high py10">
            {!contract_loaded && <PlaceHolder type="dash" />}
            {contract_loaded && (
              <>
                <Grid container spacing={2}>
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
                    <div
                      className="prog-container mt0 bg-grax"
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
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-card g7 flex flex-col">
                      <div className="flex flex-row align-items-center">
                        <div className="time-icon">
                          <FontAwesome name="hourglass-half" />
                        </div>
                        <span className="spacer"></span>
                        <div className=" flex flex-col spacer">
                          <h2 className="spacer text-right ucap">Stage 1</h2>
                          <span className="txt-xsm lh-1 ucap boldest text-right">
                            Duration
                          </span>
                          <span className="txt-sm bold text-right">
                            <DatePipe value={saleStartTime * 1000} /> -
                            <DatePipe value={saleEndTime * 1000} />
                          </span>
                        </div>
                      </div>
                      <span className="spacer"></span>
                      <div className="txt-sm">Presale ends:</div>
                      <div className="item-div-dash">
                        <CountdownTimer endTime={saleEndTime} />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-card bga flex flex-col">
                      <div className="flex flex-row align-items-center">
                        <span className="time-icon">
                          <FontAwesome name="line-chart" />
                        </span>
                        <div className="spacer">
                          <h2 className="spacer text-right ucap lh-1">Rates</h2>
                          <div className="spacer txt-sm text-right ucap">
                            per $XRV
                          </div>
                        </div>
                      </div>
                      <span className="py10">
                        <Divider />
                      </span>
                      <span className="spacer"></span>
                      <div className="flex flex-row bit-col-container">
                        <div className="col-bit">
                          <div className="txt-sm ucap">BNB/$XRV</div>
                          <div className="item-div-dash">{bnb_rate}</div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">USDT/$XRV</div>
                          <div className="item-div-dash">{usdt_rate}</div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">USDC/$XRV</div>
                          <div className="item-div-dash">{usdc_rate}</div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-card bga flex flex-col">
                      <div className="flex flex-row align-items-center">
                        <span className="time-icon">
                          <FontAwesome name="bitcoin" />
                        </span>
                        <div className="spacer">
                          <h2 className="spacer text-right ucap lh-1">
                            SUMMARY
                          </h2>
                          <div className="spacer txt-sm text-right ucap">
                            Acct. details
                          </div>
                        </div>
                      </div>
                      <span className="py10">
                        <Divider />
                      </span>
                      <span className="spacer"></span>
                      <div className="flex flex-row bit-col-container">
                        <div className="col-bit">
                          <div className="txt-sm ucap">Total $xrv</div>
                          <div className="item-div-dash">
                            {loading_balance ? "..." : token_balance}
                          </div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">BONUS</div>
                          <div className="item-div-dash">18</div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">Transactions</div>
                          <div className="item-div-dash">37</div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">
                            <FontAwesome name="envelope" />
                          </div>
                          <div className="item-div-dash">14</div>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-card bga flex flex-col">
                      <div className="flex flex-row align-items-center">
                        <span className="time-icon">
                          <FontAwesome name="user-circle" />
                        </span>
                        <h2 className="spacer text-right ucap">Affiliate</h2>
                      </div>
                      <span className="py10">
                        <Divider />
                      </span>
                      <span className="spacer"></span>
                      <div className="flex flex-row">
                        <div className="col-bit">
                          <div className="txt-sm ucap">Earnings</div>
                          <div className="item-div-dash">
                            ${affiliate?.total_earnings}
                          </div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">Tnx</div>
                          <div className="item-div-dash">
                            {affiliate?.transactions?.length}
                          </div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">Codes</div>
                          <div className="item-div-dash">
                            {affiliate?.affiliate_codes?.length}
                          </div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">Bal.</div>
                          <div className="item-div-dash">
                            {affiliate?.wallet_balance}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <div className="grid-card bga flex flex-col">
                      <div className="flex flex-row align-items-center">
                        <span className="time-icon">
                          <FontAwesome name="users" />
                        </span>
                        <h2 className="spacer text-right ucap">Referral</h2>
                      </div>
                      <span className="py10">
                        <Divider />
                      </span>
                      <span className="spacer"></span>
                      <div className="flex flex-row bit-col-container">
                        <div className="col-bit">
                          <div className="txt-sm ucap">Earnings</div>
                          <div className="item-div-dash">$0.00</div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">Tnx</div>
                          <div className="item-div-dash">1</div>
                        </div>
                        <div className="col-bit">
                          <div className="txt-sm ucap">Referred:</div>
                          <div className="item-div-dash">1</div>
                        </div>
                      </div>
                    </div>
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
