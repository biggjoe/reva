import React from "react";
import {
  Slide,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
} from "@mui/material";
import HttpService from "../services/HttpService";
import * as processHtml from "../services/processHtml";
import CustomModal from "./CustomModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ApplyAffiliateTemplate = (props) => {
  const modal = props.data;
  const { decodeHtml } = processHtml;
  const [role, setRole] = React.useState(null);
  console.log(modal);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState({
    onopen: false,
    onclose: modalClose,
  });

  React.useEffect(() => {
    setRole(props.data.role);
  }, [props]);

  const apply_now = (mode) => {
    setLoading(true);
    setLoaded(false);
    HttpService.applyAffiliate({ mode: mode })
      .then(
        (result) => {
          console.log("applyAffiliateResult::|", result);
          const severity =
            result.status === 1
              ? "success"
              : result.status === 0
              ? "error"
              : "info";
          setModal({
            ...modal_data,
            onopen: true,
            message: result.message,
            severity: severity,
            onclose: modalClose,
          });
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const submitNew = () => {
    apply_now("new");
  };
  const reSubmit = () => {
    apply_now("resubmit");
  };

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
        <DialogContent sx={{ px: "30px", pt: "30px", pb: "30px" }}>
          <section className="form-step form-step1">
            <h2>Affiliate Program Application</h2>
            <div className="input-item pt10 pb10">
              {!loading && (
                <>
                  <label>
                    <span className="pr10">
                      <input
                        name="certification"
                        type="checkbox"
                        data-msg-required="Certify that you are individual."
                      />
                    </span>
                    I certify that, I am registering to participate in the token
                    distribution event(s) in the capacity of an individual (and
                    beneficial owner) and not as an agent or representative of a
                    third party corporate entity.
                  </label>
                </>
              )}
              {loading && (
                <>
                  <div className="flex flex-col pxy30 align-items-center">
                    <em className="fas large-loader fa-spin fa-circle-notch"></em>
                    <h3 className="pxy20">Working...</h3>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-row align-items-center">
              {role === "new" && (
                <Button
                  size="large"
                  disabled={loading}
                  variant="contained"
                  onClick={submitNew}
                >
                  Proceed to apply
                </Button>
              )}

              {role === "resubmit" && (
                <Button
                  size="large"
                  disabled={loading}
                  variant="contained"
                  onClick={reSubmit}
                >
                  Proceed to resubmit
                </Button>
              )}
              <span className="spacer"></span>
              <span className="px10">
                {!loading && (
                  <Button onClick={modal.onclose} color="warning">
                    Cancel
                  </Button>
                )}
              </span>
            </div>
          </section>
        </DialogContent>
      </Dialog>
      <CustomModal data={modal_data} />
    </React.Fragment>
  );
};

export default React.memo(ApplyAffiliateTemplate);
