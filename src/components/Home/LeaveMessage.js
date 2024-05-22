import { Button } from "@mui/material";
import React from "react";
import HttpService from "../../services/HttpService";
import CustomModal from "../CustomModal";
import FontAwesome from "react-fontawesome";

const LeaveMessage = () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };
  const [user, setUser] = React.useState(null);
  const [input_togged, setInputTog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const closeToast = () => {
    setToast({ onopen: false });
  };
  const [toast, setToast] = React.useState({
    onopen: false,
    onclose: closeToast,
  });

  const handleSubmit = () => {
    console.log(form);
    if (form.name === "" || form.email === "" || form.message === "") {
      setToast({
        message: "Please supply all fields",
        onclose: closeToast,
        onopen: true,
        severity: "error",
      });
      return;
    }
    setLoading(true);
    setLoaded(false);
    setToast({
      onopen: true,
      onclose: closeToast,
      message: "<h3>Sending message...</h3>",
    });
    HttpService.contactMessage(form)
      .then(
        (resp) => {
          setToast({
            onopen: true,
            onclose: closeToast,
            message: resp.message,
          });
          if (resp.status == "1") {
            setForm({ message: "", name: "", email: "" });
            setTimeout(() => {
              setToast({
                onopen: false,
                onclose: closeToast,
              });
            }, 5000);
          }
        },
        (error) => {
          setToast({
            onopen: true,
            onclose: closeToast,
            severity: "error",
            message: error.message,
          });
        }
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  };
  return (
    <React.Fragment>
      {/*--Start service Area  --*/}
      <div className="blue-gray-area">
        <div className="container">
          <section className="pxy20">
            <div className="flex flex-row-resp pxy20">
              <div className="spacer">
                <div className=" spacer">
                  <div className="py20">
                    <h2>Great vision without greater people is irrelevant</h2>
                    <h3>Let&apos;s work together</h3>
                  </div>
                  <div className="input iconed">
                    <label>Fullname</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      className="input-form-control"
                      placeholder="Enter your full name"
                      onChange={handleInput}
                    />
                    <span className="input-icon">
                      <FontAwesome name={"user"} />
                    </span>
                  </div>
                  <div className="input iconed">
                    <label>Email Address</label>
                    <input
                      type="text"
                      name="email"
                      value={form.email}
                      className="input-form-control"
                      placeholder="Enter your email address"
                      onChange={handleInput}
                    />
                    <span className="input-icon">
                      <FontAwesome name={"envelope"} />
                    </span>
                  </div>
                  <div className="input">
                    <textarea
                      name="message"
                      value={form.message}
                      rows={5}
                      className="input-form-control"
                      placeholder="Write message..."
                      onChange={handleInput}
                    ></textarea>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    size="large"
                    disabled={loading}
                    variant="contained"
                    type="submit"
                  >
                    {loading ? "Working..." : "Submit"}
                  </Button>
                </div>
              </div>
              {/**Col ends */}

              <div className="contact-area spacer">
                <div className="inline-block">
                  <div className="parp">
                    <h3>Contact Us</h3>
                    <div className="blue-info">info@reva.finance</div>
                  </div>
                  <div className="parp">
                    <h3>Contact Us</h3>
                    <ul className="cont-list">
                      <li>
                        <a href="https://twitter.com/RevaFinanceHQ">
                          <FontAwesome name={"facebook"} />
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/RevaFinanceHQ">
                          <FontAwesome name={"twitter"} />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/revafinancehq/">
                          <FontAwesome name={"instagram"} />
                        </a>
                      </li>
                      <li>
                        <a href="t.me/revafinance">
                          <FontAwesome name={"telegram"} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CustomModal data={toast} />
    </React.Fragment>
  );
};

export default LeaveMessage;
