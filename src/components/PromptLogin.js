import React from "react";
import {
  Slide,
  Divider,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
} from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Add from "@mui/icons-material/Add";
import LoginModule from "./Login/LoginModule";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PromptLogin = (props) => {
  const {
    button_text,
    return_url,
    return_call,
    do_redirect,
    mode,
    button_class,
  } = props;
  const closeModal = () => {
    setModal({ ...modal, onopen: false });
  };

  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [modal, setModal] = React.useState({
    onopen: false,
    onclose: closeModal,
    title: "User Login",
  });
  const launchModal = () => {
    setModal({ ...modal, onopen: true, onclose: closeModal });
  };
  return (
    <>
      {mode === "large_button" ? (
        <Button
          disabled={loading}
          onClick={launchModal}
          variant="contained"
          color="warning"
          size="large"
          fullWidth
        >
          <Add /> {loading ? "Working..." : button_text}
        </Button>
      ) : mode === "custom" ? (
        <button
          disabled={loading}
          onClick={launchModal}
          className={button_class}
        >
          <i className="fas fa-plus"></i> {loading ? "Working..." : button_text}
        </button>
      ) : (
        <a onClick={launchModal}>
          <i className="fas fa-plus"></i>{" "}
          {loading ? " Working..." : button_text}
        </a>
      )}

      <Dialog
        fullScreen={false}
        TransitionComponent={Transition}
        open={modal.onopen}
        onClose={modal.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        <div className="flex flex-row align-items-center px20 pt10">
          <InfoOutlined />

          <h2 className="pt20 pb0 pl10">Login to continue</h2>
        </div>
        <DialogContent>
          <section>
            <LoginModule
              return_call={return_call}
              return_url={return_url}
              do_redirect={do_redirect}
            />
          </section>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={modal.onclose} color="warning">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(PromptLogin);
