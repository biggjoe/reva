import React from "react";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";

const RegisterForm = ({ submit_handler, loading, intro_message }) => {
  const [form, setForm] = React.useState({ agree: false });
  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
    console.log(form);
  };
  const [user, setUser] = React.useState(null);
  const Lnk = () => {
    return (
      <div>
        Agree to our <a href="/terms"> Terms & conditions</a>
      </div>
    );
  };
  const handleChange = (event) => {
    console.log(event.target.checked);
    const vals = event.target.checked;
    setForm({ ...form, agree: vals });
  };
  return (
    <React.Fragment>
      <div>
        {intro_message && intro_message !== "" && (
          <h2 className="text-center txt-lg px20 pb30">{intro_message}</h2>
        )}

        <div className="pb10  pt0">
          <div className="input">
            <label>{"Full name"}</label>
            <input
              className={" input-form-control "}
              name={"name"}
              type="text"
              required
              placeholder="Full name"
              onChange={handleInput}
            />
          </div>

          <div className="input">
            <label>
              {"Email"}
              <sup className="boldest red" title="This field is required!">
                *
              </sup>
            </label>
            <input
              className={" input-form-control "}
              name={"email"}
              type="text"
              required
              placeholder="Email Address"
              onChange={handleInput}
            />
          </div>

          <div className="input">
            <label>
              {"Password"}
              <sup className="boldest red" title="This field is required!">
                *
              </sup>
            </label>
            <input
              className={" input-form-control "}
              name={"password"}
              type="password"
              required
              placeholder="Password"
              onChange={handleInput}
            />
          </div>

          <div className="input">
            <label>
              {"Confirm Password"}
              <sup className="boldest red" title="This field is required!">
                *
              </sup>
            </label>
            <input
              className={" input-form-control "}
              name={"password_confirmation"}
              type="password"
              required
              placeholder="Confirm Password"
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="pb20">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.agree}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={<Lnk />}
            />
          </FormGroup>

          {/*  <label>
            <input
              type={"checkbox"}
              onClick={handleInput}
              name="agree"
              defaultChecked={false}
              style={{ fontSize: "1.5rem", padding: "10px" }}
            />{" "}
            Agree to our
            <a href="/terms"> Terms & conditions</a>
          </label> */}
        </div>
        <div className="flex flex-row align-items-center">
          <Button
            onClick={() => submit_handler(form)}
            size="large"
            disabled={loading}
            variant="contained"
            type="submit"
          >
            {loading ? "Working..." : "Register"}
          </Button>
          <span className="spacer"></span>
          <span className="pl5">
            <Link href={"/forgot-password"}>Forgot password?</Link>
          </span>
        </div>
      </div>
      <div className="pt20 pb0 text-center">
        Already an have account? <Link href="/login">Login here</Link>
      </div>
    </React.Fragment>
  );
};

export default RegisterForm;
