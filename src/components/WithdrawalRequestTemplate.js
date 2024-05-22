import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  CheckCircleOutlined,
  CreditCard,
  PendingOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import DatePipe from "../pipes/DatePipe";
import Currency from "../pipes/Currency";

const WithdrawalRequestTemplate = (props) => {
  console.log(props);
  const qr_data = props;
  const { fetched, requests } = props;
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
                <ListItemIcon></ListItemIcon>
                <ListItemText>
                  <div className="flex flex-row-resp">
                    <div className="spacer coler boldest">
                      <h4>Amount</h4>
                    </div>
                    <div className="spacer coler  boldest flex flex-col align-items-center">
                      <h4>Requested On</h4>
                    </div>
                    <div className="spacer coler  boldest flex flex-col align-items-end">
                      <h4>Status</h4>
                    </div>
                  </div>
                </ListItemText>
              </ListItemButton>
            </ListItem>

            {requests.map((item, index) => (
              <ListItem disablePadding button key={item.id} divider={true}>
                <ListItemButton>
                  <ListItemIcon>
                    {item.status == "0" ? (
                      <PendingOutlined
                        sx={{ fontSize: "35px" }}
                        className={`color-pending`}
                      />
                    ) : item.status == "1" ? (
                      <CheckCircleOutlined
                        sx={{ fontSize: "35px" }}
                        className={`color-approved`}
                      />
                    ) : item.status == "-1" ? (
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
                      <div className="spacer coler boldest">
                        <h4 className=" boldest">
                          <Currency value={item.amount} />
                        </h4>
                      </div>
                      <div className="spacer coler  flex flex-col align-items-center">
                        <h4>
                          <DatePipe
                            full={true}
                            value={new Date(item.requested_on).getTime()}
                          />
                        </h4>
                      </div>
                      <div className="spacer coler flex flex-col align-items-end">
                        <h4>
                          <span
                            className={`ucap badge-${
                              item.status == "0"
                                ? "pending"
                                : item.status == "1"
                                ? "approved"
                                : item.status == "-1"
                                ? "cancelled"
                                : ""
                            } badge`}
                          >
                            {item.status == "0"
                              ? "pending"
                              : item.status == "1"
                              ? "approved"
                              : item.status == "-1"
                              ? "cancelled"
                              : ""}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </ListItemText>
                </ListItemButton>
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
          <h3 className="pxy20">Loading requests... </h3>
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(WithdrawalRequestTemplate);
