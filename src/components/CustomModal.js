import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import DatePipe from "../pipes/DatePipe";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomModal(props) {
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
      >
        <Toolbar
          sx={{ p: "0 10px 0 20px !important", minHeight: "60px !important" }}
        >
          <IconButton edge="start" color="inherit" aria-label="close">
            <InfoOutlined />
          </IconButton>
          <Typography sx={{ ml: "0px", flex: 1 }} variant="h6" component="div">
            {modal.title || "Info"}
          </Typography>
        </Toolbar>
        <DialogContent sx={{ p: "0 20px 20px 20px", m: "0" }}>
          <section className="modal-width">
            {modal.message && (
              <Alert severity={severity}>
                <div dangerouslySetInnerHTML={createMarkup(modal.message)} />
              </Alert>
            )}
            {modal.date && (
              <p className="date-span px10 flex flex-row">
                <span className="spacer"></span>
                <span>
                  <DatePipe value={modal.date} />
                </span>
              </p>
            )}
            {modal.formatted_message && (
              <div
                dangerouslySetInnerHTML={createMarkup(modal.formatted_message)}
              />
            )}
          </section>
        </DialogContent>

        <DialogActions sx={{ display: "flex", padding: "0 20px" }}>
          <Button onClick={modal.onclose} color="warning">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
