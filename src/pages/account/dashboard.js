import React from "react";
import Grid from "@mui/material/Grid";
import useAuthService from "../../services/useAuthService";
import HttpService from "../../services/HttpService";
import * as processHtml from "../../services/processHtml";
import CountdownTimers from "../../components/CountdownTimers";
import PlaceHolder from "../../components/PlaceHolder";
import Link from "next/link";
import Layout from "../../components/Account/Layout";

const Dashboard = () => {
  const AuthServ = useAuthService();
  const usr = AuthServ.getCurrentUser();
  const { decodeHtml } = processHtml;
  const [dashboard, setDashboard] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [isParam, setParam] = React.useState(false);
  const [seconds, setSeconds] = React.useState(null);
  const [dashboard_fetched, setDashboardFetched] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    fetchDashboard();
  }, []);
  const fetchDashboard = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.fetchDashboard()
      .then(
        (result) => {
          console.log("dashboard :: |", result);
          setDashboardFetched(true);
          if (result) {
            setDashboard(result);
            const secs =
              new Date(result.progress_data?.ends).getTime() -
              new Date().getTime();
            /*   const seconds =
              result.progress_data.sales_end_in -
              result.progress_data.sales_start_in; */
            setSeconds(Math.ceil(secs));
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax
  let progressBar = (done, total) => {
    console.log(done, total);
    const one_perc = total / 100;
    const done_perc = done / one_perc;
    console.log(done_perc);
    return { done: done_perc };
  };
  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="z-high py10">
            {loading && <PlaceHolder type="dash" />}
            {loaded && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href="/account/dashboard" className="grid-card g7">
                      --------
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href="/account/dashboard" className="grid-card bga">
                      -----
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
