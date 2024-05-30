import * as React from "react";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import HttpService from "../../../services/HttpService";
import LogPay from "../../LogPay";
import TransactionListTemplate from "../../Transactions/TransactionListTemplate";

const TransactionList = (props) => {
  const { page } = props;
  const [transactions, setTransactions] = React.useState([]);
  const [temp_transactions, setTempTransactions] = React.useState([]);
  const [cancelled_transactions, setCancelledTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [isParam, setParam] = React.useState(false);
  const [transactions_fetched, setTransactionsFetched] = React.useState(false);
  const [token_symbol, setSymbol] = React.useState("usd");

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (page) {
      const Fetch =
        page === "admin"
          ? HttpService.fetchAdminTransactions()
          : HttpService.fetchTransactions();

      fetchTransactions(Fetch);
    }
  }, [page]);

  const fetchTransactions = (Fetch) => {
    setLoading(true);
    setLoaded(false);
    Fetch.then(
      (result) => {
        console.log("trnx::|", result);
        if (result.status === 1) {
          setTransactions(result.transactions);
          setTempTransactions(result.temp);
          setCancelledTransactions(result.cancelled);
          setSymbol(result.token_symbol);
          setTransactionsFetched(true);
        }
      },
      (error) => {
        setTransactions([]);
      }
    ).finally(() => {
      setLoading(false);
      setLoaded(true);
    }); //fetch
  }; //doAjax

  const closeInvoice = () => setInvoice({ ...invoice_data, onopen: false });
  const [invoice_data, setInvoice] = React.useState({
    onopen: false,
    onclose: closeInvoice,
  });

  const launchInvoice = () => {
    setInvoice({ ...invoice_data, onopen: true, onclose: closeInvoice });
    console.log(invoice_data);
  };
  const navas = [
    { link: "list", title: "Transactions" },
    { link: "pending", title: "Pending" },
    { link: "cancelled", title: "Cancelled" },
  ];
  const [path, setPath] = React.useState(navas[0]);

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
              <span>Transactions</span>
            </Breadcrumbs>
            <h2>{path.title}</h2>
          </div>

          <span className="pxy20">
            <Button variant="outlined" size="small" onClick={launchInvoice}>
              Log Payment
            </Button>
          </span>
        </div>
      </div>
      <Divider />
      <ul className="flat-nav border-bottom">
        {navas.map((item, index) => (
          <li key={item.link}>
            <button
              className={
                path.link === item.link ? "button-link active" : "button-link"
              }
              onClick={() => setPath(item)}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>

      {path && path.link === "list" && (
        <TransactionListTemplate
          page="admin"
          transactions={transactions}
          loaded={loaded}
          loading={loading}
          token_symbol={token_symbol}
        />
      )}

      {path && path.link === "pending" && (
        <TransactionListTemplate
          page="admin"
          loaded={loaded}
          loading={loading}
          token_symbol={token_symbol}
          transactions={temp_transactions}
        />
      )}
      {path && path.link === "cancelled" && (
        <TransactionListTemplate
          page="admin"
          loaded={loaded}
          loading={loading}
          token_symbol={token_symbol}
          transactions={cancelled_transactions}
        />
      )}

      <LogPay data={invoice_data} />
    </React.Fragment>
  );
};

export default TransactionList;
