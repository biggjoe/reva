import React, { useCallback } from "react";
import { Button, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import * as processHtml from "../../services/processHtml";
import HttpService from "../../services/HttpService";
import FontAwesome from "react-fontawesome";
import Link from "next/link";
import LoadingModal from "../../components/LoadingModal";

export default function Home() {
  const router = useRouter();

  const { decodeHtml } = processHtml;
  const isParam = router.query["reset-password"] ? true : false;
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
      const routes = router.query["reset-password"];
      let idn = "";
      let tkn = "";
      if (routes) {
        if (routes.length == 0) {
          idn = null;
          tkn = null;
        } else if (routes.length == 1) {
          idn = routes[0];
          tkn = null;
        } else if (routes.length == 2) {
          idn = routes[0];
          tkn = routes[1];
        }
      }
      console.log("ID::", idn, "TOKEN::", tkn);
      setId(idn);
      setToken(tkn);
    }
  }, [router.query["reset-password"]]);

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
    HttpService.confirmPasswordReset({
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
            setForm({ ...form, user: rsp.user });
            console.log(code_confirmed);

            setModal({
              ...modal_data,
              open: false,
              onclose: modalClose,
            });
          } else {
            setModal({
              ...modal_data,
              open: true,
              message: rsp.message,
              onclose: modalClose,
            });
          }
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
  /* 
  const [page_data, setPageData] = React.useState({});
  const return_page = (data) => {
    setPageData({ ...data, mode: mode });
  }; */

  const [form, setForm] = React.useState({});
  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
    console.log(form);
  };
  const [input_togged, setInputTog] = React.useState(false);

  const sendReset = () => {
    console.log(form);
    if (!form.new_password || form.re_password === "") {
      return alert("Please supply your new password");
    } else if (form.new_password !== form.re_password) {
      return alert("Passwords doesn't match");
    }
    const data = { ...form, mode: "reset", old_password: "0123456" };
    console.log("Form::", data);
    setLoading(true);
    setLoaded(false);
    HttpService.changePassword(data)
      .then(
        (response) => {
          let rsp = response;
          modalClose();
          const severity =
            rsp.status === 1 ? "success" : rsp.status === 0 ? "error" : "info";

          setModal({
            ...modal_data,
            onopen: true,
            onclose: modalClose,
            severity: severity,
            message: rsp.message,
          });
          console.log("::::", rsp);
        }, //resPonse ends//
        (error) => {
          setModal({
            ...modal_data,
            onopen: true,
            message: error.message,
            severity: "error",
            onclose: modalClose,
          });
        } //error ends//
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
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
                <h2>Reset Password</h2>
              </div>
              <div className="form-cover">
                {code_confirmed && (
                  <>
                    <div className="input iconed mt20">
                      <label>Password</label>
                      <input
                        type="password"
                        name="new_password"
                        disabled={loading}
                        className="input-form-control"
                        placeholder="Password"
                        onChange={handleInput}
                      />
                      <span className="input-icon">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>

                    <div className="input iconed">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="re_password"
                        disabled={loading}
                        className="input-form-control"
                        placeholder="Confirm Password"
                        onChange={handleInput}
                      />
                      <span className="input-icon">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    <div className="flex flex-row align-items-center">
                      <Button
                        onClick={sendReset}
                        size="large"
                        disabled={loading}
                        variant="contained"
                        type="submit"
                        fullWidth
                      >
                        {loading ? "Working..." : "Change Password"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
              {/** form-cover */}
            </div>
            <div className="py20 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register">Create an account</Link>
            </div>
          </div>
        </div>
      </section>

      <LoadingModal data={modal_data} />
    </React.Fragment>
  );
}
