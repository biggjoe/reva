import React from "react";
import { useRouter } from "next/router";
import RegisterForm from "./RegisterForm";
import HttpService from "../../services/HttpService";
import CustomModal from "../CustomModal";

const RegisterModule = (props) => {
  const { referee, intro_message, return_url } = props;
  const router = useRouter();
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [response_text, setResponseText] = React.useState("");
  const modalClose = () => setModal({ ...modal_data, onopen: false });
  const [modal_data, setModal] = React.useState({
    onopen: false,
    onclose: modalClose,
  });
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createMarkup = (text) => {
    return { __html: text };
  };

  const doRegister = (data) => {
    setLoading(true);
    setLoaded(false);
    setDisabled(true);
    console.log(data);
    setModal({
      ...modal_data,
      onopen: true,
      onclose: modalClose,
      message: "creating account....",
    });
    data.mode = "register";
    if (referee && referee?.ref_ran) {
      data.ref_data = referee;
    }

    console.log(referee);
    console.log(data);
    HttpService.registerUser(data)
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
          const fmx =
            rsp.status === 1
              ? rsp.message + `<br/> You are now being redirected to login page`
              : rsp.message;
          setModal({
            ...modal_data,
            onopen: true,
            message: fmx,
            severity: severity,
            onclose: modalClose,
          });
          if (response.status === 1) {
            const next_url = return_url ? return_url : "/login";
            //const redir_delay = rsp.status === 1 ? 1000 : 6000;
            setTimeout(() => {
              console.log("Redirecting now...");
              //window.location.href = next_url;
              router.push(next_url);
              setModal({ ...modal_data, onopen: false, onclose: modalClose });
              return;
            }, 6000);
          }
        },
        (error) => {
          console.log(error);
          setModal({
            ...modal_data,
            onopen: true,
            message: error.message,
            severity: "error",
            onclose: modalClose,
          });
        }
      )
      .finally(() => {
        setLoaded(true);
        setLoading(false);
        setDisabled(false);
      });
  }; ///reg
  const items = {
    submit_handler: doRegister,
    intro_message: intro_message,
    loading: loading,
  };

  return (
    <React.Fragment>
      <RegisterForm {...items} /> <CustomModal data={modal_data} />
    </React.Fragment>
  );
};

export default RegisterModule;
