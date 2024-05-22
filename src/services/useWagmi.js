import React, { useEffect, useState, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
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
import numberWithCommas from "../../pipes/Number";

export default function useWagmi(props) {
  const { config_func_name, currencyAmount } = props;
  const { address } = useAccount();

  const balanceManual = useBalance({
    address: address,
    chainId: chainId,
    enabled: !!address,
    watch: true,
  });

  const manualBalanceBig = new BigNumber(balanceManual.data?.formatted);
  const isValidManual = manualBalanceBig.gte(currencyAmount);

  const { config } = usePrepareContractWrite({
    address: contractAddr,
    abi: presaleAbi,
    functionName: config_func_name,
    value: [parseEther(currencyAmount)],
    enabled: !!address && !!currencyAmount && !!isValidManual,
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
    args: [parseEther(currencyAmount)],
    enabled: !!currencyAmount,
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

  return {};
}
