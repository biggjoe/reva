import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Add from "@mui/icons-material/Add";
import * as processHtml from "../../../services/processHtml"
import TransactionsTemplate from "../../TransactionsTemplate";
import Link from "next/link";
import HttpService from "../../../services/HttpService";

const ReferralHome = (props) => {
  const { decodeHtml } = processHtml;
  const [referral, setReferral] = React.useState(null);
  const [referral_codes, setCodes] = React.useState([]);
  const [referral_withdrawal_requests, setRequests] = React.useState([]);
  const [withdraw_threshold, setWithdrawThreshold] = React.useState(1000);
  const [total_earnings, setTotalEarning] = React.useState(0);
  const [wallet_balance, setWalletBalance] = React.useState(0);
  const [referral_transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [path, setPath] = React.useState("transactions");
  const [isParam, setParam] = React.useState(false);
  const [referral_fetched, setReferralFetched] = React.useState(false);
  const closeBonus = () => {
    setBonusData({ ...bonus_data, onopen: false });
  };
  const [bonus_data, setBonusData] = React.useState({
    onopen: false,
    onclose: closeBonus,
  });
  const closeWithdraw = () => {
    setWithdrawData({ ...withdraw_data, onopen: false });
  };
  const [withdraw_data, setWithdrawData] = React.useState({
    onopen: false,
    onclose: closeWithdraw,
  });
  React.useEffect(() => {
    //window.scrollTo(0, 0);
    fetchReferral();
  }, []);

  const fetchReferral = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.fetchReferral()
      .then(
        (result) => {
          console.log("::|", result);
          setReferralFetched(true);
          if (result) {
            if (result?.transactions) {
              setTransactions(result.transactions);
            }
            if (result?.wallet_balance) {
              setWalletBalance(result.wallet_balance);
            }
            if (result?.withdraw_threshold) {
              setWithdrawThreshold(result.withdraw_threshold);
            }
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const navas = [
    { path: "transactions", title: "Transactions" },
    { path: "requests", title: "Withdrawal Requests" },
  ];

  const closeApply = () => {
    setApply({ ...apply, onopen: false });
  };
  const [apply, setApply] = React.useState({
    onopen: false,
    onclose: closeApply,
  });

  const launch_withdraw = () => {
    setWithdrawData({ ...withdraw_data, onopen: true, onclose: closeWithdraw });
  };

  return (
    <React.Fragment>
      <section className="dashboard-pane">
        <div className="container py20">
          <Card sx={{ borderRadius: "2px" }}>
            <div className="page-head bga">
              <div className="flex flex-row-resp align-items-center">
                <div className="inline-block pxy20 spacer">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Link href="/account/dashboard">Dashboard</Link>
                    <span>Referral</span>
                  </Breadcrumbs>
                  <h2 className="mt20">Referral</h2>
                </div>
                {referral_fetched && referral && (
                  <div className="py10 flex flex-row">
                    <div className="stat-col">
                      <span className="count-span">
                        <sup className="txt-xsm">$</sup>
                        {total_earnings}
                      </span>
                      <span className="desc-span">total earnings</span>
                    </div>
                    <div className="stat-col">
                      <span className="count-span">
                        <sup className="txt-xsm">$</sup>
                        {wallet_balance}
                      </span>
                      <span className="desc-span">wallet balance</span>
                      {wallet_balance >= withdraw_threshold && (
                        <a
                          href="#"
                          onClick={launch_withdraw}
                          className="badge badge-regular-btn"
                        >
                          <i className="fas fa-wallet"></i> Withdraw
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {referral_fetched && (
              <>
                <ul className="flat-nav border-bottom">
                  {navas.map((item, index) => (
                    <li key={item.path}>
                      <a
                        href={"#"}
                        className={path === item.path ? "active" : ""}
                        onClick={() => setPath(item.path)}
                      >
                        {item.title}
                        {item.path === "codes" && (
                          <span className="txt-xsm">
                            {" "}
                            ({referral_codes.length})
                          </span>
                        )}
                        {item.path === "requests" && (
                          <span className="txt-xsm">
                            {" "}
                            ({referral_withdrawal_requests.length})
                          </span>
                        )}
                        {item.path === "transactions" && (
                          <span className="txt-xsm">
                            {" "}
                            ({referral_transactions.length})
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
                <section className="pxy0">
             

                  {referral_fetched && path === "transactions" && (
                    <TransactionsTemplate
                      transactions={referral_transactions}
                      fetched={referral_fetched}
                    />
                  )}
                </section>
              </>
            )}
            {loading && (
              <div className="flex flex-col pxy30 align-items-center">
                <em className="fas large-loader fa-spin fa-circle-notch"></em>
                <h3 className="pxy20">Loading referral page...</h3>
              </div>
            )}
      
           
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ReferralHome;
