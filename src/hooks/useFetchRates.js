import BigNumber from "bignumber.js";
import { useContractRead } from "wagmi";
import presaleAbi from "../abi/presale.json";
import { parseUnits, parseEther } from "viem";
import { contractAddr, chainId } from "../config";

export default function useFetchRates() {
  const uni = "1";
  const getBnbAmount = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getTokenAmountBNB",
    args: [parseEther(uni)],
    enabled: !!uni,
    watch: true,
    chainId: chainId,
  });

  const bnb_r = new BigNumber(getBnbAmount.data);
  const bnb_rate = isNaN(bnb_r)
    ? 0
    : new BigNumber(bnb_r).dividedBy(new BigNumber(10).pow(18)).toFixed(3);

  const getUsdcAmount = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getTokenAmountUSDC",
    args: [parseUnits(uni, 18)],
    enabled: !!uni,
    watch: true,
    chainId: chainId,
  });

  const usdc_r = new BigNumber(getUsdcAmount.data);

  const usdc_rate = isNaN(usdc_r)
    ? 0
    : new BigNumber(usdc_r).dividedBy(new BigNumber(10).pow(18)).toFixed(3);

  ///
  const getUsdtAmount = useContractRead({
    address: contractAddr,
    abi: presaleAbi,
    functionName: "getTokenAmountUSDT",
    args: [parseUnits(uni, 18)],
    enabled: !!uni,
    watch: true,
    chainId: chainId,
  });
  const usdt_r = new BigNumber(getUsdtAmount.data);
  const usdt_rate = isNaN(usdt_r)
    ? 0
    : new BigNumber(usdt_r).dividedBy(new BigNumber(10).pow(18)).toFixed(3);

  return { bnb_rate, usdc_rate, usdt_rate };
}
