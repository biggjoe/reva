import React, { useEffect, useState, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import {
  useAccount,
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
  useBalance,
  useContractEvent,
} from "wagmi";
import { parseUnits, parseEther, formatEther, formatUnits } from "viem";
import presaleAbi from "../../abi/presale.json";
import { tokenAdd, contractAddr, chainId } from "../../config";
import PromptLogin from "../PromptLogin";
import useAuthService from "../../services/useAuthService";
import BuyModal from "../BuyModal";
import HttpService from "../../services/HttpService";
import LoadingModal from "../LoadingModal";
import AmountForm from "./AmountForm";
import AffiliatePane from "./AffiliatePane";
import ReferralPane from "./ReferralPane";
import numberWithCommas from "../../pipes/Number";
import PayInvoice from "./PayInvoice";
import { useRouter } from "next/router";

export default function BnbCurrency(props) {
  const {
    affiliate_data,
    set_aff,
    bonus_code,
    applyBonus,
    removeBonus,
    handleBonusInput,
    fetching_bonus,
    bonus_fetched,
  } = props;
  const router = useRouter();
  const [bnbAmount, setBnbAmount] = useState("");
  const [bnbErrorMessage, setBnbErrorMessage] = useState("");
  const AuthServ = useAuthService();
  const usd = AuthServ.getCurrentUser();
  const [user_loaded, setUserLoaded] = React.useState(false);
  const [user_data, setUser] = React.useState(usd);
  const [isLogged, setIsLogged] = React.useState(false);
  React.useEffect(() => {
    setIsLogged(AuthServ.isLogged());
    setUserLoaded(AuthServ.isLogged());
  }, [AuthServ, AuthServ.isLogged]);
  const tknd = affiliate_data ? affiliate_data : { bonus_ran: false };
  const [token_data, setTokenData] = React.useState(tknd);
  const closeBux = () => {
    setBux({ ...bux_data, onopen: false });
  };
  const [bux_data, setBux] = React.useState({
    onopen: false,
    onclose: closeBux,
  });

  const launchBuy = () => {
    setBux({ ...bux_data, onopen: true, onclose: closeBux });
  };

  const closeLoader = () => setLoadData({ ...load_data, open: false });
  const [load_data, setLoadData] = React.useState({
    open: false,
    onclose: closeLoader,
    hide_exit: true,
  });

  let doLoader = (state, message, mode = false) => {
    setLoadData({
      ...load_data,
      open: state,
      onclose: closeLoader,
      message: message,
      mode: mode,
    });
  };

  const openLoader = (message, hide) => {
    setLoadData({
      ...load_data,
      message: message,
      hide_exit: hide,
      open: true,
      onclose: closeLoader,
    });
  };
  const closeInvoice = () => setInvoice({ ...invoice_data, onopen: false });
  const [invoice_data, setInvoice] = React.useState({
    onopen: false,
    onclose: closeInvoice,
  });

  const { address } = useAccount();

  const balanceBnb = useBalance({
    address: address,
    chainId: chainId,
    enabled: !!address,
    watch: true,
  });

  const bnbBalanceBig = new BigNumber(balanceBnb.data?.formatted);
  const isValidBnb = bnbBalanceBig.gte(bnbAmount);

  const { config } = usePrepareContractWrite({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "buyTokensWithBNB",
    value: [parseEther(bnbAmount)],
    enabled: !!address && !!bnbAmount && !!isValidBnb,
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
    args: [parseEther(bnbAmount)],
    enabled: !!bnbAmount,
    watch: true,
    chainId: chainId,
  });

  const getResult = new BigNumber(getAmount.data);
  const resx = isNaN(getResult)
    ? 0
    : new BigNumber(getResult).dividedBy(new BigNumber(10).pow(18)).toFixed(3);

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

  let error_message = ``;

  useEffect(() => {
    if (isError) {
      toast.error(
        <div className="text-center py-2">Error! Something Went Wrong</div>
      );
      const timeout = setTimeout(() => {
        toast.dismiss();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isError]);

  const handlebnbAmountChange = useMemo(
    () => (event) => {
      const inputValue = event.target.value;
      const parsedAmount = Number(inputValue);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setBnbErrorMessage("Amount must be greater than zero");
      } else if (balanceBnb.data?.formatted < parsedAmount) {
        setBnbErrorMessage("Insufficient wallet balance.");
      } else {
        setBnbErrorMessage("");
      }
      setBnbAmount(inputValue);
    },
    [balanceBnb.data?.formatted]
  );

  useEffect(() => {
    if (isSuccess) {
      postPayment();
    }
  }, [isSuccess, data?.hash]);

  const postPayment = () => {
    setTokenData({ ...token_data, total_tokens: result });
    const additionalData = {
      id: user_data?.id,
      tx_id: user_data?.txn_id,
      tx_hash: data?.hash,
      date_time: new Date().toUTCString(),
      tx_status: "success",
      user_address: address,
      payment_currency: "BNB",
      paid_amount: bnbAmount,
      received_amount_in_token: result,
      affiliate_data: token_data,
    };
    toast.dismiss();
    toast.loading("Payment received. Processing token balance...");
    //openLoader("Payment received. Processing token balance...", true);
    const endpoint = "push_payment";
    const extraHeaders = { "Content-Type": "application/json" };
    console.log("additionalData::", additionalData);
    HttpService.postExtraHeader(endpoint, additionalData, extraHeaders)
      .then(
        (response) => {
          toast.dismiss();
          console.log("Server response:", response);
          if (response.status === 1) {
            toast.success(response.message);
            const jwt = response.new_jwt;
            localStorage.setItem("access_token", jwt);
            setTimeout(() => {
              router.push(`/account/transactions/details/${response.id}`);
            }, 5000);
          } else {
            toast.error(response.message);
          }
        },
        (error) => {
          console.error("Error:", error);
          toast.error(error.message);
        }
      )
      .finally(() => {
        closeLoader();
        const timeout = setTimeout(() => {
          toast.dismiss();
        }, 5000);
        return () => clearTimeout(timeout);
      });
  };

  const [is_bonused, setBonused] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [show_code, setShowCode] = React.useState(false);
  const [show_init, setShowInit] = React.useState(false);
  const togAff = () => setShowCode(!show_code);
  const togOnce = () => setShowInit(!show_init);

  const launchInvoice = () => {
    setInvoice({
      ...invoice_data,
      currency: "bnb",
      amount: bnbAmount,
      address: address,
      onopen: true,
      onclose: closeInvoice,
    });
    console.log(invoice_data);
  };
  return (
    <React.Fragment>
      <AmountForm
        handleCurrAmountChange={handlebnbAmountChange}
        curr={"bnb"}
        result={result}
        currAmount={bnbAmount}
        currErrorMessage={bnbErrorMessage}
      />

      {isLogged && (
        <>
          <AffiliatePane
            affiliate_data={affiliate_data}
            show_init={show_init}
            show_code={show_code}
            togAff={togAff}
            bonus_code={bonus_code}
            handleBonusInput={handleBonusInput}
            applyBonus={applyBonus}
            removeBonus={removeBonus}
            fetching_bonus={fetching_bonus}
            bonus_fetched={bonus_fetched}
          />
          <div className="text-center">
            {address ? (
              <div
                style={{
                  display: "flex flex-col",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <div className="spread">
                  <button
                    type="button"
                    className="buy_token_button"
                    disabled={!write || isLoading}
                    onClick={() => write()}
                  >
                    {isLoading ? "Buying..." : "Buy Now"}
                  </button>
                </div>
                <div className="spread pt20">
                  <button
                    onClick={() => launchInvoice()}
                    disabled={bnbAmount <= 0}
                    className=" button-link"
                  >
                    Use manual payment
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <div className="cover-div">
                    <div
                      className="btn-div"
                      style={{ opacity: bnbAmount > 0 ? "1" : "0.3" }}
                    >
                      <button
                        onClick={() => launchInvoice()}
                        disabled={bnbAmount <= 0}
                        className="buy_token_button"
                      >
                        CONTINUE
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

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
            return_url="/purchase"
            do_redirect={true}
          />
        </div>
      )}
      {invoice_data?.onopen && <PayInvoice data={invoice_data} />}
      {bux_data?.onopen && <BuyModal data={bux_data} />}
      {load_data?.open && <LoadingModal data={load_data} />}
    </React.Fragment>
  );
}
