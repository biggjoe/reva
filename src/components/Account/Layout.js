import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import useAuthService from "../../services/useAuthService";
import HttpService from "../../services/HttpService";
import { useRouter } from "next/router";
import AccountHeader from "./AccountHeader";
import AccountSidePanel from "./AccountSidePanel";
import Link from "next/link";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Layout({ children }) {
  console.log("Layout page Renders");
  let router = useRouter();
  const [redirect, setRedirect] = React.useState(false);
  const [user_logged, setUserLogged] = React.useState(false);
  const [to_verify, setToVerify] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [resending, setResending] = React.useState(false);
  const [loading_text, setLoadingText] = React.useState(
    "Please enter the verification code sent your phone or email"
  );
  const [verify_data, setVerifyData] = React.useState({});
  let AuthServ = useAuthService();
  const usr = AuthServ.getCurrentUser();
  React.useEffect(() => {
    HttpService.checkSession().then(
      (res) => {
        console.log("r::", res);
        return;
         if (!res.status || res.status === 0) {
          AuthServ.logout();
          setRedirect(true);
          router.push("/login");
        } else {
          if (usr.is_verified === 0) {
            setToVerify(true);
            setVerifyData({ ...verify_data, user: usr.email });
          } else {
            setUserLogged(true);
          }
        }  /**/
      },
      (error) => {
        console.log(error.message);
        AuthServ.logout();
        router.push("/login");
      }
    );
  }, []);

  const handleInput = (e) => {
    const target = e.target;
    setVerifyData({ ...verify_data, [e.target.name]: e.target.value });
  };
  const handleVerify = () => {
    setLoading(true);
    setLoadingText("Verifying Account...");
    setLoaded(false);
    console.log(verify_data);
    const load = verify_data;
    load.action = "doVerify";
    HttpService.postForm("verify-account", load).then(
      (res) => {
        console.log(res);
        setLoaded(true);
        setLoading(false);
        setLoadingText(res.message);
        if (res.status === 1) {
          let rsp = res;
          let jwt = rsp.jwt;
          let expire_at = rsp.expireAt;
          let usr = JSON.stringify(rsp.user);
          localStorage.setItem("user", usr);
          localStorage.setItem("access_token", jwt);
          localStorage.setItem("expire_at", expire_at);
          setTimeout(() => {
            console.log("Redirecting...");
            const next_url = "/account/dashboard";
            router.push(next_url);
            return;
          }, 3000);
        }
      },
      (error) => {
        setLoaded(true);
        setLoading(false);
        setLoadingText(error.message);
      }
    );
  };

  const resendCode = (e) => {
    e.preventDefault();
    setResending(true);
    setLoadingText("Resending verification code...");
    setLoaded(false);
    const load = verify_data;
    load.action = "resendToken";
    HttpService.postForm("resend-token", load).then(
      (res) => {
        console.log(res);
        setLoadingText(res.message);
        setLoaded(true);
        setTimeout(() => {
          setResending(false);
          setLoadingText("Enter Verification Code");
        }, 3000);
      },
      (error) => {
        console.log(error);
        setResending(false);
        setLoaded(true);
        setLoadingText(error.message);
      }
    );
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const doLogout = () => {
    useAuthService.logout().then(() => {
      setTimeout(() => {
        console.log("Session Cleared...");
        window.location.href = "/";
        return;
      }, 1);
    });
  };

  const [path, setPath] = React.useState("dashboard");

  const navas = [
    { path: "dashboard", title: "Dashboard" },
    { path: "purchase", title: "Buy Token" },
    { path: "affiliate", title: "Affiliate" },
    { path: "transactions", title: "Transactions" },
    { path: "profile", title: "Profile" },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1 1",
        width: "100%",
        minHeight: "100vh",
        padding: "0 !important",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CssBaseline />
      <AccountHeader
        open={open}
        toggleDrawer={toggleDrawer}
        DrawerHeader={DrawerHeader}
        doLogout={doLogout}
        usr={usr}
      />
      <AccountSidePanel
        onopen={open}
        onclose={handleDrawerClose}
        DrawerHeader={DrawerHeader}
        doLogout={doLogout}
      />
      <main style={{ width: "100%", height: "100%" }}>
        <DrawerHeader />
        {children}
      </main>
    </Box>
  );
}
