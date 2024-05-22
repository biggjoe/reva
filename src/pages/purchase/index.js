import React,{useCallback} from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BuyPanel from "../../components/BuyPanel";
import HttpService from "../../services/HttpService";

const Purchase = () => {
  const [affiliate_data, setAffiliateData] = React.useState({
    bonus_ran: false,
  });
  const [bonus, setBonus] = React.useState({});
  const [bonus_code, setBonusCode] = React.useState(null);
  const [bonused, setBonused] = React.useState(false);
  const [referee, setReferee] = React.useState({ ref_ran: false });
  const handleBonusInput = useCallback(
    (e) => {
      const name = e.target.name;
      const val = e.target.value;
      console.log("code:", val);
      setBonusCode(val);
    },
    []
  ); const [fetching_bonus, setFetchingBonus] = React.useState(false);
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

  return (
    <React.Fragment>
      <Header />
        <div className="flex py30 flex-col flex-column justify-content-center align-items-center py20 px10">
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
      <Footer />
    </React.Fragment>
  );
};

export default Purchase;
