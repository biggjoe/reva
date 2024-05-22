import * as React from "react";
import DatePipe from "../pipes/DatePipe";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  Add,
  CheckCircleOutlined,
  CreditCard,
  PendingOutlined,
  WarningOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

const BonusCodesTemplate = (props) => {
  console.log(props);
  const qr_data = props;
  const { fetched, fetching, codes, fnc, affiliate } = props;
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      {fetched && (
        <>
          <List sx={{ p: "0" }}>
            <ListItem disablePadding button divider>
              <ListItemButton>
                <ListItemIcon></ListItemIcon>
                <ListItemText>
                  <div className="flex flex-row-resp">
                    <div className="spacer coler boldest">
                      <h4>Code</h4>
                    </div>
                    <div className="spacer coler boldest flex flex-col align-items-center">
                      <h4>Bonus%</h4>
                    </div>
                    <div className="spacer coler boldest  flex flex-col align-items-center">
                      <h4>Created</h4>
                    </div>
                    <div className="spacer coler boldest flex flex-col align-items-end">
                      <h4>Status</h4>
                    </div>
                  </div>
                </ListItemText>
              </ListItemButton>
            </ListItem>

            {codes.map((item, index) => (
              <ListItem
                disablePadding
                button
                key={item.id}
                divider={true}
                component={Link}
                href={`/account/affiliate/code/${item.code}`}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {item.is_approved == "0" ? (
                      <PendingOutlined
                        sx={{ fontSize: "35px" }}
                        className={`color-pending`}
                      />
                    ) : item.is_approved == "1" ? (
                      <CheckCircleOutlined
                        sx={{ fontSize: "35px" }}
                        className={`color-approved`}
                      />
                    ) : item.is_approved == "-1" ? (
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
                        <h4 className=" boldest">{item.code}</h4>
                      </div>
                      <div className="spacer coler flex flex-col align-items-center">
                        <h4>{item.percentage}</h4>
                      </div>
                      <div className="spacer coler  flex flex-col align-items-center">
                        <h4>
                          <DatePipe
                            full={true}
                            value={new Date(item.created_at).getTime()}
                          />
                        </h4>
                      </div>
                      <div className="spacer coler flex flex-col align-items-end">
                        <h4>
                          <span
                            className={`ucap badge-${
                              item.is_approved == "0"
                                ? "pending"
                                : item.is_approved == "1"
                                ? "approved"
                                : item.is_approved == "-1"
                                ? "cancelled"
                                : ""
                            } badge`}
                          >
                            {item.is_approved == "0"
                              ? "pending"
                              : item.is_approved == "1"
                              ? "approved"
                              : item.is_approved == "-1"
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
          <h3 className="pxy20">Loading bonus codes </h3>
        </div>
      )}
      {fetched && affiliate && codes.length === 0 && (
        <div className="flex flex-col pxy30 align-items-center">
          <Button
            onClick={fnc}
            size="large"
            variant="contained"
            color="primary"
          >
            <Add />
            Create First Bonus Code
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default React.memo(BonusCodesTemplate);
