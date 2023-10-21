import { useMUD } from "@/app/_service/Mud/MUDContext";
import { useComponentValue } from "@latticexyz/react";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import abi from "@/app/_service/Mud/IWorld.abi.json";
import worlds from "@/app/_service/Mud/worlds.json";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { isAddressEqual } from "viem";

type MintHookReturnType = {
  mint: () => void;
  price?: bigint;
  isMinting: boolean;
  isError: boolean;
  error: Error | null;
  txHash?: string;
  tokenId?: bigint;
  status: "idle" | "error" | "loading" | "success";
};

export function useMint(): MintHookReturnType {
  const {
    components: { Config },
  } = useMUD();
  const config = useComponentValue(Config, singletonEntity);
  const { data, isLoading, isError, error, status, write, reset } =
    useContractWrite({
      abi,
      address: worlds["5"].address as `0x${string}`,
      functionName: "mint",
      value: config?.mintPrice,
    });
  const {
    data: txReceipt,
    isLoading: isTxWaiting,
    error: txError,
    isError: isTxError,
  } = useWaitForTransaction({
    hash: data?.hash,
  });
  const tokenIdHex = txReceipt?.logs.find((log) => {
    return (
      isAddressEqual(log.address, worlds["5"].token as `0x${string}`) &&
      log.topics[0] ===
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
    );
  })?.topics[3];
  const tokenId = tokenIdHex ? BigInt(tokenIdHex) : undefined;

  return {
    mint: () => {
      reset();
      write();
    },
    price: config?.mintPrice,
    txHash: data?.hash,
    isMinting: isLoading || isTxWaiting,
    isError: isError || isTxError,
    status,
    error: error || txError,
    tokenId,
  };
}
