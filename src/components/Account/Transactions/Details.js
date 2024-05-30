import React from "react";
import Link from "next/link";
import HttpService from "../../../services/HttpService";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import * as processHtml from "../../../services/processHtml";
import useAuthService from "../../../services/useAuthService";
import CustomModal from "../../CustomModal";
import FontAwesome from "react-fontawesome";
import TransactionDetailsTemplate from "../../Transactions/TransactionDetailsTemplate";

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

  const approve_payment = (action) => {
    setLoading(true);
    setLoaded(false);
    console.log("action::", action);
    let load = { id: transaction_details.id, action: action };
    HttpService.processPayment(load)
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
            {page === "admin" && (
              <Button
                disabled={loading}
                variant="outlined"
                color={
                  transaction_details?.status == "0" ? "primary" : "warning"
                }
                size="small"
                onClick={() =>
                  approve_payment(
                    `${
                      transaction_details?.status == "0"
                        ? "approve_pay"
                        : "cancel_pay"
                    }`
                  )
                }
              >
                <span className="flex inline-flex align-items-center">
                  {!loading ? (
                    <FontAwesome
                      name={`${
                        transaction_details?.status == "0" ? "check" : "ban"
                      }`}
                      className={`${loading ? "pr5 fa-spin" : "pr5 "}`}
                    />
                  ) : (
                    <FontAwesome name={`circle`} className="fa-spin pr5" />
                  )}
                  <span>
                    {transaction_details?.status == "0" ? "Approve" : "Cancel"}
                  </span>
                </span>
              </Button>
            )}
          </span>
        </div>
      </div>
      <Divider />

      <section className="pxy0">
        <TransactionDetailsTemplate
          page="account"
          transaction_details={transaction_details}
          loaded={loaded}
          loading={loading}
        />
      </section>
      <CustomModal data={modal_data} />
    </React.Fragment>
  );
};

export default TransactionDetails;
