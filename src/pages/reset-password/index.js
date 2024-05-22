import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import HttpService from "../../services/HttpService";
import CustomModal from "../../components/CustomModal";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";

const ResetPassword = () => {
  const router = useRouter();

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

        <div className="flex flex-col flex-column justify-content-center align-items-center py20">
          <div className="page-info text-center">
            <h2>Reset Password</h2>
          </div>

          <div className="login-pane">
            <div className={`pxy20  error-span text-center`}>
              <h3>Please provide a complete reset password link to continue</h3>
            </div>
          </div>
          <div className="py20 text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register">Register here</Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ResetPassword;
