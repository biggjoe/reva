import React from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import BuyPanel from "./BuyPanel";

const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BuyModal(props) {
  const modal = props.data;
  const severity = modal.severity ? modal.severity : "info";
  const hider = modal.hideduration ? modal.hideduration : 3000;
  setTimeout(() => {
    //modal.onclose();
  }, hider);
  const tmx = new Date().getTime();
  const createMarkup = (text) => {
    return { __html: text };
  };
  const handleClose = () => {
    modal.onclose();
  };
  return (
    <>
      <Dialog
        open={modal.onopen}
        aria-labelledby={"Me"}
        id={"md-" + tmx}
        TransitionComponent={TransitionUp}
        sx={{ backgroundColor: "transparent" }}
      >
        <div className="pb10" style={{ backgroundColor: "transparent" }}>
          <BuyPanel />
        </div>

        <DialogActions sx={{ display: "flex", padding: "0 20px" }}>
          <Button onClick={modal.onclose} color="warning">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
