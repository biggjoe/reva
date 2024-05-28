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
  const isParam = router.query["index"] ? true : false;
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
    console.log("router_query::", router.query);
    if (isParam) {
      const rts = router.query["index"];
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
  }, [router.query["index"]]);

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

  const sendReset = () => {
    console.log(form);
    if (!form.new_password || form.re_password === "") {
      return alert("Please supply your new password");
    } else if (form.new_password !== form.re_password) {
      return alert("Passwords doesn't match");
    }
    const data = { ...form, mode: "index", old_password: "0123456" };
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
  const [input_togged, setInputTog] = React.useState(false);
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
                    <div className="input iconed mt20 togger">
                      <label>Password</label>
                      <input
                        type={input_togged ? "text" : "password"}
                        name="new_password"
                        disabled={loading}
                        className="input-form-control"
                        placeholder="Password"
                        onChange={handleInput}
                      />
                      <span className="input-icon">
                        <FontAwesome name="lock" />
                      </span>
                      <span className="input-togger">
                        <button
                          className="button-link"
                          onClick={() => setInputTog(!input_togged)}
                        >
                          <FontAwesome
                            name={`${input_togged ? "eye-slash" : "eye"}`}
                          />
                        </button>
                      </span>
                    </div>

                    <div className="input iconed togger">
                      <label>Confirm Password</label>
                      <input
                        type={input_togged ? "text" : "password"}
                        name="re_password"
                        disabled={loading}
                        className="input-form-control"
                        placeholder="Confirm Password"
                        onChange={handleInput}
                      />
                      <span className="input-icon">
                        <FontAwesome name="lock" />
                      </span>
                      <span className="input-togger">
                        <button
                          className="button-link"
                          onClick={() => setInputTog(!input_togged)}
                        >
                          <FontAwesome
                            name={`${input_togged ? "eye-slash" : "eye"}`}
                          />
                        </button>
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
