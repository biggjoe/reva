import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Slide,
  Toolbar,
  AppBar,
  Divider,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  Dialog,
} from "@mui/material";
import HttpService from "../services/HttpService";
import CustomModal from "./CustomModal";
import FontAwesome from "react-fontawesome";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResendVerify = (props) => {
  console.log(props);
  const { modal } = props;
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  const [book, setBook] = React.useState({
    mode: "resend-verification-code",
    user: "",
  });

  const onToastClose = () => {
    setSnack({ onopen: false });
  };
  const [snack, setSnack] = React.useState({
    onopen: false,
    onclose: onToastClose,
    message: "",
  });

  React.useEffect(() => {
    if (modal.user) {
      setBook({ ...book, user: props.modal.user });
    }
  }, [props.modal, book, modal.user]);

  const handleSubmit = () => {
    if (book.user === "") {
      console.log("empty user");
      setSnack({
        onopen: true,
        severity: "error",
        onclose: onToastClose,
        message: "Please try again. Some details not supplied",
      });
      return;
    }

    console.log(book);
    setLoading(true);
    setLoaded(false);
    HttpService.resendVerify({ email: book.user })
      .then(
        (resp) => {
          console.log(resp);
          setSnack({
            ...snack,
            onopen: true,
            message: resp.message,
            onclose: onToastClose,
          });
          if (resp.status === 1) {
            setTimeout(() => {
              setSnack({ ...snack, onopen: false });
              modal.onclose();
            }, 5000);
          }
        },
        (error) => {
          setSnack({
            ...snack,
            onopen: true,
            message: error.message,
            onclose: onToastClose,
          });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //postTicket
  };

  return (
    <>
      <Dialog
        fullScreen={modal.fullwidth || false}
        maxWidth={modal.maxwidth || "400px"}
        TransitionComponent={Transition}
        open={modal.onopen}
        onClose={modal.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        <Toolbar
          sx={{
            flex: 1,
            alignItems: "center",
            p: "0 10px 0 20px !important",
            minHeight: "60px !important",
          }}
        >
          <div className="boldest txt-lg spacer"> Resend Verification Code</div>
          <IconButton color="error" onClick={modal.onclose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <DialogContent sx={{ p: "0", m: "0" }}>
          <section className="modal-width">
            <div className="px20 py10 flex flex-row-resp align-items-center">
              <span
                className="px10 info-font"
                style={{
                  fontSize: "40px",
                  color: "tomato",
                }}
              >
                <FontAwesome name="exclamation-triangle" className="fas fa" />
              </span>

              <div className="input spacer px20">
                Before proceeding, please check your email address for account
                verification link. <br />
                <br /> Please remember to check your spam box as well.
                <br /> If you did not receive the email, click the button below
                to resend.
              </div>
            </div>
          </section>
        </DialogContent>
        <Divider />
        <DialogActions>
          <span className="spacer"></span>
          <Button
            variant="contained"
            size="medium"
            disabled={loading}
            onClick={handleSubmit}
            color="primary"
          >
            {loading ? "Sending..." : "Resend Email"}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomModal data={snack} />
    </>
  );
};

export default React.memo(ResendVerify);
