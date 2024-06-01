import React from "react";
import useAuthService from "../../../../services/useAuthService";
import Layout from "../../../../components/Admin/Layout";
import { useRouter } from "next/router";
import numberWithCommas from "../../../../pipes/Number";
import {
  Card,
  List,
  ListItem,
  ListItemText,
  Icon,
  Breadcrumbs,
  Button,
  Divider,
} from "@mui/material";
import {
  PendingOutlined,
  CreditCard,
  WarningOutlined,
  CheckCircleOutlined,
  CircleOutlined,
} from "@mui/icons-material";
import * as processHtml from "../../../../services/processHtml";
import HttpService from "../../../../services/HttpService";
import DatePipe from "../../../../pipes/DatePipe";
import TransactionListTemplate from "../../../../components/Transactions/TransactionListTemplate";
import Link from "next/link";
import CustomModal from "../../../../components/CustomModal";
import FontAwesome from "react-fontawesome";

const Code = () => {
  const router = useRouter();
  const { decodeHtml } = processHtml;
  const isParam = router.query["code"] ? true : false;
  const [page, setPage] = React.useState(null);
  const [view, setView] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState({
    onopen: false,
    onclose: modalClose,
  });
  const [code_detail, setCode] = React.useState({
    code_transactions: [],
  });
  React.useEffect(() => {
    if (view && page) {
      setLoading(true);
      setLoaded(false);
      HttpService.fetchAffiliateCode(view)
        .then((res) => {
          console.log(res);
          setCode(res.code);
        })
        .finally(() => {
          setLoading(false);
          setLoaded(true);
        });
    }
  }, [view, page]);

  React.useEffect(() => {
    console.log("router::", router.query);
    if (isParam) {
      const routes = router.query["code"];
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
  }, [router.query["code"]]);

  const processCode = (action) => {
    setLoading(true);
    setLoaded(false);
    HttpService.processAffiliateCode({
      action: action,
      code: code_detail?.code,
    })
      .then((res) => {
        console.log(res);

        const severity =
          res.status === 1 ? "success" : res.status === 0 ? "error" : "info";
        setModal({
          ...modal_data,
          onopen: true,
          message: res.message,
          severity: severity,
          onclose: modalClose,
        });
      })
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };

  return (
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="container pxy20-resp">
            <Card sx={{ borderRadius: "0", mb: "20px" }}>
              <div className="page-head">
                <div className="flex flex-row-resp align-items-center">
                  <div className="inline-block pxy20 spacer">
                    <Breadcrumbs
                      aria-label="breadcrumb"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Link href={`/admin/dashboard`}>Dashboard</Link>
                      <Link href={`/admin/affiliate`}>Affiliates</Link>
                      <span>Affiliate Code</span>
                    </Breadcrumbs>
                    <h2 className="mt20">
                      {code_detail?.code}{" "}
                      <sup>
                        <Icon>
                          {code_detail?.is_approved === 0 ? (
                            <PendingOutlined
                              sx={{ fontSize: "25px" }}
                              className={`color-pending`}
                            />
                          ) : code_detail?.is_approved === 1 ? (
                            <CheckCircleOutlined
                              sx={{ fontSize: "25px" }}
                              className={`color-success`}
                            />
                          ) : code_detail?.is_approved === -1 ? (
                            <WarningOutlined
                              sx={{ fontSize: "25px" }}
                              className={`color-red`}
                            />
                          ) : (
                            <CircleOutlined sx={{ fontSize: "25px" }} />
                          )}
                        </Icon>
                      </sup>
                    </h2>
                  </div>

                  <span className="pxy20">
                    {code_detail?.is_approved === 0 && (
                      <Button
                        disabled={loading}
                        variant="outlined"
                        onClick={() => processCode("approve")}
                        size="small"
                      >
                        <FontAwesome name="check" /> &nbsp;Approve
                      </Button>
                    )}
                    {code_detail?.is_approved === 1 && (
                      <Button
                        disabled={loading}
                        variant="outlined"
                        color="warning"
                        onClick={() => processCode("suspend")}
                        size="small"
                      >
                        <FontAwesome name="ban" /> &nbsp;Suspend
                      </Button>
                    )}
                  </span>
                </div>
              </div>
              <Divider />
              <List>
                <ListItem divider>
                  <ListItemText>
                    <div className="flex flex-row-resp">
                      <div className="spacer coler">
                        <h3>Code</h3>
                        <h5>{code_detail?.code}</h5>
                      </div>

                      <div className="spacer coler flex flex-col align-items-end">
                        <h3>Total Earning</h3>
                        <h5 className="ucap">
                          <span className="ucap">$XRV</span>{" "}
                          {numberWithCommas(
                            code_detail?.affiliate_code_earning
                          )}
                        </h5>
                      </div>
                    </div>
                  </ListItemText>
                </ListItem>

                <ListItem divider>
                  <ListItemText>
                    <div className="flex flex-row-resp">
                      <div className="spacer coler">
                        <h3>Percentage</h3>
                        <h4 className="px0">{code_detail?.percentage}%</h4>
                      </div>

                      <div className="spacer coler flex flex-col align-items-end">
                        <h3>Transactions</h3>
                        <h5 className="ucap">
                          {code_detail?.affiliate_transactions?.length}
                        </h5>
                      </div>
                    </div>
                  </ListItemText>
                </ListItem>

                <ListItem>
                  <ListItemText>
                    <div className="flex flex-row-resp">
                      <div className="spacer coler">
                        <h3>Apply Date</h3>
                        <h5>
                          <i className="fas fa-clock"></i>
                          <DatePipe
                            value={new Date(code_detail?.created_at).getTime()}
                          />
                        </h5>
                      </div>

                      <div className="spacer coler flex flex-col align-items-end">
                        <h3>Approved On</h3>
                        <h5>
                          {code_detail?.is_approved === 1 ? (
                            <>
                              <i className="fas fa-clock"></i>
                              <DatePipe
                                value={new Date(
                                  code_detail?.updated_at
                                ).getTime()}
                              />
                            </>
                          ) : (
                            `--`
                          )}
                        </h5>
                        <span className="px10"></span>
                      </div>
                    </div>
                  </ListItemText>
                </ListItem>
              </List>
            </Card>
            <h3>Affiliate Transactions</h3>
            <Card sx={{ borderRadius: "0" }}>
              <TransactionListTemplate
                page="admin"
                loaded={loaded}
                loading={loading}
                token_symbol={`$XRV`}
                transactions={code_detail?.affiliate_transactions}
              />
            </Card>
          </div>
        </section>
      </Layout>
      <CustomModal data={modal_data} />
    </React.Fragment>
  );
};

export default Code;
