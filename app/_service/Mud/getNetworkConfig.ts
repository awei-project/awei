import { goerli } from "viem/chains";
import worlds from "./worlds.json";

export async function getNetworkConfig() {
  const chainId = goerli.id;

  /*
   * Find the chain (unless it isn't in the list of supported chains).
   */
  const chain = goerli;
  if (!chain) {
    throw new Error(`Chain ${chainId} not found`);
  }

  /*
   * Get the address of the World. If you want to use a
   * different address than the one in worlds.json,
   * provide it as worldAddress in the query string.
   */
  const world = worlds[chain.id.toString() as "5"];
  const worldAddress = world?.address;
  if (!worldAddress) {
    throw new Error(
      `No world address found for chain ${chainId}. Did you run \`mud deploy\`?`
    );
  }

  /*
   * MUD clients use events to synchronize the database, meaning
   * they need to look as far back as when the World was started.
   * The block number for the World start can be specified either
   * on the URL (as initialBlockNumber) or in the worlds.json
   * file. If neither has it, it starts at the first block, zero.
   */
  const initialBlockNumber = world?.blockNumber ?? 0n;

  return {
    chain,
    worldAddress,
    initialBlockNumber,
  };
}
