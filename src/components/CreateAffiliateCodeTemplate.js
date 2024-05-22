import React from "react";
import {
  Slide,
  Button,
  DialogActions,
  DialogContent,
  Dialog,
  Checkbox,
} from "@mui/material";
import HttpService from "../services/HttpService";
import * as processHtml from "../services/processHtml";
import CustomModal from "./CustomModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateAffiliateCodeTemplate = (props) => {
  const modal = props.data;
  const { decodeHtml } = processHtml;
  const [role, setRole] = React.useState(null);
  console.log(modal);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [data, setData] = React.useState({ bonus_code: "" });
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState({
    onopen: false,
    onclose: modalClose,
  });

  React.useEffect(() => {
    setRole(props.data.role);
  }, [props]);

  const submit_handler = () => {
    console.log(data);
    if (data.bonus_code === "" || !checked) {
      return alert("Please supply bonus code & Check certify your action");
    }
    setLoading(true);
    setLoaded(false);
    HttpService.createBonusCode(data)
      .then(
        (result) => {
          console.log("::|", result);
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
          if (result.user) {
            //setUser(result.user);
            modal.onclose();
          }
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const [checked, setChecked] = React.useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
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
            <h2>New Affiliate Bonus Code</h2>
            <div className="py10"></div>
            {!loading && (
              <div className="input iconed spacer pb0 pt10">
                <label>Bonus Code</label>
                <input
                  type="text"
                  name="bonus_code"
                  className="input-form-control"
                  placeholder="Bonus Code"
                  onChange={handleInput}
                />
                <span className="input-icon">
                  <i className="fas fa-code"></i>
                </span>
              </div>
            )}
            <div className="input-item pb10">
              {!loading && (
                <>
                  <label>
                    <span className="pr10">
                      <Checkbox
                        checked={checked}
                        onChange={handleCheck}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </span>
                    I certify that, I am creating this bonus code in order to
                    participate in the token distribution event(s) in the
                    capacity of an affiliate member and not as an agent or
                    representative of a third party corporate entity.
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
              <Button
                size="large"
                disabled={loading || data.bonus_code === "" || !checked}
                variant="contained"
                onClick={() => submit_handler()}
              >
                Submit
              </Button>

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

export default React.memo(CreateAffiliateCodeTemplate);
