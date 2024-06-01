import React from "react";
import RegisterModule from "../../components/Register/RegisterModule";
import { Link } from "@mui/material";

const Home = () => {
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
            <RegisterModule />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
