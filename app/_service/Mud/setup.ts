/*
 * The MUD client code is built on top of viem
 * (https://viem.sh/docs/getting-started.html).
 * This line imports the functions we need from it.
 */
import { syncToRecs } from "@latticexyz/store-sync/recs";
import {
  ClientConfig,
  Hex,
  createPublicClient,
  fallback,
  http,
  webSocket,
} from "viem";

import { transportObserver } from "@latticexyz/common";
import { getNetworkConfig } from "./getNetworkConfig";
import { createWorld } from "@latticexyz/recs";

/*
 * Import our MUD config, which includes strong types for
 * our tables and other config options. We use this to generate
 * things like RECS components and get back strong types for them.
 *
 * See https://mud.dev/tutorials/walkthrough/minimal-onchain#mudconfigts
 * for the source of this information.
 */
import mudConfig from "./mud.config";

export type SetupResult = Awaited<ReturnType<typeof _setup>>;

let setupCache: SetupResult | undefined;
export async function setup() {
  if (setupCache) return setupCache;
  else return (setupCache = await _setup());
}

async function _setup() {
  const networkConfig = await getNetworkConfig();
  const world = createWorld();
  /*
   * Create a viem public (read only) client
   * (https://viem.sh/docs/clients/public.html)
   */
  const clientOptions = {
    chain: networkConfig.chain,
    transport: transportObserver(
      fallback([
        webSocket(
          "wss://goerli.infura.io/ws/v3/1b4fd85ec53748feae973ece5bc436bd"
        ),
        http("https://goerli.infura.io/v3/1b4fd85ec53748feae973ece5bc436bd"),
      ])
    ),
    pollingInterval: 1000,
  } as const satisfies ClientConfig;

  const publicClient = createPublicClient(clientOptions);

  /*
   * Sync on-chain state into RECS and keeps our client in sync.
   * Uses the MUD indexer if available, otherwise falls back
   * to the viem publicClient to make RPC calls to fetch MUD
   * events from the chain.
   */
  const { components } = await syncToRecs({
    world,
    config: mudConfig,
    address: networkConfig.worldAddress as Hex,
    publicClient,
    startBlock: BigInt(networkConfig.initialBlockNumber),
  });

  return {
    components,
  };
}
