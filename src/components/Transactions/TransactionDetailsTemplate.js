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
import numberWithCommas from "../../pipes/Number";

const TransactionDetailsTemplate = ({
  page,
  transaction_details,
  loaded,
  loading,
}) => {
  const { decodeHtml, truncateWord } = processHtml;
  const usr = useAuthService().getCurrentUser();

  return (
    <React.Fragment>
      <List>
        <ListItem divider>
          <ListItemText>
            <div className="flex flex-row-resp">
              <div className="spacer coler">
                <h3>Transaction ID</h3>
                <h5>{transaction_details?.tnx_id}</h5>
              </div>
              <div className="spacer coler flex flex-col align-items-center">
                <h3>Method</h3>
                <span className="ucap badge badge-info">
                  {transaction_details?.payment_method}
                </span>
              </div>
              <div className="spacer coler flex flex-col align-items-end">
                <h3>Amount</h3>
                <h5 className="ucap">
                  <span className="ucap">{transaction_details?.currency}</span>{" "}
                  {numberWithCommas(transaction_details?.amount)}
                </h5>
              </div>
            </div>
          </ListItemText>
        </ListItem>

        <ListItem divider>
          <ListItemText>
            <div className="flex flex-row-resp">
              <div className="spacer coler">
                <h3>Wallet Address</h3>
                <h4 className="px0">{transaction_details?.wallet_address}</h4>
              </div>

              <div className="spacer coler flex flex-col align-items-end">
                <h3>Currency</h3>
                <h5 className="ucap">{transaction_details?.currency}</h5>
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
        <ListItem>
          <ListItemText>
            <div className="flex flex-row-resp">
              <div className="spacer coler">
                <h3>Transaction Date</h3>
                <h5>
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
    </React.Fragment>
  );
};

export default TransactionDetailsTemplate;
