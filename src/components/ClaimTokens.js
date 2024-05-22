import React, { useEffect, useState, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import ConnectWalletButton from "../components/ConnectWalletButton";
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
import { parseUnits, parseEther, formatEther, formatUnits } from "viem";
import presaleAbi from "@/abi/presale.json";
import erc20Abi from "@/abi/erc20.json";
import { tokenAdd, contractAddr, chainId } from "@/config";

const ClaimToken = () => {
  const { address } = useAccount();

  const getClaimableTokens = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getClaimableTokens",
    enabled: !!address,
    args: [address],
    watch: true,
    chainId: chainId,
  });

  const { config } = usePrepareContractWrite({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "claimTokens",
    enabled: !!address,
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

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        <div className="text-center py-2">
          Success! XRV has been claimed
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
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess, data?.hash]);

  useEffect(() => {
    if (isError) {
      toast.error(
        <div className="text-center py-2">
          {t("Error! Something Went Wrong")}
        </div>
      );
      const timeout = setTimeout(() => {
        toast.dismiss();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isError]);

  const balance = new BigNumber(getClaimableTokens.data)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(3);
  const tokenBalance = new BigNumber(getTokenBalance.data)
    .dividedBy(new BigNumber(10).pow(18))
    .toFixed(3);

  return (
    <div className="text-center">
      {balance == 0 ? (
        <>
          <p>Already Claimed Token. Check your wallet. Thanks.</p>
          <button type="button" className="btn btn-b" disabled>
            Claimed
          </button>
        </>
      ) : (
        <>
          {address && (
            <>
              <br />
              <p align="center">Claimable Tokens: {balance.toString()} XRV</p>
              <p align="center">
                Your Available XRV: {tokenBalance.toString()}
              </p>
              <button
                type="button"
                className="btn btn-b"
                disabled={!write || isLoading}
                onClick={() => write()}
              >
                {isLoading ? "Claiming..." : "Claim Now"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ClaimToken;
