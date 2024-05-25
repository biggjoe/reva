import React from "react";
import Link from "next/link";
import LoginModule from "../../../components/Login/LoginModule";

const Login = () => {
  return (<React.Fragment>
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
            <LoginModule />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
