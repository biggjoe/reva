import * as React from "react";
import DatePipe from "../pipes/DatePipe";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  CheckCircleOutlined,
  CreditCard,
  PendingOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { ListItemButton } from "@mui/material";

const TransactionsTemplate = (props) => {
  console.log(props);
  const { fetched, transactions, token_symbol } = props;
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      {fetched && (
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
                href={`/account/transactions/${item.tnx_id}`}
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
      {/*
       */}
      {!fetched && (
        <div className="flex flex-col pxy30 align-items-center">
          <em className="fas large-loader fa-spin fa-circle-notch"></em>
          <h3 className="pxy20">Loading transactions </h3>
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(TransactionsTemplate);
