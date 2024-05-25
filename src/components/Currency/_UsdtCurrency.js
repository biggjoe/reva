import React, { useEffect, useState, useCallback } from "react";
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
} from "wagmi";
import { parseUnits, formatUnits, formatEther } from "viem";

import presaleAbi from "../../abi/presale.json";
import erc20Abi from "../../abi/erc20.json";
import { tokenAdd, tokenUsdtAdd, contractAddr, chainId } from "../../config";
import PromptLogin from "../PromptLogin";
import useAuthService from "../../services/useAuthService";
import BuyModal from "../BuyModal";

import FontAwesome from "react-fontawesome";
import HttpService from "../../services/HttpService";
import AmountForm from "./AmountForm";
import AffiliatePane from "./AffiliatePane";
import ReferralPane from "./ReferralPane";
import numberWithCommas from "../../pipes/Number";
import LoadingModal from "../LoadingModal";
import PayInvoice from "./PayInvoice";
import { TramOutlined } from "@mui/icons-material";

export default function UsdtCurrency(props) {
  const {
    affiliate_data,
    ref_data,
    set_aff,
    set_ref,
    bonus_code,
    applyBonus,
    removeBonus,
    handleBonusInput,
            fetching_bonus,
            bonus_fetched,
            fetching_referee,
            referee_fetched
  } = props;
  const [usdtAmount, setUsdtAmount] = useState("");
  const [usdtErrorMessage, setUsdtErrorMessage] = useState("");
  const [allowance, setAllowance] = useState(new BigNumber(0));

  const [show_code, setShowCode] = React.useState(false);
  const [show_init, setShowInit] = React.useState(false);
  const togAff = () => setShowCode(!show_code);
  const togOnce = () => setShowInit(!show_init);
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
  });

 let doLoader = (state,message,mode=false) => {
    setLoadData({ ...load_data, open: state,
      onclose: closeLoader,message:message,mode:mode });
  };

  const closeInvoice = () => setInvoice({ ...invoice_data, onopen: false });
  const [invoice_data, setInvoice] = React.useState({
    onopen: false,
    onclose: closeInvoice,
  });

  const { address } = useAccount();

  const balanceUsdt = useBalance({
    address: address,
    token: tokenUsdtAdd,
    chainId: chainId,
    enabled: !!address,
    watch: true,
  });

  const usdtBalanceBig = new BigNumber(balanceUsdt.data?.formatted);
  const isValidUsdt = usdtBalanceBig.gte(usdtAmount);

  const { config: approveConfig } = usePrepareContractWrite({
    address: tokenUsdtAdd,
    abi: erc20Abi,
    functionName: "approve",
    args: [contractAddr, parseUnits(usdtAmount, 18)],
    enabled: !!address && !!usdtAmount && !!isValidUsdt,
    chainId: chainId,
  });

  const { data: approveData, write: approveWrite } =
    useContractWrite(approveConfig);

  const {
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
    isError: approveIsError,
  } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  const allowanceUsdtGet = useContractRead({
    address: tokenUsdtAdd,
    abi: erc20Abi,
    functionName: "allowance",
    enabled: !!address,
    args: [address, contractAddr],
    watch: true,
    chainId: chainId,
  });

  useEffect(() => {
    if (allowanceUsdtGet.data !== undefined) {
      const allowanceValue = new BigNumber(allowanceUsdtGet.data);
      setAllowance(allowanceValue);
    }
  }, [address, allowanceUsdtGet.data]);

  const { config } = usePrepareContractWrite({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "buyTokensWithUSDT",
    args: [parseUnits(usdtAmount, 18)],
    enabled: !!address && !!usdtAmount && !!allowance.gt(0) && !!isValidUsdt,
    chainId: chainId,
  });

  const { data: purchaseData, write: purchaseWrite } = useContractWrite(config);

  const {
    isLoading: purchaseIsLoading,
    isSuccess: purchaseIsSuccess,
    isError: purchaseIsError,
  } = useWaitForTransaction({
    hash: purchaseData?.hash,
  });

  const getAmount = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getTokenAmountUSDT",
    args: [parseUnits(usdtAmount, 18)],
    enabled: !!usdtAmount,
    watch: true,
    chainId: chainId,
  });
  const getResult = new BigNumber(getAmount.data);
  const resx = isNaN(getResult)
    ? 0
    : new BigNumber(getResult).dividedBy(new BigNumber(10).pow(18)).toFixed(3);
  const result = numberWithCommas(resx);
let success_message = <div className="text-center py-2">
Success! XRV Purchase Complete
<div>
  <Link
    style={{ color: "#fff" }}
    href={`https://testnet.bscscan.com/tx/${purchaseData?.hash}`}
  >
    View On Bscscan
  </Link>
</div>
</div>;
  useEffect(() => {
    if (purchaseIsSuccess) {
      doLoader(true,success_message_message,"component");
      toast.success(success_message);
      const timeout = setTimeout(() => {
        doLoader(false,"");
        toast.dismiss();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [purchaseIsSuccess, purchaseData?.hash]);

  useEffect(() => {
    if (purchaseIsError) {
      doLoader(true,"Error! Something Went Wrong");
      toast.error(
        <div className="text-center py-2">Error! Something Went Wrong</div>
      ); /* */
      const timeout = setTimeout(() => {
        toast.dismiss();
      
        doLoader(false,"");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [purchaseIsError]);

  useEffect(() => {
    if (purchaseData?.hash) {
      setAllowance(new BigNumber(0));
    }
  }, [purchaseData?.hash]);

  const handleUsdtAmountChange = (event) => {
    const inputValue = event.target.value;
    const parsedAmount = parseFloat(inputValue);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setUsdtErrorMessage("Amount must be greater than zero");
    } else if (balanceUsdt.data?.formatted < parsedAmount) {
      setUsdtErrorMessage("Insufficient balance.");
    } else {
      setUsdtErrorMessage("");
    }
    setUsdtAmount(inputValue);
  };

  useEffect(() => {
    const handlePostRequest = async () => {
      try {
        if (purchaseIsSuccess) {
          doLoader(true,"Payment received. Processing dashboard balance...")
          setTokenData({ ...token_data, total_tokens: result });
          const additionalData = {
            id: user_data?.id,
            tx_id: user_data?.txn_id,
            tx_hash: purchaseData?.hash,
            date_time: new Date().toUTCString(),
            tx_status: "success",
            user_address: address,
            payment_currency: "USDT",
            paid_amount: usdtAmount,
            received_amount_in_token: result,
            affiliate_data: token_data,
            referral_data: ref_data,
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
          doLoader(true,response.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
       
      let Err = ()=>{return <span className="color-red spacer">{error.message}</span>;}
      
      doLoader(true,<Err/>);
      }
    };
    handlePostRequest();
  }, [
    purchaseIsSuccess,
    purchaseData?.hash
  ]);



  const launchInvoice = () => {
    setInvoice({ ...invoice_data, currency:"usdt", amount:usdtAmount, onopen: true, onclose: closeInvoice });
    console.log(invoice_data);
  };
  return (
    <React.Fragment>
      <AmountForm
        handleCurrAmountChange={handleUsdtAmountChange}
        curr={"usdt"}
        result={result}
        currAmount={usdtAmount}
        currErrorMessage={usdtErrorMessage}
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
          <ReferralPane ref_data={ref_data}
            fetching_referee={fetching_referee}
            referee_fetched={referee_fetched}/>

          <div className="text-center">
            {address ? (
              <>
                {allowance.toNumber() < usdtAmount ? (<div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "5px",
                  }}
                >
                  <button
                    className="buy_token_button"
                    disabled={!approveWrite || approveIsLoading}
                    onClick={() => approveWrite()}
                  >
                    {approveIsLoading ? "Approving..." : "Approve"}
                  </button></div>
                ) : (
                  <><div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "5px",
                  }}
                >
                    <button
                      type="button"
                      className="buy_token_button"
                      disabled={!purchaseWrite || purchaseIsLoading}
                      onClick={() => purchaseWrite()}
                    >
                      {purchaseIsLoading ? "Buying..." : "Buy Now"}
                    </button>
                    </div>
                  </>
                )}
              </>
            ) : (<> {/*  
              <div className="cover-div">
                <div
                  className="btn-div"
                  style={{ opacity: usdtAmount > 0 ? "1" : "0.3" }}
                >
                <ConnectWalletButton /> 
                </div>
              </div>*/}

<div className="text-center">
<div className="cover-div">
  <div
    className="btn-div"
    style={{ opacity: usdtAmount > 0 ? "1" : "0.3" }}
  >
    <button
      onClick={() => launchInvoice()}
      disabled={usdtAmount <= 0}
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
            padding: "5px",
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
              {bux_data?.onopen &&  <BuyModal data={bux_data} />}
              {load_data?.open &&  <LoadingModal data={load_data} />}
    </React.Fragment>
  );
}
