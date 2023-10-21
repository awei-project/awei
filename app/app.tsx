"use client";

import { ReactNode } from "react";
import { createPublicClient, http } from "viem";
import { goerli } from "viem/chains";
import { WagmiConfig, createConfig } from "wagmi";
import { AxiomProvider } from "./_service/Axiom/AxiomProvider";
import { MUDProvider } from "./_service/Mud/MUDContext";
import { Toaster } from "react-hot-toast";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: goerli,
    transport: http(
      "https://goerli.infura.io/v3/1b4fd85ec53748feae973ece5bc436bd"
    ),
  }),
});

export function App({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <AxiomProvider
        config={{
          providerUri: "http://localhost:8545",
          version: "experimental",
          chainId: 5,
          mock: true,
        }}
      >
        <MUDProvider>
          {children}
          <Toaster />
        </MUDProvider>
      </AxiomProvider>
    </WagmiConfig>
  );
}
