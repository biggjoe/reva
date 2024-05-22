import React from "react";
import Button from "@mui/material/Button";
import Link from "next/link";

import FontAwesome from "react-fontawesome";

const LoginForm = ({ submit_handler, loading, intro_message }) => {
  const [form, setForm] = React.useState({});
  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };
  const [user, setUser] = React.useState(null);
  const [input_togged, setInputTog] = React.useState(false);
  return (
    <React.Fragment>
      <div>
        {intro_message && intro_message !== "" && (
          <h2 className="text-center txt-lg px20 pb30">{intro_message}</h2>
        )}

        <div className="input iconed">
          <label>Email</label>
          <input
            type="text"
            name="login"
            className="input-form-control"
            placeholder="Email"
            onChange={handleInput}
          />
          <span className="input-icon">
            <FontAwesome name={`user-circle`} />
          </span>
        </div>
        <div className="input iconed togger">
          <label>Password</label>
          <input
            type={input_togged ? "text" : "password"}
            name="password"
            className="input-form-control"
            placeholder="Enter password"
            onChange={handleInput}
          />
          <span className="input-icon">
            <FontAwesome name={`lock`} />
          </span>
          <span className="input-togger">
            <a onClick={() => setInputTog(!input_togged)}>
              <FontAwesome name={`${input_togged ? "eye-slash" : "eye"}`} />
            </a>
          </span>
        </div>
        <div className="flex flex-row align-items-center">
          <Button
            onClick={() => submit_handler(form)}
            size="large"
            disabled={loading}
            variant="contained"
            type="submit"
          >
            {loading ? "Working..." : "Login"}
          </Button>
          <span className="spacer"></span>
          <span className="pl5">
            <Link href={"/forgot-password"}>Forgot password?</Link>
          </span>
        </div>
      </div>
      <div className="py20 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register">Create an account</Link>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
