import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Add from "@mui/icons-material/Add";
import * as processHtml from "../../../services/processHtml";
import TransactionsTemplate from "../../TransactionsTemplate";
import Link from "next/link";
import HttpService from "../../../services/HttpService";
import useAuthService from "../../../services/useAuthService";
import CopyText from "../../../services/CopyText";
import TransactionListTemplate from "../../Transactions/TransactionListTemplate";
import LoadingModal from "../../LoadingModal";
import { Divider, Tooltip } from "@mui/material";
import FontAwesome from "react-fontawesome";
import { useRouter } from "next/router";

const ReferralHome = (props) => {
  const { decodeHtml } = processHtml;
  const router = useRouter();
  const AuthServ = useAuthService();
  const usr = AuthServ.getCurrentUser();

  const [referral_transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [path, setPath] = React.useState("transactions");
  const [referral_fetched, setReferralFetched] = React.useState(false);
  const [token_symbol, setSymbol] = React.useState("usd");
  const closeModal = () => {
    setModal({ ...modal, open: false });
  };
  const [modal, setModal] = React.useState({
    open: false,
    onclose: closeModal,
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

          if (result?.status === 1) {
            setTransactions(result.transactions);
            setSymbol(result.token_symbol);
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const navas = [{ path: "transactions", title: "Referral Transactions" }];

  const closeApply = () => {
    setApply({ ...apply, onopen: false });
  };
  const [apply, setApply] = React.useState({
    onopen: false,
    onclose: closeApply,
  });

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

  const [ref_link, setRefLink] = React.useState("");

  const genCode = () => {
    setLoading(true);
    setLoaded(false);
    console.log(ref_link);

    setModal({ ...modal, open: true, message: "Generating referral code..." });
    HttpService.createReferralCode(ref_link)
      .then(
        (res) => {
          console.log(res);
          setModal({
            ...modal,
            open: false,
          });
          setModal({
            ...modal,
            open: true,
            message: res.message + " Logging you out now...",
            hide_exit: false,
          });

          setTimeout(() => {
            AuthServ.logout().then(() => {
              router.push("/login");
            });
          });
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
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
                {usr?.referral_code ? (
                  <div className="pxy20 flex flex-row align-items-center">
                    <div className="flex flex-col spacer">
                      <span className="grayed txt-sm mb0">Referral Lnk</span>
                      <CopyText
                        class_name={`py5 px10 mr0 pr0 txt-md`}
                        text={`${SERVER_URL}purchase/ref/${usr.referral_code}`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="px10 py20">
                    <div className="pxy10 txt-md badge badge-warning">
                      <FontAwesome name={`info-circle`} /> Please create
                      referral link below
                    </div>
                  </div>
                )}
              </div>
            </div>
            {!usr?.referral_code && (
              <>
                <Divider />
                <div className="px10 pb10 pt20 flex flex-row">
                  <div className="spacer"></div>
                  <div className="flex flex-col px10">
                    <div className="input iconed togger mb0">
                      <label>Create Referral Code</label>
                      <input
                        type="text"
                        className="input-form-control buy-input"
                        disabled={loading}
                        onChange={(e) => setRefLink(e.target.value)}
                        placeholder="Enter new referral code"
                      />
                      <span className="input-icon">
                        <FontAwesome name={`code`} />
                      </span>
                      <span className="input-togger">
                        <Tooltip title={"Generate Code"}>
                          <button
                            className="button-link"
                            disabled={loading}
                            onClick={genCode}
                          >
                            <FontAwesome
                              name={`${loading ? "recycle fa-spin" : "send"}`}
                            />
                          </button>
                        </Tooltip>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
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
                        {item.path === "transactions" && (
                          <span className="txt-xsm">
                            ({referral_transactions.length})
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
                <section className="pxy0">
                  {referral_fetched && path === "transactions" && (
                    <TransactionListTemplate
                      page="account"
                      loaded={loaded}
                      loading={loading}
                      token_symbol={token_symbol}
                      transactions={referral_transactions}
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
      <LoadingModal data={modal} />
    </React.Fragment>
  );
};

export default ReferralHome;
