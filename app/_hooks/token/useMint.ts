type MintHookReturnType = {
  mint: () => Promise<void>;
  isMinting: boolean;
  isError: boolean;
  error?: Error;
  txHash?: string;
  tokenId?: number;
  status: "idle" | "error" | "loading" | "success";
};

export function useMint(): MintHookReturnType {
  return {
    async mint() {},
    isMinting: false,
    isError: false,
    status: "idle",
  };
}
