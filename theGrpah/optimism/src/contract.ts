import { ethereum } from "@graphprotocol/graph-ts";
import { ClaimableTransaction } from "../generated/schema";

export function handleFunctionCall(call: ethereum.Call): void {
  let entity = new ClaimableTransaction(call.transaction.hash);

  entity.sender = call.transaction.from;
  entity.to = call.transaction.to;
  entity.time = call.block.timestamp;

  entity.save();
}
