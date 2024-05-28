import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useAuthService from "../services/useAuthService";
import Collapse from "@mui/material/Collapse";
import Settings from "@mui/icons-material/Settings";
import Dashboard from "@mui/icons-material/Dashboard";
import DesktopHeaderNav from "./DesktopHeaderNav";

import FontAwesome from "react-fontawesome";
import { Slide } from "@mui/material";

const Header = (props) => {
  const { bottom_border } = props;
  const [isTogged, setIsTogged] = React.useState(false);
  const page = "";
  const AuthServ = useAuthService();
  const usr = AuthServ.getCurrentUser();
  const [isLogged, setIsLogged] = React.useState(false);
  React.useEffect(() => {
    setIsLogged(AuthServ.isLogged());
  }, [AuthServ]);

  const closeNav = () => {
    setNavData({ ...nav_data, onopen: false });
  };
  const [nav_data, setNavData] = React.useState({
    ononpen: false,
    onclose: closeNav,
    isLogged: isLogged,
  });

  const doLogout = () => {
    AuthServ.logout().then(() => {
      console.log("Session Cleared...");
      setIsLogged(false);
      return;
    });
  };

  const toggleNav = useCallback(() => {
    setNavData({
      ...nav_data,
      isLogged: isLogged,
      onopen: true,
      onclose: closeNav,
    });
    setIsTogged((cur) => !cur);
  }, [nav_data, closeNav, isLogged]);

  const doBoth = () => {
    doLogout();
    toggleNav();
  };

  const showMobileNav = isTogged ? true : false;
  const pages = [
    { path: "/account/dashboard", component: "Dashboard", icon: <Dashboard /> },
    {
      path: "/account/settings",
      component: "Account Settings",
      icon: <Settings />,
    },
  ];

  const [search, setSearch] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    if (loaded) {
      setProperties([]);
    }
  }, [loaded]);

  return (
    <React.Fragment>
     
      <div
        className={bottom_border ? `main-header border-bottom` : `main-header`}
      >
        <div className="header-container">
          <span className="header-logo">
            <Link href="/">
              <img src="/images/logo.png" alt="Reva Finance Logo" />
            </Link>
          </span>
          <span className="spacer"></span>
          <DesktopHeaderNav isLogged={isLogged} doLogout={doLogout} />
          <span className="mobile-ham">
            <button onClick={toggleNav} className="menu-btn">
              <FontAwesome name={`${!isTogged ? "bars" : "chevron-up"}`} />
            </button>
          </span>
        </div>
        <div className={`mobile-nav-container ${isTogged ? "auto-height":"zero-height"}`}>
          <Slide in={isTogged}>
            <ul className="mobile-nav-list">
              <li>
                <Link onClick={toggleNav} href="/">
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link onClick={toggleNav} href="/purchase">
                 Buy XRV Tokens
                </Link>
              </li>
              <li>
                <Link onClick={toggleNav} href="./#company">
                  The Company
                </Link>
              </li>
              <li>
                <Link onClick={toggleNav} href="./#features">
                  Products
                </Link>
              </li>
              <li>
                <Link onClick={toggleNav} href="./#learn">
                  Learn
                </Link>
              </li>
              <li>
                <Link onClick={toggleNav} href="./#tokenomics">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link onClick={toggleNav} href="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link onClick={toggleNav} href="/whitepaper">
                  Whitepaper
                </Link>
              </li>
              {!isLogged && (
                <li>
                  <Link onClick={toggleNav} href="/login">
                    <i className="bi bi-arrow-right-circle"></i> Log in
                  </Link>
                </li>
              )}
              {isLogged && (
                <>
                  <li>
                    <Link
                      className="dashboard"
                      onClick={toggleNav}
                      href="/account/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"./#"}
                      className="logout"
                      onClick={() => doBoth()}
                    >
                      Log Out
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </Slide>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Header);
