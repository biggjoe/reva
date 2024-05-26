import React from "react";
import LoginForm from "./LoginForm";
import HttpService from "../../../services/HttpService";
import CustomModal from "../../CustomModal";
import ResendVerify from "../../ResendVerify";

const LoginModule = (props) => {
  const { intro_message, return_url } = props;
  console.log(window);
  const [loading, setLoading] = React.useState < boolean > false;
  const [loaded, setLoaded] = React.useState < boolean > false;
  const [response_text, setResponseText] = React.useState < string > "";
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] =
    React.useState <
    any >
    {
      onopen: false,
      onclose: modalClose,
    };
  const verifyClose = () => {
    setVerify({ ...verify_data, onpen: false });
  };

  const [verify_data, setVerify] =
    React.useState <
    any >
    {
      onopen: false,
      onclose: verifyClose,
    };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const doLogin = (data) => {
    data.action = "doLogin";
    console.log(data);
    setLoading(true);
    setLoaded(false);
    setResponseText("Loging in....");
    modalClose();
    setModal({
      ...modal_data,
      onopen: true,
      onclose: modalClose,
      message: "Loging in....",
    });
    //HttpService.postForm("login", data)
    HttpService.loginUser(data)
      .then(
        (response) => {
          let rsp = response;
          console.log("::::", rsp);
          const severity =
            rsp.status === 1
              ? "success"
              : rsp.status === 0
              ? "error"
              : rsp.status === 44
              ? "error"
              : "info";
          setModal({
            ...modal_data,
            onopen: true,
            message: rsp.message,
            severity: severity,
            onclose: modalClose,
          });
          if (
            (response.jwt &&
              // response.expireAt &&
              response.status === 1 &&
              response.isFound === 1) ||
            response.status === 44
          ) {
            let jwt = rsp.jwt;
            let usr = JSON.stringify(rsp.user);
            localStorage.setItem("user", usr);
            localStorage.setItem("access_token", jwt);
            setResponseText(rsp.message);
            const next_url = return_url ? return_url : "/admin/dashboard";
            const redir_delay = response.status === 1 ? 2000 : 3000;
            setTimeout(() => {
              console.log("Redirecting now...");
              window.location.href = next_url;
              setModal({ ...modal_data, onopen: false, onclose: modalClose });
              return;
            }, redir_delay);
          } else if (response.status === 0 && response.isFound === 1) {
            setResponseText(response.message);
          } else if (
            response.email_verified_at === 0 &&
            response.to_verify === 1
          ) {
            setVerify({
              ...verify_data,
              user: rsp.user.email,
              onopen: true,
              onclose: verifyClose,
            });
          } else if (response.status === 0 && response.isFound === 0) {
            setResponseText(response.message);
          } else {
            setResponseText(response.message);
          }
        }, //resPonse ends//
        (error) => {
          console.log("Error:: ", error);
          setResponseText(error.message);
          setModal({
            ...modal_data,
            onopen: true,
            message: error.message,
            severity: "error",
            onclose: modalClose,
          });
          setTimeout(() => {
            modalClose();
          }, 7000);
        } //error ends//
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };
  const items = {
    submit_handler: doLogin,
    intro_message: intro_message,
    loading: loading,
  };

  return (
    <React.Fragment>
      <LoginForm {...items} /> <CustomModal data={modal_data} />
      <ResendVerify modal={verify_data} />
    </React.Fragment>
  );
};

export default LoginModule;
