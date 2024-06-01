import React from "react";
import {
  Slide,
  DialogContent,
  Dialog,
  Divider,
  Collapse,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import FontAwesome from "react-fontawesome";
import HttpService from "../services/HttpService";
import Link from "next/link";
import CopyText from "../services/CopyText";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const LogPay = (props) => {
  const modal = props.data;
  console.log("invoice data:: ", modal);
  const contract_address = process.env.NEXT_PUBLIC_CONTRACT_LIVE_ADDRESS;
  const contract_network = process.env.NEXT_PUBLIC_CONTRACT_LIVE_NETWORK;

  const [fill_form, setFill] = React.useState(false);
  const toggleFill = () => setFill(!fill_form);

  const [sent, setSent] = React.useState({ status: 0, message: "", ran: 0 });
  const [pay, setPay] = React.useState({ currency: modal.currency, stage: 1 });
  const handleInput = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setPay({ ...pay, [name]: val });
    console.log(pay);
  };

  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const sendPay = () => {
    console.log(":::", pay);
    setLoading(true);
    setLoaded(false);
    setSent({ ...sent, ran: 0 });
    HttpService.logPayment(pay)
      .then(
        (res) => {
          console.log("result::", res);

          setSent({
            ...pay,
            status: res.status,
            message: res?.message,
            ran: 1,
          });
        },
        (error) => {
          console.log("error::", error);
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };

  const [is_togged, setTog] = React.useState(false);
  return (
    <React.Fragment>
      <Dialog
        fullScreen={false}
        TransitionComponent={Transition}
        open={modal.onopen}
        onClose={modal.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        <DialogContent sx={{ p: "0", m: "0" }}>
          <div className="login-pane px0 py0 max-100">
            <div
              className="flex align-items-center px10 py10"
              style={{ backgroundColor: "#ededed" }}
            >
              <FontAwesome name={`file`} style={{ fontSize: "20px" }} />
              <h3 className="py5 my0 pl10" style={{ color: "#444" }}>
                LOG PAYMENT
              </h3>
              <span className="spacer"></span>
              <button className="button-link" onClick={() => modal.onclose()}>
                <FontAwesome
                  name={`close`}
                  style={{ fontSize: "20px" }}
                  className="color-red"
                />
              </button>
            </div>
            <Divider />

            <div className="pxy20">
              <Paper sx={{ mb: "10px" }}>
                <ListItem divider onClick={() => setTog(!is_togged)}>
                  <ListItemText>
                    <div className="flex flex-row align-items-center">
                      <h3 className="mb0 spacer">
                        <FontAwesome
                          name={`info-circle`}
                          style={{ fontSize: "21px" }}
                          className="pr10"
                        />
                        Please Read Instruction
                      </h3>
                      <span className="pl10">
                        <FontAwesome
                          name={is_togged ? "chevron-up" : "chevron-down"}
                        />
                      </span>
                    </div>
                    <Collapse in={is_togged}>
                      <div className="pt10 break-word">
                        <p>
                          Please ensure to make a deposit of the right currency
                          and amount you selected on the purchase panel into our
                          presale address shown below before filling the form
                          below
                        </p>
                      </div>
                      <div className="flex flex-col spacer">
                        <span className="grayed txt-sm mb0">
                          PAYMENT ADDRESS
                        </span>
                        <CopyText text={contract_address} />
                      </div>
                    </Collapse>
                  </ListItemText>
                </ListItem>
              </Paper>
              {sent.ran === 1 && (
                <div
                  className={`input-form-control flex flex-col ${
                    sent.status === 1
                      ? "success-input-border"
                      : "error-input-border"
                  }`}
                >
                  <span
                    className={`text-center ${
                      sent.status === 1 ? "color-success" : "color-error"
                    }`}
                  >
                    {" "}
                    {sent.message}
                  </span>

                  <span className="spacer"></span>
                  <div className="text-center">
                    {sent.status === 0 && (
                      <button
                        className="button-link pt10"
                        onClick={() => {
                          toggleFill();
                          setSent({ ...sent, ran: 0 });
                        }}
                      >
                        Try again
                      </button>
                    )}
                    <button
                      className="button-link color-red pt10"
                      onClick={() => {
                        toggleFill();
                        setSent({ ...sent, ran: 0 });
                        modal.onclose();
                      }}
                    >
                      Exit
                    </button>
                  </div>
                </div>
              )}
              <div className="pt10">
                {sent.ran === 0 && (
                  <>
                    {" "}
                    <div className="flex flex-row align-items-center max-100 greo">
                      <div className="spacer  max-60">
                        <div className="input">
                          <label>Wallet address used</label>
                          <input
                            name="address"
                            disabled={loading || sent.status === 1}
                            onChange={handleInput}
                            placeholder="Enter wallet address used"
                            className="input-form-control buy-input"
                          />
                        </div>
                      </div>
                      <div className="spacer max-40">
                        <div className="input spacer pl10">
                          <label>$XRV Tokens </label>
                          <input
                            name="total_tokens"
                            disabled={loading || sent.status === 1}
                            onChange={handleInput}
                            placeholder="Enter tokens purchases"
                            className="input-form-control buy-input"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row align-items-center max-100 greo">
                      <div className="spacer  max-60">
                        <div className="input">
                          <label>Amount Paid</label>
                          <input
                            name="amount"
                            type="number"
                            disabled={loading || sent.status === 1}
                            onChange={handleInput}
                            placeholder="Enter exact amount paid"
                            className="input-form-control buy-input"
                          />
                        </div>
                      </div>
                      <div className="spacer max-40">
                        <div className="input spacer pl10">
                          <label>Currency</label>
                          <select
                            name="currency"
                            disabled={modal.currency}
                            defaultValue={modal.currency}
                            onChange={handleInput}
                            className="input-form-control buy-input"
                          >
                            <option value="bnb">BNB</option>
                            <option value="usdt">USDT</option>
                            <option value="usdc">USDC</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="py10 text-center">
                      <div className="badge inline-block badge-info">
                        Presale Stage: {pay.stage}
                      </div>
                    </div>
                    <div className="btn-div" style={{ opacity: 1 }}>
                      <button
                        onClick={sendPay}
                        disabled={loading || sent.status === 1}
                        className="buy_token_button"
                      >
                        {loading ? "Logging..." : "Submit Payment"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default React.memo(LogPay);
