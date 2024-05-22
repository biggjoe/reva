import React from "react";
import Button from "@mui/material/Button";
import HttpService from "../services/HttpService";
import CustomModal from "../components/CustomModal";
import Link from "next/link";
import Header from "../components/Header";

const ForgotPassword = () => {
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

  const [form, setForm] = React.useState({});
  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };

  const sendReset = (data) => {
    setForm({ ...form, mode: "forgot-password" });
    console.log(form);
    if (!form.email || form.email === "") {
      return alert("Please supply your email");
    }
    setLoading(true);
    setLoaded(false);
    HttpService.forgotReset(form)
      .then(
        (response) => {
          let rsp = response;
          modalClose();
          setModal({
            ...modal_data,
            onopen: true,
            onclose: modalClose,
            message: rsp.message,
          });
          console.log("::::", rsp);
        }, //resPonse ends//
        (error) => {
          setModal({
            ...modal_data,
            onopen: true,
            message: error.message,
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
      <Header />
      <section className="page-main">
        <section
          className="page-top bg-grax"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <div className="page-info">
            <h2>Forgot Password</h2>
          </div>
        </section>

        <div className="flex flex-col flex-column justify-content-center align-items-center py20">
          <div className="login-pane">
            <div className="input iconed">
              <label>Enter your registered email</label>
              <input
                type="text"
                name="email"
                disabled={loading}
                className="input-form-control"
                placeholder="Email"
                onChange={handleInput}
              />
              <span className="input-icon">
                <i className="fas fa-user"></i>
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
                {loading ? "Working..." : "Request Password Reset"}
              </Button>
            </div>
          </div>
          <div className="py20 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register">Register here</Link>
          </div>
        </div>

        <CustomModal data={modal_data} />
      </section>
    </React.Fragment>
  );
};

export default ForgotPassword;
