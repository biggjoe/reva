import React, { useEffect, useState, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import ConnectWalletButton from "../../components/ConnectWalletButton";
import axios from "axios";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
  useBalance,
  useContractEvent,
} from "wagmi";
import { parseUnits, parseEther, formatEther, formatUnits,
  fetching_bonus,
  bonus_fetched } from "viem";
import presaleAbi from "../../abi/presale.json";
import { tokenAdd, contractAddr, chainId } from "../../config";
import FontAwesome from "react-fontawesome";
import { UserContext } from "../../services/UserContext";
import PromptLogin from "../PromptLogin";
import useAuthService from "../../services/useAuthService";
import BuyModal from "../BuyModal";
import HttpService from "../../services/HttpService";
import LoadingModal from "../LoadingModal";
import PayInvoice from "./PayInvoice";
import numberWithCommas from "../../pipes/Number";

export default function ManualPay(props) {
  const { affiliate_data, ref_data, set_aff, set_ref } = props;
  const [manualAmount, setManualAmount] = useState("");
  const [manualErrorMessage, setManualErrorMessage] = useState("");
  const AuthServ = useAuthService();
  const usd = AuthServ.getCurrentUser();
  const [user_loaded, setUserLoaded] = React.useState(false);
  const [user_data, setUser] = React.useState(usd);
  const [isLogged, setIsLogged] = React.useState(false);
  React.useEffect(() => {
    setIsLogged(AuthServ.isLogged());
    setUserLoaded(AuthServ.isLogged());
  }, [AuthServ, AuthServ.isLogged]);
  const [bonus_code, setBonusCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [show_code, setShowCode] = React.useState(false);
  const [show_init, setShowInit] = React.useState(false);
  const togAff = () => setShowCode(!show_code);
  const togOnce = () => setShowInit(!show_init);
  const tknd = affiliate_data ? affiliate_data : { bonus_ran: false };
  const [token_data, setTokenData] = React.useState(tknd);
  React.useEffect(() => {
    if (token_data.bonus_ran) {
      togOnce();
    }
  }, [token_data]);
  const closeBux = () => setBux({ ...bux_data, onopen: false });
  const [bux_data, setBux] = React.useState({
    onopen: false,
    onclose: closeBux,
  });
  const launchBuy = () =>
    setBux({ ...bux_data, onopen: true, onclose: closeBux });

  const closeInvoice = () => setInvoice({ ...invoice_data, onopen: false });
  const [invoice_data, setInvoice] = React.useState({
    onopen: false,
    onclose: closeInvoice,
  });

  const launchInvoice = () => {
    setInvoice({ ...invoice_data, onopen: true, onclose: closeInvoice });
    console.log(invoice_data);
  };
  const { address } = useAccount();

  const balanceManual = useBalance({
    address: address,
    chainId: chainId,
    enabled: !!address,
    watch: true,
  });

  const manualBalanceBig = new BigNumber(balanceManual.data?.formatted);
  const isValidManual = manualBalanceBig.gte(manualAmount);

  const { config } = usePrepareContractWrite({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "buyTokensWithBNB",
    value: [parseEther(manualAmount)],
    enabled: !!address && !!manualAmount && !!isValidManual,
    chainId: chainId,
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  const getAmount = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getTokenAmountBNB",
    args: [parseEther(manualAmount)],
    enabled: !!manualAmount,
    watch: true,
    chainId: chainId,
  });

  const getManualResult = new BigNumber(getAmount.data);
  const resx = isNaN(getManualResult)
    ? 0
    : new BigNumber(getManualResult)
        .dividedBy(new BigNumber(10).pow(18))
        .toFixed(3);

  const result = numberWithCommas(resx);

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        <div className="text-center py-2">
          Success! XRV Purchase Complete
          <div>
            <Link
              style={{ color: "#fff" }}
              href={`https://testnet.bscscan.com/tx/${data?.hash}`}
            >
              View On Bscscan
            </Link>
          </div>
        </div>
      );
      const timeout = setTimeout(() => {
        toast.dismiss();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, data?.hash]);

  useEffect(() => {
    if (isError) {
      toast.error(
        <div className="text-center py-2">Error! Something Went Wrong</div>
      );
      const timeout = setTimeout(() => {
        toast.dismiss();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isError]);

  const handlemanualAmountChange = useMemo(
    () => (event) => {
      const inputValue = event.target.value;
      const parsedAmount = Number(inputValue);

      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setManualErrorMessage("Amount must be greater than zero");
      } else if (balanceManual.data?.formatted < parsedAmount) {
        setManualErrorMessage("Insufficient balance.");
      } else {
        setManualErrorMessage("");
      }
      setManualAmount(inputValue);
    },
    [balanceManual.data?.formatted]
  );
  const [bepAddres, setBepAddress] = React.useState("");
  const handleBepAddressChange = useMemo((event) => {
    console.log(event);
    //const inputValue = event.target.value;
    //setBepAddress(inputValue);
  }, []);
  useEffect(() => {
    const handlePostRequest = async () => {
      try {
        if (isSuccess) {
          setLoadData({
            ...load_data,
            open: true,
            message: "Payment received. Processing...",
            onclose: closeLoader,
          });
          setTokenData({ ...token_data, total_tokens: result });
          const additionalData = {
            id: user_data?.id,
            tx_id: user_data?.txn_id,
            tx_hash: data?.hash,
            date_time: new Date().toUTCString(),
            tx_status: "success",
            user_address: address,
            payment_currency: "BNB",
            paid_amount: manualAmount,
            received_amount_in_token: result,
            affiliate_data: token_data,
          };

          const jsonData = JSON.stringify(additionalData);

          const response = await axios.post(
            "https://www.token.reva.finance/api/push_payment?secret=ZMpAShQwlOxzHYnJ97UkwLaW",
            jsonData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Server response:", response.data);
          setLoadData({
            ...load_data,
            open: false,
            message: response.data.message,
            onclose: closeLoader,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setLoadData({
          ...load_data,
          open: false,
          message: error.message,
          onclose: closeLoader,
        });
      }
    };
    handlePostRequest();
  }, [
    isSuccess,
    data?.hash,
    address,
    manualAmount,
    result,
    user_data?.id,
    token_data,
  ]);

  const [loaded, setLoaded] = React.useState(false);
  const [bonus, setBonus] = React.useState({});
  const [is_bonused, setBonused] = React.useState(false);
  const [isBonus, setIsBonus] = React.useState(false);
  const handleBonusInput = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setBonusCode(val);
  };

  const [token_list, setTokenList] = React.useState(null);

  const applyBonus = () => {
    console.log(bonus_code);
    if (!bonus_code || bonus_code == "") {
      return alert("Please enter bonus code");
    }
    setLoading(true);
    setLoaded(false);
    HttpService.fetchBonus(bonus_code)
      .then(
        (result) => {
          console.log("::|", result);
          if (result && result.status === 1 && result.bonus_found) {
            const det = result?.bonus_details;
            console.log(det);
            setBonused(true);
            setBonus(det);
            setTokenData({
              ...token_data,
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
            setTokenData({
              ...token_data,
              bonus_ran: true,
              is_bonus_applied: 0,
              bonus_found: result.bonus_found,
              is_bonus_active: false,
            });
          }
          localStorage.setItem("token_data", JSON.stringify(token_data));
        },
        (error) => {}
      )
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      }); //fetch
  }; //doAjax

  const removeBonus = () => {
    setBonused(false);
    setTokenData({});
    localStorage.setItem("token_data", JSON.stringify(null));
  };
  const closeLoader = () => setLoadData({ ...load_data, open: false });
  const [load_data, setLoadData] = React.useState({
    open: false,
    onclose: closeLoader,
  });

  const openLoader = () => {
    setLoadData({ ...load_data, open: true });
  };
  return (
    <React.Fragment>
      <div className="vstack gap-2">
        <div className="text-start">
          <div className="input   togger">
            <label>Amount In BNB</label>
            <input
              type="number"
              className="input-form-control buy-input no-scroll"
              placeholder={0}
              name="manualAmount"
              value={manualAmount}
              onChange={handlemanualAmountChange}
              step="any"
            />
            {/*  <span className="input-icon">
              <FontAwesome name={`qrcode`} />
            </span> */}
            <span className="input-togger flex flex-col color-black">
              <span className="txt-xxsm text-right"> Amount in $XRV</span>
              <span className="txt-xsm dixer text-right">{`$XRV ${
                result || `---`
              }`}</span>
            </span>
          </div>
          {manualErrorMessage && (
            <div className="text-center color-red">{manualErrorMessage}</div>
          )}
        </div>
        {/*   {manualAmount > 0 && (
          <div className="text-start">
            <div className="input mb10">
              <label>Amount In XRV</label>
              <input
                type="number"
                className="input-form-control buy-input"
                placeholder={result}
                disabled
                readOnly
              />
            </div>
          </div>
        )}
 */}
        {!show_init && !show_code && (
          <div className="text-center pb10">
            <button
              onClick={togAff}
              className={
                show_code
                  ? "button-link  aff-text color-red"
                  : "button-link aff-text"
              }
            >
              {show_code ? "Hide Code" : "Apply affiliate code"}
            </button>
          </div>
        )}
        {(show_init || show_code) && (
          <div className="text-start pt10">
            <div className="input iconed togger">
              <label>Affiliate Code</label>
              {token_data?.bonus_ran &&
                token_data.bonus_found === true &&
                token_data.is_bonus_active && (
                  <div className="input-form-control success-input-border">
                    <span className="color-success">
                      {`${token_data.percentage}%`} bonus to be applied
                    </span>
                  </div>
                )}
              {token_data?.bonus_ran &&
                token_data.bonus_found === true &&
                !token_data.is_bonus_active && (
                  <div className="input-form-control aff-border">
                    <span className="aff-color">Code is no longer active</span>
                  </div>
                )}

              {token_data?.bonus_ran && token_data.bonus_found === false && (
                <div className="input-form-control error-input-border">
                  <span className="color-error">Invalid Code</span>
                </div>
              )}
              {!token_data?.bonus_ran && (
                <input
                  type="text"
                  name="affiliate-code"
                  className="input-form-control aff-border"
                  placeholder="Enter Affiliate Code"
                  onChange={handleBonusInput}
                />
              )}
              <span className="input-icon">
                {token_data?.bonus_ran &&
                  token_data.bonus_found === true &&
                  token_data.is_bonus_active && (
                    <FontAwesome
                      name={`check-circle`}
                      style={{ fontSize: "30px" }}
                      className="color-success"
                    />
                  )}

                {token_data?.bonus_ran &&
                  token_data.bonus_found === true &&
                  !token_data.is_bonus_active && (
                    <FontAwesome
                      name={`info-circle`}
                      style={{ fontSize: "30px" }}
                      className="aff-color"
                    />
                  )}
                {token_data?.bonus_ran && token_data.bonus_found === false && (
                  <FontAwesome
                    name={`exclamation-triangle`}
                    className="color-red"
                  />
                )}
                {!token_data?.bonus_ran && <FontAwesome name={`code`} />}
              </span>
              {!token_data?.bonus_ran && (
                <button
                  className="aff-togger input-togger normal"
                  disabled={loading}
                  onClick={applyBonus}
                >
                  {loading && (
                    <span className="pr10">
                      <FontAwesome name="circle" />
                    </span>
                  )}
                  <span className="pl0">
                    {loading ? "applying..." : "Apply"}
                  </span>
                </button>
              )}

              {token_data?.bonus_ran && (
                <button
                  title="Remove Affiliate Bonus"
                  className="aff-togger input-togger remove"
                  disabled={loading}
                  onClick={() => {
                    removeBonus();
                    togAff();
                  }}
                >
                  <span className="pr0">
                    <FontAwesome name="trash" />
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="text-center">
          <div className="cover-div">
            <div
              className="btn-div"
              style={{ opacity: manualAmount > 0 ? "1" : "0.3" }}
            >
              <button
                onClick={() => launchInvoice()}
                disabled={manualAmount <= 0}
                className="buy_token_button"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>

        {!isLogged && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PromptLogin
              button_text="BUY TOKEN"
              button_class="buy_token_button"
              mode="custom"
              return_call={launchBuy}
              return_url="/"
              do_redirect={true}
            />
          </div>
        )}
      </div>
      {invoice_data?.onopen && <PayInvoice data={invoice_data} />}
      {invoice_data.bux_data && <BuyModal data={bux_data} />}
      <LoadingModal data={load_data} />
    </React.Fragment>
  );
}
