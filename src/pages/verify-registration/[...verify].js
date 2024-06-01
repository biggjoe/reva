import React, { useCallback } from "react";
import { Button, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import * as processHtml from "../../services/processHtml";
import HttpService from "../../services/HttpService";
import FontAwesome from "react-fontawesome";
import Link from "next/link";
import LoadingModal from "../../components/LoadingModal";
import useAuthService from "../../services/useAuthService";

export default function Home() {
  const router = useRouter();
  let AuthServ = useAuthService();
  const { decodeHtml } = processHtml;
  const isParam = router.query["verify"] ? true : false;
  const [id, setId] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [routes, setRoutes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [sent_confirm, setSentConfirm] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);
  const [code_confirmed, setCodeConfirmed] = React.useState(false);
  const modalClose = () => setModal({ ...modal_data, open: false });
  const [modal_data, setModal] = React.useState({
    open: false,
    onclose: modalClose,
  });
  React.useEffect(() => {
    if (id && token) {
      confirm_code(id, token);
    }
  }, [id, token]);

  React.useEffect(() => {
    console.log("router::", router.query);
    if (isParam) {
      const rts = router.query["verify"];
      setRoutes(rts);
      let idn = "";
      let tkn = "";
      if (rts) {
        if (rts.length == 0) {
          idn = null;
          tkn = null;
        } else if (rts.length == 1) {
          idn = rts[0];
          tkn = null;
        } else if (rts.length == 2) {
          idn = rts[0];
          tkn = rts[1];
        }
      }
      console.log("ID::", idn, "TOKEN::", tkn);
      setId(idn);
      setToken(tkn);
    }
  }, [router.query["verify"]]);

  const [user, setUser] = React.useState(null);
  const confirm_code = (id, token) => {
    setSentConfirm(false);
    setConfirming(true);
    setModal({
      ...modal_data,
      open: true,
      message: "Confirming details...",
      onclose: modalClose,
    });

    console.log("cd:", id, "tk:", token);
    HttpService.verifyRegistration({
      id: id,
      token: token,
    })
      .then(
        (response) => {
          let rsp = response;
          console.log("conf code ::::", rsp);
          if (rsp.status === 1) {
            console.log("conf code :::: is confirmed");
            setCodeConfirmed(true);
            console.log(code_confirmed);
            AuthServ.logout();
          } else {
          }
          setModal({
            ...modal_data,
            open: true,
            message: rsp.message,
            onclose: modalClose,
          });
        }, //resPonse ends//
        (error) => {
          setModal({
            ...modal_data,
            open: true,
            message: error.message,
            onclose: modalClose,
          });
        } //error ends//
      )
      .finally(() => {
        setSentConfirm(true);
        setConfirming(false);
      });
  };
  return (
    <React.Fragment>
      <section className="page-main">
        <div className="flex flex-col align-items-center">
          <div className="auth-logo-space">
            <Link className="logo" href="/">
              <img src={`/images/logo.png`} alt="Reva Logo" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col flex-column justify-content-center align-items-center py20 px10">
          <div className="login-pane">
            <div>
              <div className="page-info text-center">
                <h2>Verify Registration</h2>
              </div>
              <div className="form-cover">
                {code_confirmed && (
                  <>
                    <h2>Registration is confirmed</h2>
                  </>
                )}
              </div>
              {/** form-cover */}
            </div>
            <div className="pt20 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register">Create an account</Link>
            </div>
            <div className="pt10 pb20 text-center">
              Already registered? <Link href="/login">Log In</Link>
            </div>
          </div>
        </div>
      </section>

      <LoadingModal data={modal_data} />
    </React.Fragment>
  );
}
