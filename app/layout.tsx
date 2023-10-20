"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { createPublicClient, http } from "viem";
import { goerli } from "viem/chains";
import { WagmiConfig, createConfig } from "wagmi";
import { AxiomProvider } from "./_service/Axiom/AxiomProvider";

const inter = Inter({ subsets: ["latin"] });

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: goerli,
    transport: http(),
  }),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AWEI</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Tomorrow:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        <WagmiConfig config={config}>
          <AxiomProvider
            config={{
              providerUri:
                "https://goerli.infura.io/v3/1b4fd85ec53748feae973ece5bc436bd",
              version: "experimental",
              chainId: 5,
              mock: true,
            }}
          >
            {children}
          </AxiomProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
