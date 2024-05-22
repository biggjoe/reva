import React, { useState } from "react";
import BigNumber from "bignumber.js";
import { useContractRead, useAccount, useBalance } from "wagmi";
import presaleAbi from "../abi/presale.json";
import erc20Abi from "../abi/erc20.json";
import CountdownTimer from "./CountdownTimers";
import BnbCurrency from "./Currency/BnbCurrency";
import UsdtCurrency from "./Currency/UsdtCurrency";
import EthCurrency from "./Currency/EthCurrency";
import { tokenAdd, contractAddr, chainId } from "../config";
import FontAwesome from "react-fontawesome";
import ManualPay from "./Currency/ManualPay";
import numberWithCommas from "../pipes/Number";

export default function BuyPanel(props) {
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
  console.log("buypanel temp::",props)
  const { address } = useAccount(); /* 
  const AuthServ = useAuthService();
  const usd = AuthServ.getCurrentUser();
  const [user_loaded, setUserLoaded] = React.useState(false);
  const [user_data, setUser] = React.useState(usd); */
  const [loaded, setLoaded] = React.useState(false);

  const getEndTime = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "endTimeSale",
    watch: true,
    chainId: chainId,
  });

  const getStartTime = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "startTimeSale",
    watch: true,
    chainId: chainId,
  });

  const getUsdRaised = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getUsdRaised",
    watch: true,
    chainId: chainId,
  });

  const getTokenPrice = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getPriceInUSD",
    watch: true,
    chainId: chainId,
  });

  const getTokenBalance = useContractRead({
    address: tokenAdd,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
    enabled: !!address,
    chainId: chainId,
  });

  const curprz = new BigNumber(getTokenPrice.data).dividedBy(new BigNumber(10).pow(18)).toFixed(6);
  const currentPrice  = isNaN(curprz) ? 0.00 : numberWithCommas(curprz); 
  const tokenBalance = new BigNumber(getTokenBalance.data)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(3);
  const saleEndTime = new BigNumber(getEndTime.data);
  const saleStartTime = new BigNumber(getStartTime.data);

  const rzd = new BigNumber(getUsdRaised.data)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(3)
  const raisedUsd = isNaN(rzd) ? 0.00: numberWithCommas(rzd);

const tgt = new BigNumber(3150000);
    const targetUsd = isNaN(tgt) ? 0.00: numberWithCommas(tgt);

  const progressPercentage = new BigNumber(raisedUsd)
    .dividedBy(targetUsd)
    .multipliedBy(100);

  const [selectedCurrency, setSelectedCurrency] = useState("bnb");

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const [percVal, setPerc] = React.useState(0);
  React.useEffect(() => {
    if ((progressPercentage && targetUsd && raisedUsd, currentPrice)) {
      setLoaded(true);
      const prc = isNaN(progressPercentage) ? 0 : progressPercentage.toFixed(2);
      setPerc(`${prc}%`);
    }
  }, [progressPercentage, targetUsd, raisedUsd, currentPrice]);

  return (
    <>
      <section className="buy-cover">
        <div className="buy-container">
          <div className="buy-header">
            <div className="title-ba">
              <span className="tids">Current Stage</span>
              <span className="stage-titler bolder">STAGE 1</span>
            </div>
            <span className="spacer"></span>

            <div className="title-ba contents-right">
              <span className="tids">Presale Ends In</span>
              <div className="stage-titler bolder ">
                <CountdownTimer endTime={saleEndTime.toString()} />
              </div>
            </div>
          </div>

          <div className="panel-content">
            <div className="prog-container">
              {/*  */}
              <div className="prog-desc">
                <div className="done-text px10">
                  <h4 className="txt-xem">Total Raised</h4>
                  <span className="txt-pcs">
                    {loaded ? `$${raisedUsd.toString()}` : "..."}
                  </span>
                </div>
                <div className="spacer"></div>
                <div className="total-text text-right px10">
                  <h4 className="txt-xem">Target</h4>
                  <span className="txt-pcs">
                    {loaded ? `$${targetUsd.toString()}` : "..."}
                  </span>
                </div>
              </div>

              <div className="prog-signal">
                <div className="status-bar">
                  <span
                    className="done-bar"
                    style={{
                      width: percVal,
                    }}
                  >
                    {loaded
                      ? `${
                          isNaN(progressPercentage)
                            ? 0
                            : progressPercentage.toFixed(2)
                        }%`
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="divider-with-text my10">
              <span>
                1 XRV = {loaded ? `$${currentPrice.toString()}` : "..."}
              </span>
            </div>{" "}
            {/**/}
            <div className="purchase-area">
              <div className="buttons-area">
                <div className="purchase-btns">
                  <div className="btn-col">
                    <button
                      type="button"
                      className={`custom-currency-button ${
                        selectedCurrency === "bnb" ? "active" : ""
                      }`}
                      onClick={() => setSelectedCurrency("bnb")}
                    >
                      <span className="currency-icon">
                        <img src="/images/coins/bnb.png" alt="BNB Icon" />
                      </span>
                      <span>BNB</span>
                    </button>
                  </div>
                  <div className="btn-col">
                    <button
                      type="button"
                      className={`custom-currency-button ${
                        selectedCurrency === "usdt" ? "active" : ""
                      }`}
                      onClick={() => setSelectedCurrency("usdt")}
                    >
                      <span className="currency-icon">
                        <img src="/images/coins/usdt.png" alt="USDT Icon" />
                      </span>
                      <span>USDT</span>
                    </button>
                  </div>

                  <div className="btn-col">
                    <button
                      type="button"
                      className={`custom-currency-button ${
                        selectedCurrency === "eth" ? "active" : ""
                      }`}
                      onClick={() => setSelectedCurrency("eth")}
                    >
                      <span className="currency-icon">
                        <img src="/images/coins/eth.png" alt="Etherum Icon" />
                      </span>
                      <span>ETH</span>
                    </button>
                  </div>

                  {/*   <div className="btn-col">
                    <button
                      type="button"
                      className={`custom-currency-button ${
                        selectedCurrency === "manual" ? "active" : ""
                      }`}
                      onClick={() => setSelectedCurrency("manual")}
                    >
                      <span className="currency-icon">
                        <FontAwesome name={`folder-open`} />
                      </span>
                      <span>Manual</span>
                    </button>
                  </div> */}
                </div>
              </div>

              <div className="pt5 pb10">
                {selectedCurrency === "bnb" && (
                  <BnbCurrency
                    ref_data={ref_data}
                    affiliate_data={affiliate_data}
                    set_ref={set_ref}
                    set_aff={set_aff}
                    handleBonusInput={handleBonusInput}
                    bonus_code={bonus_code}
                    applyBonus={applyBonus}
                    removeBonus={removeBonus}
                    currency={selectedCurrency}
                    fetching_bonus={fetching_bonus}
                    bonus_fetched={bonus_fetched}
                    fetching_referee={fetching_referee}
                    referee_fetched={referee_fetched}
                  />
                )}
                {/* */}
                {selectedCurrency === "usdt" && (
                  <UsdtCurrency
                    ref_data={ref_data}
                    affiliate_data={affiliate_data}
                    set_ref={set_ref}
                    set_aff={set_aff}
                    handleBonusInput={handleBonusInput}
                    bonus_code={bonus_code}
                    applyBonus={applyBonus}
                    removeBonus={removeBonus}
                    currency={selectedCurrency}
                    fetching_bonus={fetching_bonus}
                    bonus_fetched={bonus_fetched}
                    fetching_referee={fetching_referee}
                    referee_fetched={referee_fetched}
                  />
                )}
                {selectedCurrency === "eth" && (
                  <EthCurrency
                    ref_data={ref_data}
                    affiliate_data={affiliate_data}
                    set_ref={set_ref}
                    set_aff={set_aff}
                    handleBonusInput={handleBonusInput}
                    bonus_code={bonus_code}
                    applyBonus={applyBonus}
                    removeBonus={removeBonus}
                    currency={selectedCurrency}
                    fetching_bonus={fetching_bonus}
                    bonus_fetched={bonus_fetched}
                    fetching_referee={fetching_referee}
                    referee_fetched={referee_fetched}
                  />
                )}
                {selectedCurrency === "manual" && (
                  <ManualPay
                    ref_data={ref_data}
                    affiliate_data={affiliate_data}
                    set_ref={set_ref}
                    set_aff={set_aff}
                    applyBonus={applyBonus}
                    currency={selectedCurrency}
                    fetching_bonus={fetching_bonus}
                    bonus_fetched={bonus_fetched}
                    fetching_referee={fetching_referee}
                    referee_fetched={referee_fetched}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
