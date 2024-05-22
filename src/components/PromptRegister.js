import React from "react";
import {
  Slide,
  Button,
  DialogContent,
  Card,
  Dialog,
  IconButton,
} from "@mui/material";
import { Add, ArrowRightOutlined, InfoOutlined } from "@mui/icons-material";

import CustomModal from "./CustomModal";
import useAuthService from "../services/useAuthService";
import HttpService from "../services/HttpService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PromptRegister = (props) => {
  const { button_text, return_url, mode, button_class } = props;
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
  const [load, setLoad] =
    React.useState <
    any >
    {
      user_regged: false,
      user_logged: false,
      event_booked: false,
      event_paid: false,
      event_details_sent: false,
    };

  const usr = useAuthService.getCurrentUser();

  console.log(usr);
  React.useEffect(() => {
    setLoading(true);
    useAuthService
      .checkSession()
      .then(
        (res) => {
          console.log("CHECK SESSIONS:: ", res);
          if (!res.status || res.status === 0) {
            setLoad({ ...load, user_regged: false, user_logged: false });
          } else {
            if (usr.is_verified === 0) {
              setLoad({ ...load, user_regged: true, user_logged: false });
              return launchVerify();
            }
            setLoad({ ...load, user_regged: true, user_logged: true });
          }
        },
        (error) => {
          setLoad({ ...load, user_regged: false, user_logged: false });
          console.log(error.message);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [launchVerify, load, usr.is_verified, setLoad]);

  const closeNoti = React.useCallback(() => {
    setNoti({
      ...noti,
      onopen: false,
    });
  }, [noti]);

  const [noti, setNoti] = React.useState({
    onopen: false,
    onclose: closeNoti,
    message: "",
  });
  const launchVerify = React.useCallback(() => {
    setNoti({
      ...noti,
      message: `Please open your email and 
      click on the verification link we sent during your registration `,
      onopen: true,
      onclose: closeNoti,
    });
  }, [closeNoti, noti]);

  const handleInputChange = () => {};

  const takeAction = () => {
    setLoaded(false);
    setLoading(true);
    const fac = !load.found_account ? "find_account" : "do_login";
    setLoad({ ...load, mode: fac });
    HttpService.findAccount(load)
      .then(
        (res) => {
          console.log(res);
          if (res.status === 1) {
            if (load.user_regged === false) {
              setLoad({ ...load, user_regged: true, user_logged: false });
            } else {
              setLoad({ ...load, user_logged: true });
            }
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setLoaded(true);
        setLoading(false);
      });
  };
  return (
    <React.Fragment>
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
        <DialogContent sx={{ p: "0", m: "0" }}>
          <section className="reg-modal-width">
            <Card sx={{ m: "0", p: "0" }}>
              <div className="card-header flex flex-row align-items-center">
                <span className="px10">
                  <i className="fas fa-calendar"></i>
                </span>
                <span className="spacer">EVENT REGISTRATION</span>
                <span className="px10">
                  <IconButton color="error" onClick={modal.onclose}>
                    <i className="fas fa-close"></i>
                  </IconButton>
                </span>
              </div>
              <div className="modal-items-container">
                <div className="py20">{JSON.stringify(load)}</div>

                {!load.user_logged && (
                  <div className={" input "}>
                    <label>Email</label>
                    <input
                      type="text"
                      className="input-form-control"
                      name="email"
                      disabled={loading}
                      onChange={(e) =>
                        setLoad({ ...load, email: e.target.value })
                      }
                      placeholder={"Enter your email"}
                    />
                  </div>
                )}
                {load.user_regged && !load.user_logged && (
                  <div className={" input "}>
                    <label>Enter your password</label>
                    <input
                      type="password"
                      className="input-form-control"
                      name="password"
                      disabled={loading}
                      onChange={(e) =>
                        setLoad({ ...load, password: e.target.value })
                      }
                      placeholder={"Enter your password"}
                    />
                  </div>
                )}

                <Button
                  disabled={loading || !load.email}
                  onClick={takeAction}
                  size="large"
                  color="primary"
                  variant="contained"
                >
                  {loading ? "Locating account..." : "NEXT"}{" "}
                  <ArrowRightOutlined />
                </Button>
              </div>
            </Card>
          </section>
        </DialogContent>
      </Dialog>
      <CustomModal data={noti} />
    </React.Fragment>
  );
};

export default React.memo(PromptRegister);
