import React, { useCallback } from "react";
import { Button, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import * as processHtml from "../../services/processHtml";
import HttpService from "../../services/HttpService";
import FontAwesome from "react-fontawesome";
import Link from "next/link";
import LoadingModal from "../../components/LoadingModal";
import useAuthService from "../../services/useAuthService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BuyPanel from "../../components/BuyPanel";

export default function Home() {
  const router = useRouter();
  let AuthServ = useAuthService();
  const { decodeHtml } = processHtml;
  const isParam = router.query["mode"] ? true : false;
  const [page, setPage] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [routes, setRoutes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [bonused, setBonused] = React.useState(false);
  const [bonus_code, setBonusCode] = React.useState(null);
  const [affiliate_data, setAffiliateData] = React.useState({
    bonus_ran: false,
  });
  const [bonus, setBonus] = React.useState({});
  const [referee, setReferee] = React.useState({ ref_ran: false });
  const modalClose = () => setModal({ ...modal_data, open: false });
  const [modal_data, setModal] = React.useState({
    open: false,
    onclose: modalClose,
  });
  React.useEffect(() => {
    if (page && token) {
      if (page === "ref") {
        fetchReferee(token);
      }
      if (page === "aff") {
        setBonusCode(token);
        if (bonus_code) {
          applyBonus();
        }
      }
    }
  }, [page, token]);

  React.useEffect(() => {
    console.log("router::", router.query);
    if (isParam) {
      const routes = router.query["mode"];
      let pgn = null;
      let tkn = null;
      if (routes) {
        if (routes.length == 0) {
          pgn = null;
          tkn = null;
        } else if (routes.length == 1) {
          pgn = routes[0];
          tkn = null;
        } else if (routes.length == 2) {
          pgn = routes[0];
          tkn = routes[1];
        }
      }
      console.log("mode::", pgn, "TOKEN::", tkn);
      setPage(pgn);
      setToken(tkn);
    }
  }, [router.query["mode"]]);

  const handleBonusInput = useCallback(
    (e) => {
      const name = e.target.name;
      const val = e.target.value;
      console.log("code:", val);
      setBonusCode(val);
    },
    [token]
  );

  const [fetching_bonus, setFetchingBonus] = React.useState(false);
  const [bonus_fetched, setBonusFetched] = React.useState(false);
  const applyBonus = () => {
    if (!bonus_code || bonus_code == "") {
      return alert("Please enter bonus code");
    }
    setFetchingBonus(true);
    setBonusFetched(false);
    console.log("sending bonus code...:", bonus_code);
    HttpService.fetchBonus(bonus_code)
      .then(
        (result) => {
          console.log("::|", result);
          if (result && result.status === 1 && result.bonus_found) {
            const det = result?.bonus_details;
            console.log(det);
            setBonused(true);
            setBonus(det);
            setAffiliateData({
              ...affiliate_data,
              bonus_ran: true,
              percentage: det.percentage,
              is_bonus_applied: det.is_bonus_active ? 1 : 0,
              bonus_found: result.bonus_found,
              is_bonus_active: det.is_bonus_active ? true : false,
              affiliate_code: det.affiliate_code,
              affiliate_bonus: det.percentage,
              affiliate_user: det.affiliate_user,
            });
          } else {
            setBonused(true);
            setAffiliateData({
              ...affiliate_data,
              bonus_ran: true,
              is_bonus_applied: 0,
              bonus_found: result.bonus_found,
              is_bonus_active: false,
            });
          }
          localStorage.setItem(
            "affiliate_data",
            JSON.stringify(affiliate_data)
          );
        },
        (error) => {}
      )
      .finally(() => {
        setFetchingBonus(false);
        setBonusFetched(true);
      }); //fetch
  }; //doAjax

  const removeBonus = () => {
    setBonused(false);
    setAffiliateData({});
    localStorage.setItem("affiliate_data", JSON.stringify(null));
  };


  const [fetching_referee,setFetchingReferee]=React.useState(false);
  const [referee_fetched,setRefereeFetched]=React.useState(false);
  const fetchReferee = (id) => {
    if (!id || id == "") {
      return alert("Referee code not found");
    }
    setFetchingReferee(true);
    setRefereeFetched(false);
    HttpService.fetchReferee(id)
      .then(
        (result) => {
          console.log("::|", result);
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
  const set_aff = (data) => {
    setAffiliateData({ ...affiliate_data, ...data });
  };
  const set_ref = (data) => {
    setReferee({ ...referee, ...Linkdata });
  };

  const regen_token = () => {
    AuthServ.regen_token().then((resp) => {
      console.log("regen_token", resp);
    });
  };
  return (
    <React.Fragment>
      <Header />
      <section className="page-main">
        <div className="flex flex-col py30 flex-column justify-content-center align-items-center py20 px10">
          
          <BuyPanel
            ref_data={referee}
            affiliate_data={affiliate_data}
            removeBonus={removeBonus}
            set_ref={set_ref}
            set_aff={set_aff}
            fetching_bonus={fetching_bonus}
            bonus_fetched={bonus_fetched}
            bonus_code={bonus_code}
            applyBonus={applyBonus}
            handleBonusInput={handleBonusInput}
            fetching_referee={fetching_referee}
            referee_fetched={referee_fetched}
          />
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
}
