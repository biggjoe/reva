import React from "react";
import RegisterModule from "../../components/Register/RegisterModule";

import * as processHtml from "../../services/processHtml";
import Link from "next/link";
import useAuthService from "../../services/useAuthService";
import { useRouter } from "next/router";
import HttpService from "../../services/HttpService";
import ReferralPane from "../../components/Currency/ReferralPane";
import { LinearProgress } from "@mui/material";

const Register = () => {
  const router = useRouter();
  let AuthServ = useAuthService();
  const { decodeHtml } = processHtml;
  const isParam = router.query["r"] ? true : false;
  const [r, setR] = React.useState(null);
  const [code, setCode] = React.useState(null);
  const [routes, setRoutes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [bonus, setBonus] = React.useState({});
  const [referee, setReferee] = React.useState({ ref_ran: false });
  const modalClose = () => setModal({ ...modal_data, open: false });
  const [modal_data, setModal] = React.useState({
    open: false,
    onclose: modalClose,
  });
  React.useEffect(() => {
    if (r && code) {
      fetchReferee(code);
    }
  }, [r, code]);

  React.useEffect(() => {
    console.log("router::", router.query);
    if (isParam) {
      const routes = router.query["r"];
      let pgn = null;
      let tkn = null;
      if (routes) {
        if (routes.length == 0) {
          pgn = null;
          tkn = null;
          setRefereeFetched(true);
        } else if (routes.length == 1) {
          pgn = routes[0];
          tkn = null;
          setRefereeFetched(true);
        } else if (routes.length == 2) {
          pgn = routes[0];
          tkn = routes[1];
        }
      }
      console.log("r::", pgn, "TOKEN::", tkn);
      setR(pgn);
      setCode(tkn);
    }
  }, [router.query["r"]]);
  const [fetching_referee, setFetchingReferee] = React.useState(false);
  const [referee_fetched, setRefereeFetched] = React.useState(false);
  const fetchReferee = (id) => {
    if (!id || id == "") {
      return alert("Referee code not found");
    }
    setFetchingReferee(true);
    setRefereeFetched(false);
    HttpService.fetchReferee(id)
      .then(
        (result) => {
          console.log("referee::|", result);
          if (result && result.status === 1) {
            setReferee({
              ...referee,
              ...result.user,
              ref_ran: true,
              ref_found: true,
            });
          } else {
            setReferee({ ref_ran: true, ref_found: false });
          }
        },
        (error) => {}
      )
      .finally(() => {
        setFetchingReferee(false);
        setRefereeFetched(true);
      }); //fetch
  }; //doAjax

  const set_ref = (data) => {
    setReferee({ ...referee, ...data });
  };
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
            {referee && referee?.ref_ran && referee_fetched && (
              <ReferralPane
                ref_data={referee}
                set_ref={set_ref}
                fetching_referee={fetching_referee}
                referee_fetched={referee_fetched}
              />
            )}
            {referee?.ref_ran && referee_fetched && (
              <RegisterModule referee={referee} />
            )}
            {fetching_referee && (
              <div className="flex flex-col">
                <LinearProgress />
                <div className="text-center py20">Loading referrer data...</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Register;
