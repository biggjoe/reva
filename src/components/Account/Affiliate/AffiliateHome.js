import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Add from "@mui/icons-material/Add";
import * as processHtml from "../../../services/processHtml";
import HttpService from "../../../services/HttpService";
import TransactionsTemplate from "../../TransactionsTemplate";
import BonusCodesTemplate from "../../BonusCodesTemplate";
import WithdrawalRequestTemplate from "../../WithdrawalRequestTemplate";
import ApplyAffiliateTemplate from "../../ApplyAffiliateTemplate";
import CreateAffiliateCodeTemplate from "../../CreateAffiliateCodeTemplate";
import WithdrawTemplate from "../../WithdrawTemplate";
import Link from "next/link";

const AffiliateHome = (props) => {
  const { decodeHtml } = processHtml;
  const [affiliate, setAffiliate] = React.useState(null);
  const [affiliate_codes, setCodes] = React.useState([]);
  const [affiliate_withdrawal_requests, setRequests] = React.useState([]);
  const [withdraw_threshold, setWithdrawThreshold] = React.useState(1000);
  const [total_earnings, setTotalEarning] = React.useState(0);
  const [wallet_balance, setWalletBalance] = React.useState(0);
  const [affiliate_transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [path, setPath] = React.useState("codes");
  const [isParam, setParam] = React.useState(false);
  const [affiliate_fetched, setAffiliateFetched] = React.useState(false);
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
    fetchAffiliate();
  }, []);

  const fetchAffiliate = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.fetchAffiliate()
      .then(
        (result) => {
          console.log("::|", result);
          setAffiliateFetched(true);
          if (result) {
            if (result?.affiliate_details) {
              setAffiliate(result?.affiliate_details);
            }
            if (result?.affiliate_codes) {
              setCodes(result?.affiliate_codes);
            }
            if (result?.transactions) {
              setTransactions(result?.transactions);
            }
            if (result?.total_earnings) {
              setTotalEarning(result?.total_earnings);
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
    { path: "codes", title: "Bonus Codes" },
    { path: "transactions", title: "Code Transactions" },
  ];

  const closeApply = () => {
    setApply({ ...apply, onopen: false });
  };
  const [apply, setApply] = React.useState({
    onopen: false,
    onclose: closeApply,
  });
  const apply_affiliate = (mode) => {
    setApply({
      ...apply,
      role: mode,
      onopen: true,
      onclose: closeApply,
    });
  };

  const create_code = () => {
    setBonusData({ ...bonus_data, onopen: true, onclose: closeBonus });
  };

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
                    <span>Affiliate</span>
                  </Breadcrumbs>
                  <h2 className="mt20">Affiliate</h2>
                </div>
                {affiliate_fetched && affiliate && (
                  <div className="py20 px20 flex flex-row">
                    <div className="stat-col">
                      <span className="count-span">
                        <sup className="txt-xsm">$</sup>
                        {total_earnings}
                      </span>
                      <span className="desc-span">Earnings</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {affiliate_fetched && (
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
                            ({affiliate_codes.length})
                          </span>
                        )}
                        {item.path === "requests" && (
                          <span className="txt-xsm">
                            {" "}
                            ({affiliate_withdrawal_requests.length})
                          </span>
                        )}
                        {item.path === "transactions" && (
                          <span className="txt-xsm">
                            {" "}
                            ({affiliate_transactions.length})
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
                <section className="pxy0">
                  {affiliate_fetched && path === "codes" && (
                    <>
                      {affiliate_codes.length > 0 && (
                        <div className="flex flex-row-resp pxy10 border-bottom">
                          <span className="spacer"></span>
                          <span>
                            <Button
                              onClick={create_code}
                              size="small"
                              variant="contained"
                            >
                              <Add /> Add Bonus Code
                            </Button>
                          </span>
                        </div>
                      )}
                      <BonusCodesTemplate
                        codes={affiliate_codes}
                        fetched={affiliate_fetched}
                        fnc={create_code}
                        affiliate={affiliate}
                      />
                    </>
                  )}
                  {affiliate_fetched && path === "requests" && (
                    <>
                      {wallet_balance >= withdraw_threshold && (
                        <div className="flex flex-row-resp pxy10 border-bottom">
                          <span className="spacer"></span>
                          <span className="px5">
                            <Button
                              onClick={launch_withdraw}
                              size="small"
                              variant="contained"
                            >
                              <Add /> Withdraw Earnings
                            </Button>
                          </span>
                        </div>
                      )}
                      <WithdrawalRequestTemplate
                        requests={affiliate_withdrawal_requests}
                        fetched={affiliate_fetched}
                      />
                    </>
                  )}

                  {affiliate_fetched && path === "transactions" && (
                    <TransactionsTemplate
                      transactions={affiliate_transactions}
                      fetched={affiliate_fetched}
                    />
                  )}
                </section>
              </>
            )}
            {loading && (
              <div className="flex flex-col pxy30 align-items-center">
                <em className="fas large-loader fa-spin fa-circle-notch"></em>
                <h3 className="pxy20">Loading affiliate page...</h3>
              </div>
            )}
            {loaded && affiliate_fetched && !affiliate && (
              <>
                <div className="flex flex-col pxy30 align-items-center">
                  <em className="fas large-loader  fa-regular fa-face-frown"></em>
                  <h3 className="pxy20">
                    You are yet to join our affiliate program
                  </h3>
                  <div className="pxy10">
                    <Button
                      onClick={() => apply_affiliate("new")}
                      size="large"
                      variant="contained"
                    >
                      <Add /> JOIN NOW
                    </Button>
                  </div>
                </div>
              </>
            )}

            {affiliate_fetched && affiliate?.is_approved === 0 && (
              <>
                <div className="flex flex-col pxy30 align-items-center">
                  <em className="fas large-loader  fa-hourglass-half"></em>
                  <h3 className="pxy20 text-center">
                    <p>
                      Your affiliate program application is being processed.
                    </p>
                    <p> Please wait for approval.</p>
                  </h3>
                  <div className="pxy10"></div>
                </div>
              </>
            )}

            {affiliate_fetched && affiliate?.is_approved === -1 && (
              <>
                <div className="flex flex-col pxy30 align-items-center">
                  <em className="fas large-loader  fa-hourglass-half"></em>
                  <h3 className="pxy20 text-center">
                    <p>Your affiliate program application was cancelled.</p>
                  </h3>
                  <div className="pxy10">
                    <Button
                      onClick={() => apply_affiliate("resubmit")}
                      size="large"
                      variant="contained"
                    >
                      <Add /> SUBMIT AGAIN
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </section>
      <ApplyAffiliateTemplate data={apply} />
      <CreateAffiliateCodeTemplate data={bonus_data} />
    </React.Fragment>
  );
};

export default AffiliateHome;
