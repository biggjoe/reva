import React from "react";
import Grid from "@mui/material/Grid";
import useAuthService from "../../../services/useAuthService";
import HttpService from "../../../services/HttpService";
import * as processHtml from "../../../services/processHtml";
import CountdownTimers from "../../../components/CountdownTimers";
import PlaceHolder from "../../../components/PlaceHolder";
import Link from "next/link";
import BigNumber from "bignumber.js";
import { useContractRead, useAccount, useBalance } from "wagmi";
import presaleAbi from "../../../abi/presale.json";
import erc20Abi from "../../../abi/erc20.json";
import CountdownTimer from "../../../components/CountdownTimers";
import BnbCurrency from "../../../components/Currency/BnbCurrency";
import UsdtCurrency from "../../../components/Currency/UsdtCurrency";
import EthCurrency from "../../../components/Currency/EthCurrency";
import { tokenAdd, contractAddr, chainId } from "../../../config";
import FontAwesome from "react-fontawesome";
import ManualPay from "../../../components/Currency/ManualPay";
import numberWithCommas from "../../../pipes/Number";
import Layout from "../../../components/Admin/Layout";

const Dashboard = () => {
  const AuthServ = useAuthService();
  const usr = AuthServ.getCurrentUser();
  const { decodeHtml } = processHtml;
  const [dashboard, setDashboard] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [isParam, setParam] = React.useState(false);
  const [seconds, setSeconds] = React.useState(null);
const { address } = useAccount();
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
    <React.Fragment>
      <Layout>
        <section className="dashboard-pane">
          <div className="z-high py10">
            {loading && <PlaceHolder type="dash" />}
            {loaded && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href="/account/dashboard" className="grid-card g7">
                      --------
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href="/account/dashboard" className="grid-card bga">
                      -----
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href="/account/dashboard" className="grid-card bga">
                      -----
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Link className="grid-card bga" href="/account/affiliate">
                      <div className="flex flex-row align-items-center pxy20">
                        <div className="spacer">
                          <div className="icon-pane mb10">
                            <i className="fa-users fas fa"></i>
                          </div>
                          <div className="txt-xsm">-</div>
                          <div className="pane-title">
                            <span>Affiliate</span>
                            <sup>
                              <i className="fa-check-circle color-approved fas fa"></i>
                            </sup>
                          </div>
                        </div>

                        <div className="spacer">
                          <div className="flex flex-row">
                            <div className="flex flex-col text-center">
                              <span className="txt-xsm">Earnings</span>
                              <h3 className="boldest">
                                <sup>$</sup>
                                {dashboard?.total_earnings}{" "}
                              </h3>
                            </div>
                            <span className="px10"></span>
                            <div className="flex flex-col text-center">
                              <span className="txt-xsm">Bal</span>
                              <h3 className="boldest">
                                <sup>$</sup>
                                {dashboard?.wallet_balance}
                              </h3>
                            </div>
                          </div>

                          <div className="flex flex-row justify-end pt10">
                            <div className="flex flex-col align-items-center pr20">
                              <span className="txt-xsm">Codes</span>
                              <h3 className="boldest">
                                {dashboard?.total_codes}
                              </h3>
                            </div>
                            <div className="flex align-items-center flex-col">
                              <span className="txt-xsm">Active</span>
                              <h3 className="boldest">
                                {dashboard?.active_codes}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
};

export default Dashboard;
