import React from "react";
import Link from "next/link";
import HttpService from "../../services/HttpService";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  CheckCircleOutlined,
  CreditCard,
  PendingOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import DatePipe from "../../pipes/DatePipe";
import * as processHtml from "../../services/processHtml";
import useAuthService from "../../services/useAuthService";
import CustomModal from "../CustomModal";
import FontAwesome from "react-fontawesome";

const TransactionDetails = ({ page, tid }) => {
  const { decodeHtml, truncateWord } = processHtml;
  const usr = useAuthService().getCurrentUser();

  const [isParam, setParam] = React.useState(false);
  const [transaction_details, setTransactionDetails] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [fetched, setFecthed] = React.useState(false);
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState({
    onopen: false,
    onclose: modalClose,
  });
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!fetched) {
      fetchTransactions(tid);
    }
  }, [fetched]);

  const fetchTransactions = (tid) => {
    setLoading(true);
    setLoaded(false);
    HttpService.fetchTransactionDetails(tid)
      .then(
        (result) => {
          console.log(result);
          if (result) {
            setTransactionDetails(result);
            setFecthed(true);
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const launch_requery = (item) => {
    setLoading(true);
    setLoaded(false);
    console.log("tranx item::", item);
    HttpService.queryTransaction(item)
      .then(
        (result) => {
          console.log(result);
          if (result) {
            const severity =
              result.status === 1
                ? "success"
                : result.status === 0
                ? "error"
                : "info";
            setModal({
              ...modal_data,
              onopen: true,
              message: result.message,
              severity: severity,
              onclose: modalClose,
            });
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  };

  return (
    <React.Fragment>
      <div className="page-head">
        <div className="flex flex-row-resp align-items-center">
          <div className="inline-block pxy20 spacer">
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                width: "100%",
              }}
            >
              <Link href={`/${page}/dashboard`}>Dashboard</Link>
              <Link href={`/${page}/transactions`}>Transactions</Link>
            </Breadcrumbs>
            <h2>
              <span className="txt-lg">{transaction_details?.tnx_id}</span>
              <sup className="desc-span ucap">
                {transaction_details?.status}
              </sup>
            </h2>
          </div>

          <span className="pxy20">
            {page === "admin" && transaction_details?.status != "1" && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => launch_requery(transaction_details)}
              >
                <span className="flex inline-flex align-items-center">
                  <FontAwesome
                    name={`${loading ? "circle-notch" : "recycle"}`}
                    className={`${loading ? "fa-spin" : ""}`}
                  />
                  <span>{loading ? "Working..." : "Re Query"}</span>
                </span>
              </Button>
            )}
          </span>
        </div>
      </div>
      <Divider />

      <section className="pxy0">
        <List>
          <ListItem divider>
            <ListItemText>
              <div className="flex flex-row-resp">
                <div className="spacer coler">
                  <h3>Transaction ID</h3>
                  <h5>{transaction_details?.tnx_id}</h5>
                </div>

                <div className="spacer coler flex flex-col align-items-end">
                  <h3>Amount</h3>
                  <h5 className="ucap">{transaction_details?.amount}</h5>
                </div>
              </div>
            </ListItemText>
          </ListItem>

          <ListItem divider>
            <ListItemText>
              <div className="flex flex-row-resp">
                <div className="spacer coler">
                  <h3>Method</h3>
                  <span className="ucap badge badge-info">
                    {transaction_details?.payment_method}
                  </span>
                </div>

                <div className="spacer coler flex flex-col align-items-end">
                  <h3>Type</h3>
                  <h5>{transaction_details?.tnx_type}</h5>
                </div>
              </div>
            </ListItemText>
          </ListItem>

          <ListItem divider>
            <ListItemText>
              <div className="flex flex-row-resp">
                <div className="spacer coler">
                  <h3>Ordered Tokens</h3>
                  <h5>{transaction_details?.tokens}</h5>
                </div>

                <div className="spacer coler flex flex-col align-items-center">
                  <h3>Bonus tokens</h3>
                  <h5>{transaction_details?.affiliate_tokens}</h5>
                </div>

                <div className="spacer coler flex flex-col align-items-end">
                  <h3>Total Tokens</h3>
                  <h5>{transaction_details?.total_tokens}</h5>
                </div>
              </div>
            </ListItemText>
          </ListItem>
          <ListItem divider>
            <ListItemText>
              <div className="flex flex-row-resp">
                <div className="spacer coler">
                  <h3>Transaction Date</h3>
                  <h5>
                    {" "}
                    <i className="fas fa-clock"></i>
                    <DatePipe
                      value={new Date(transaction_details?.tnx_time).getTime()}
                    />
                  </h5>
                </div>

                <div className="spacer coler flex flex-col align-items-end">
                  <h3>Status</h3>
                  <Icon>
                    {transaction_details?.status === "pending" ? (
                      <PendingOutlined
                        sx={{ fontSize: "25px" }}
                        className={`color-pending`}
                      />
                    ) : transaction_details?.status === "approved" ? (
                      <CheckCircleOutlined
                        sx={{ fontSize: "25px" }}
                        className={`color-approved`}
                      />
                    ) : transaction_details?.status === "cancelled" ? (
                      <WarningOutlined
                        sx={{ fontSize: "25px" }}
                        className={`color-cancelled`}
                      />
                    ) : (
                      <CreditCard sx={{ fontSize: "25px" }} />
                    )}
                  </Icon>
                  <span className="px10"></span>
                </div>
              </div>
            </ListItemText>
          </ListItem>
        </List>
      </section>
      <CustomModal data={modal_data} />
    </React.Fragment>
  );
};

export default TransactionDetails;
