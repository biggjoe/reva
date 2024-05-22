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
import {
  tokenAdd,
  tokenUsdtAdd,
  tokenEthAdd,
  contractAddr,
  chainId,
} from "../../config";
import { UserContext } from "../../services/UserContext";
import PromptLogin from "../PromptLogin";
import useAuthService from "../../services/useAuthService";
import BuyModal from "../BuyModal";

import FontAwesome from "react-fontawesome";
import HttpService from "../../services/HttpService";
import AmountForm from "./AmountForm";
import ReferralPane from "./ReferralPane";
import AffiliatePane from "./AffiliatePane";
import numberWithCommas from "../../pipes/Number";
import LoadingModal from "../LoadingModal";
import PayInvoice from "./PayInvoice";

export default function EthCurrency(props) {
  const {
    affiliate_data,
    ref_data,
    set_aff,
    set_ref,
    applyBonus,
    removeBonus,
    handleBonusInput,
    fetching_bonus,
    bonus_fetched,
    fetching_referee,
    referee_fetched
  } = props;
  const [ethAmount, setEthAmount] = useState("");
  const [ethErrorMessage, setEthErrorMessage] = useState("");
  const [allowance, setAllowance] = useState(new BigNumber(0));
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

  const { address } = useAccount();

  const balanceEth = useBalance({
    address: address,
    token: tokenEthAdd,
    chainId: chainId,
    enabled: !!address,
    watch: true,
  });

  const EthBalanceBig = new BigNumber(balanceEth.data?.formatted);
  const isValidEth = EthBalanceBig.gte(ethAmount);

  const { config: approveConfig } = usePrepareContractWrite({
    address: tokenEthAdd,
    abi: erc20Abi,
    functionName: "approve",
    args: [contractAddr, parseUnits(ethAmount, 18)],
    enabled: !!address && !!ethAmount && !!isValidEth,
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

  const allowanceEthGet = useContractRead({
    address: tokenEthAdd,
    abi: erc20Abi,
    functionName: "allowance",
    enabled: !!address,
    args: [address, contractAddr],
    watch: true,
    chainId: chainId,
  });

  useEffect(() => {
    if (allowanceEthGet.data !== undefined) {
      const allowanceValue = new BigNumber(allowanceEthGet.data);
      setAllowance(allowanceValue);
    }
  }, [address, allowanceEthGet.data]);

  const { config } = usePrepareContractWrite({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "buyTokensWithETH",
    args: [parseUnits(ethAmount, 18)],
    enabled: !!address && !!ethAmount && !!allowance.gt(0) && !!isValidEth,
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
    functionName: "getTokenAmountETH",
    args: [parseUnits(ethAmount, 18)],
    enabled: !!ethAmount,
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
let error_message = <div className="text-center py-2">Error! Something Went Wrong</div>;
  useEffect(() => {
    if (purchaseIsSuccess) {

      setLoadData({
        ...load_data,
        open: true,
        message: success_message,
        onclose: closeLoader,
      });
      toast.success(
        success_message
      );
      const timeout = setTimeout(() => {
        toast.dismiss();
        setLoadData({
          ...load_data,
          open: false,
          onclose: closeLoader,
        });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [purchaseIsSuccess, purchaseData?.hash]);

  useEffect(() => {
    if (purchaseIsError) {
      setLoadData({
        ...load_data,
        open: true,
        message: error_message,
        onclose: closeLoader,
      });
      toast.error(error_message);
      const timeout = setTimeout(() => {
        toast.dismiss();
        setLoadData({
          ...load_data,
          open: false,
          onclose: closeLoader,
        });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [purchaseIsError]);

  useEffect(() => {
    if (purchaseData?.hash) {
      setAllowance(new BigNumber(0));
    }
  }, [purchaseData?.hash]);

  const handleEthAmountChange = (event) => {
    const inputValue = event.target.value;
    const parsedAmount = parseFloat(inputValue);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setEthErrorMessage("Amount must be greater than zero");
    } else if (balanceEth.data?.formatted < parsedAmount) {
      setEthErrorMessage("Insufficient balance.");
    } else {
      setEthErrorMessage("");
    }
    setEthAmount(inputValue);
  };

  useEffect(() => {
    const handlePostRequest = async () => {
      try {
        if (purchaseIsSuccess) {
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
            tx_hash: purchaseData?.hash,
            date_time: new Date().toUTCString(),
            tx_status: "success",
            user_address: address,
            payment_currency: "ETH",
            paid_amount: ethAmount,
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
    purchaseIsSuccess,
    purchaseData?.hash,
    address,
    ethAmount,
    result,
    user_data?.id,
    token_data,
  ]);

  const [loaded, setLoaded] = React.useState(false);
  const [bonus_code, setBonusCode] = React.useState("");
  const [bonus, setBonus] = React.useState({});
  const [is_bonused, setBonused] = React.useState(false);
  const [isBonus, setIsBonus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [show_code, setShowCode] = React.useState(false);
  const [show_init, setShowInit] = React.useState(false);
  const togAff = () => setShowCode(!show_code);
  const togOnce = () => setShowInit(!show_init);

  const closeLoader = () => setLoadData({ ...load_data, open: false });
  const [load_data, setLoadData] = React.useState({
    open: false,
    onclose: closeLoader,
  });

  const openLoader = () => {
    setLoadData({ ...load_data, open: true });
  };
  const closeInvoice = () => setInvoice({ ...invoice_data, onopen: false });
 
  const [invoice_data, setInvoice] = React.useState({
    onopen: false,
    onclose: closeInvoice,
  });

  const launchInvoice = () => {
    setInvoice({ ...invoice_data, currency:"eth", amount:ethAmount, onopen: true, onclose: closeInvoice });
    console.log(invoice_data);
  };
  return (
    <React.Fragment>
      <AmountForm
        handleCurrAmountChange={handleEthAmountChange}
        curr={"eth"}
        result={result}
        currAmount={ethAmount}
        currErrorMessage={ethErrorMessage}
      />
      {isLogged && (
        <>
          <AffiliatePane
            affiliate_data={affiliate_data}
            show_init={show_init}
            show_code={show_code}
            togAff={togAff}
            handleBonusInput={handleBonusInput}
            applyBonus={applyBonus}
            removeBonus={removeBonus}
            fetching_bonus={fetching_bonus}
          />
                <ReferralPane ref_data={ref_data}
            fetching_referee={fetching_referee}
            referee_fetched={referee_fetched}/>

          <div className="text-center">
            {address ? (
              <>
                {allowance.toNumber() < ethAmount ? (
                  <button
                    className="btn btn-b"
                    disabled={!approveWrite || approveIsLoading}
                    onClick={() => approveWrite()}
                  >
                    {approveIsLoading ? "Approving..." : "Approve"}
                  </button>
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
            ) : (<>
              {/* <div className="cover-div">
                <div
                  className="btn-div"
                  style={{ opacity: ethAmount > 0 ? "1" : "0.3" }}
                >
                  <ConnectWalletButton />
                </div>
              </div> */}
              <div className="text-center">
<div className="cover-div">
  <div
    className="btn-div"
    style={{ opacity: ethAmount > 0 ? "1" : "0.3" }}
  >
    <button
      onClick={() => launchInvoice()}
      disabled={ethAmount <= 0}
      className="buy_token_button"
    >
      CONTINUE
    </button>
  </div>
</div>
</div></>
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
              {bux_data?.open &&  <LoadingModal data={load_data} />}
    </React.Fragment>
  );
}
