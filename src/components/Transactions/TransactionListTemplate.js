import * as React from "react";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  CheckCircleOutlined,
  Circle,
  CreditCard,
  PendingOutlined,
  Square,
  WarningOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import DatePipe from "../../pipes/DatePipe";
import HttpService from "../../services/HttpService";
import LogPay from "../LogPay";
import PlaceHolder from "../PlaceHolder";
import { ListItemButton } from "@mui/material";

const TransactionListTemplate = (props) => {
  const { page, transactions, loaded, loading, token_symbol } = props;

  return (
    <React.Fragment>
      <ListItem disablePadding button divider={true}>
        <ListItemButton>
          <ListItemIcon>
            <Circle sx={{ fontSize: "35px", color: "#ddd" }} />
          </ListItemIcon>

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
      {loaded && transactions && (
        <>
          {transactions.map((item, index) => (
            <ListItem
              button
              key={item.id}
              divider={true}
              component={Link}
              href={`/${page}/transactions/details/${item.tnx_id}`}
            >
              <ListItemIcon>
                {item.status === "0" ? (
                  <PendingOutlined
                    sx={{ fontSize: "35px" }}
                    className={`color-pending`}
                  />
                ) : item.status === "1" ? (
                  <CheckCircleOutlined
                    sx={{ fontSize: "35px" }}
                    className={`color-success`}
                  />
                ) : item.status === "-1" ? (
                  <WarningOutlined
                    sx={{ fontSize: "35px" }}
                    className={`color-red`}
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
                    <p className="ucap">{item.currency}</p>
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
        </>
      )}

      {loading && (
        <div className="px10">
          <PlaceHolder type="list" />
          <Divider />
          <PlaceHolder type="list" />
          <Divider />
          <PlaceHolder type="list" />
          <Divider />
          <PlaceHolder type="list" />
          <Divider />
          <PlaceHolder type="list" />
        </div>
      )}
      {loaded && transactions?.length === 0 && (
        <div className="pxy20">No Transactions found</div>
      )}
    </React.Fragment>
  );
};

export default TransactionListTemplate;
