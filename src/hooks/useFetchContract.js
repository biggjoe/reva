import React from "react";
import BigNumber from "bignumber.js";
import { useContractRead, useAccount, useBalance } from "wagmi";
import presaleAbi from "../abi/presale.json";
import erc20Abi from "../abi/erc20.json";
import { tokenAdd, contractAddr, chainId } from "../config";
import numberWithCommas from "../pipes/Number";

export default function useFetchContract() {
  const [contract_loaded, setContractLoaded] = React.useState(false);
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

  const curprz = new BigNumber(getTokenPrice.data)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(6);
  const currentPrice = isNaN(curprz) ? 0.0 : curprz;
  const xrv_to_usd = currentPrice.toString();

  const tokenBalance = new BigNumber(getTokenBalance.data)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(3);

  const saleEndTime = new BigNumber(getEndTime.data);
  const saleStartTime = new BigNumber(getStartTime.data);

  const rzd = new BigNumber(getUsdRaised.data)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(3);
  const raisedUsd = isNaN(rzd) ? 0.0 : numberWithCommas(rzd);
  const total_raised_usd = raisedUsd.toString();

  const tgt = new BigNumber(3150000);
  const targetUsd = isNaN(tgt) ? 0.0 : numberWithCommas(tgt);

  const total_target_usd = targetUsd.toString();

  const progressPercentage = new BigNumber(raisedUsd)
    .dividedBy(targetUsd)
    .multipliedBy(100);

  const [percVal, setPerc] = React.useState(0);
  const [percProgres, setProg] = React.useState(0);
  React.useEffect(() => {
    if ((progressPercentage && targetUsd && raisedUsd, currentPrice)) {
      setContractLoaded(true);
      console.log("Contract Loaded");
      const prc = isNaN(progressPercentage) ? 0 : progressPercentage.toFixed(2);
      setPerc(`${prc}%`);
      setProg(prc);
    }
  }, [progressPercentage, targetUsd, raisedUsd, currentPrice]);

  return {
    address,
    contract_loaded,
    saleEndTime,
    saleStartTime,
    total_raised_usd,
    total_target_usd,
    xrv_to_usd,
    tokenBalance,
    percProgres,
  };
}
