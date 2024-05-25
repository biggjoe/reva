import * as React from "react";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
 import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  CheckCircleOutlined,
  CreditCard,
  PendingOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import DatePipe from "../../../pipes/DatePipe";
import HttpService from "../../../services/HttpService";
import LogPay from "../../../components/LogPay";
import PlaceHolder from "../../PlaceHolder";
import { ListItemButton } from "@mui/material";

const TransactionList = (props) => {
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [isParam, setParam] = React.useState(false);
  const [transactions_fetched, setTransactionsFetched] = React.useState(false);
  const [token_symbol, setSymbol] = React.useState("usd");

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    setLoading(true);
    setLoaded(false);
    HttpService.fetchTransactions()
      .then(
        (result) => {
          console.log("trnx::|", result);
          if (result.status === 1) {
            setTransactions(result.transactions);
            setSymbol(result.token_symbol);
            setTransactionsFetched(true);
          }
        },
        (error) => {
          setTransactions([]);
        }
      )
      .finally(() => {
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
    setInvoice({ ...invoice_data,  onopen: true, onclose: closeInvoice });
    console.log(invoice_data);
  };

  return (
    <React.Fragment>
      

      
            <div className="page-head bg-grax">
              <div className="flex flex-row-resp align-items-center">
                <div className="inline-block pxy20 spacer">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Link href="/admin/dashboard">Dashboard</Link>
                    <Link href="/admin/transactions">Transactions</Link>
                  </Breadcrumbs>
                  <h2>All Transactions</h2>
                </div>

                 <span className="px20">
                <Button variant="outlined" size="small" onClick={launchInvoice}>
                  New
                </Button>
              </span>
              </div>
            </div>
      <Divider/>

  
      <>
        {transactions_fetched && (
          <>
            <List sx={{ p: "0" }}>
              <ListItem disablePadding button divider={true}>
                <ListItemButton>
                  <ListItemText>
                    <div className="flex flex-row-resp">
                      <div className="spacer coler boldest">
                        <h4>Tnx ID</h4>
                      </div>
                      <div className="spacer coler boldest flex flex-col align-items-center">
                        <h4>Total tokens</h4>
                      </div>
                      <div className="spacer coler boldest  flex flex-col align-items-center">
                        <h4>Amount</h4>
                      </div>
                      <div className="spacer coler boldest flex flex-col align-items-end">
                        <h4>Tnx Type</h4>
                      </div>
                    </div>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              {transactions.map((item, index) => (
                <ListItem
                  button
                  key={item.id}
                  divider={true}
                  component={Link}
                  href={`/admin/transactions/details/${item.tnx_id}`}
                >
                  <ListItemIcon>
                    {item.status === "pending" ? (
                      <PendingOutlined
                        sx={{ fontSize: "35px" }}
                        className={`color-pending`}
                      />
                    ) : item.status === "approved" ? (
                      <CheckCircleOutlined
                        sx={{ fontSize: "35px" }}
                        className={`color-approved`}
                      />
                    ) : item.status === "cancelled" ? (
                      <WarningOutlined
                        sx={{ fontSize: "35px" }}
                        className={`color-cancelled`}
                      />
                    ) : (
                      <CreditCard sx={{ fontSize: "35px" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    <div className="flex flex-row-resp">
                      <div className="spacer coler">
                        <h4 className=" boldest">{item.tnx_id}</h4>
                        <p className="">
                          <DatePipe
                            full={true}
                            value={new Date(item.tnx_time).getTime()}
                          />
                        </p>
                      </div>
                      <div className="spacer coler flex flex-col align-items-center">
                        <h4>{item.total_tokens}</h4>
                        <p>{token_symbol}</p>
                      </div>
                      <div className="spacer coler  flex flex-col align-items-center">
                        <h4>{item.amount}</h4>
                        <p className="ucap">USD{/* {item.currency} */}</p>
                      </div>
                      <div className="spacer coler flex flex-col align-items-end">
                        <h4>
                          <span className={`ucap badge-info badge`}>
                            {item.tnx_type}
                          </span>
                        </h4>
                        <p className="ucap">{item.payment_method}</p>
                      </div>
                    </div>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </>
        )}
        {loading && <PlaceHolder type="horizontal_list" />}
        {loaded && transactions.length === 0 && (
          <div className="pxy20">No Transactions found</div>
        )}
      </>

      
        <LogPay data={invoice_data}/>
    </React.Fragment>
  );
};

export default TransactionList;
