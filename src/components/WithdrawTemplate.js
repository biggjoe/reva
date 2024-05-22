import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import HttpService from "../services/HttpService";
import * as processHtml from "../services/processHtml";
import CustomModal from "./CustomModal";
import useAuthService from "../services/useAuthService";
import Link from "next/link";

const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WithdrawTemplate = (props) => {
  const usr = useAuthService().getCurrentUser();
  const modal = props.data;
  const { decodeHtml } = processHtml;
  const [role, setRole] = React.useState(null);
  console.log(modal);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [data, setData] = React.useState(null);
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
    setLoading(true);
    setLoaded(false);
    HttpService.requestWithdraw(data)
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

  return (
    <React.Fragment>
      <Dialog
        fullScreen={false}
        TransitionComponent={TransitionUp}
        open={modal.onopen}
        onClose={modal.onclose}
        scroll={"paper"}
        aria-labelledby={"Me"}
      >
        <DialogContent sx={{ px: "30px", pt: "30px", pb: "2px" }}>
          <section className="form-step form-step1">
            {!loading && usr.walletNetwork && usr.walletAddress && (
              <h2>Withdraw Affiliate Earning</h2>
            )}
            <div className="py10"></div>

            {!loading && (
              <section>
                {usr.walletNetwork && usr.walletAddress && (
                  <>
                    <div className="sure-question">
                      All your remaining wallet balance will be paid into the
                      wallet address on your profile.
                    </div>

                    <div className="input-item pb20 px20">
                      <label>
                        <input
                          name="certification"
                          type="checkbox"
                          onChange={handleInput}
                          data-msg-required="Certify that you are individual."
                        />
                        I certify that, I am the one authorizing the withdrawal
                        of my affiliate earnings.
                      </label>
                    </div>

                    <div className="px20">
                      <Button
                        size="large"
                        disabled={loading}
                        variant="contained"
                        onClick={() => submit_handler()}
                      >
                        Submit Request
                      </Button>
                    </div>
                  </>
                )}
                {usr.walletNetwork !== "" && usr.walletAddress !== "" && (
                  <>
                    <div className="sure-question text-center">
                      Please go to profile settings and update your wallet
                      address before requesting for withdrawal
                      <div className="pxy10">
                        <Link href="/account/profile">
                          Edit Profile <i className="fas fa-arrow-right"></i>{" "}
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </section>
            )}
            {loading && (
              <section>
                <div className="flex flex-col pxy30 align-items-center">
                  <em className="fas large-loader fa-spin fa-circle-notch"></em>
                  <h3 className="pxy20">Working...</h3>
                </div>
              </section>
            )}
          </section>
        </DialogContent>

        <DialogActions sx={{ py: "20px", px: "30px" }}>
          {!loading && (
            <Button onClick={modal.onclose} color="warning">
              Cancel
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <CustomModal data={modal_data} />
    </React.Fragment>
  );
};

export default React.memo(WithdrawTemplate);
