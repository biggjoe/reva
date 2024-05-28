import React from "react";
import LoginModule from "../../Login/LoginModule";
import FontAwesome from "react-fontawesome";
import Link from "next/link";
const Login = () => {
  return (
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
          <LoginModule return_url="/admin/dashboard" do_redirect={true} />
        </div>
      </div>
    </section>
  );
};

export default Login;
