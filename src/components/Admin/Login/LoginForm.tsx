import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
const LoginForm = ({
  submit_handler,
  loading,
  intro_message,
}: {
  submit_handler: any;
  loading: boolean;
  intro_message: string;
}) => {
  const [form, setForm] = React.useState<any>({ login_mode: "admin" });
  const handleInput = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  };
  const [user, setUser] = React.useState<any>(null);
  const [input_togged, setInputTog] = React.useState<any>(false);
  return (
    <React.Fragment>
      <div>
        {intro_message && intro_message !== "" && (
          <h2 className="text-center txt-lg px20 pb30">{intro_message}</h2>
        )}
        <h2 className="text-center txt-lg px20 pb30">Admin Login</h2>

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
            <i className="fas fa-user"></i>
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
            <i className="fas fa-lock"></i>
          </span>
          <span className="input-togger">
            <a onClick={() => setInputTog(!input_togged)}>
              <i
                className={`fas ${input_togged ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
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
            <Link to={"/forgot-password"}>Forgot password?</Link>
          </span>
        </div>
      </div>
      <div className="py20 text-center">
        Don&apos;t have an account? <Link to="/register">Create an account</Link>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
