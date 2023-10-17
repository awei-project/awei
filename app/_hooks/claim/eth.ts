import { FetchResult } from "@/app/api/claim/types";
import useSWRInfinite from "swr/infinite";
import { useWaitForTransaction } from "wagmi";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useEthereumClaimableTransactionQuery(address: string) {
  function getKey(pageIdx: number) {
    return `/api/claim/eth?address=${address}&page=${pageIdx}`;
  }

  const { data, size, setSize } = useSWRInfinite<FetchResult>(getKey, fetcher);

  return {
    txs: data?.flat(),
    loadMore() {
      setSize(size + 1);
    },
    loadUntilPage: setSize,
  };
}

export function useEthereumTransaction(hash: `0x${string}`) {
  // This hook supposed to call with a finished transaction, hence use waitForTransaction
  const {
    data,
    isLoading: isTxLoading,
    isError: isTxError,
  } = useWaitForTransaction({ hash });

  return {
    _tx: data, // in case any info is needed
    isLoading: isTxLoading,
    isError: isTxError,
    gasUsed: data?.cumulativeGasUsed,
    submitRequest: () => {},
    submitClaim: () => {},
  };
}
