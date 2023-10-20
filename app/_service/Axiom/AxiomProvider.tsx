"use client";

import { Axiom, AxiomConfig } from "@axiom-crypto/experimental";
import { PropsWithChildren, createContext, useContext } from "react";
import { ReceiptField } from "@axiom-crypto/experimental/experimental/onlyReceiptsQueryBuilder";
import { TransactionField } from "@axiom-crypto/experimental/experimental/txReceiptsQueryBuilder";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { abi } from "./abi";
import { parseEther } from "viem";

type AxiomContextType = {
  axiom: Axiom;
};

const AxiomContext = createContext<AxiomContextType | null>(null);

export function useAxiom(txHash: `0x${string}`) {
  const ctx = useContext(AxiomContext);
  if (!ctx) throw new Error("AxiosProvider not found");
  const { axiom } = ctx;

  /*
    // According to docs, we should use prepare and use the config in next
    // hook to avoid UX issue, but it leads to a type error.
    
    const { config: contractWriteConfig } = usePrepareContractWrite({
      abi,
      address: axiom.config.getConstants().Addresses.AxiomExperimental,
      functionName: "sendTxReceiptsQuery",
    });
  */
  const queryResult = useContractWrite({
    abi,
    address: axiom.config.getConstants().Addresses.AxiomExperimental,
    functionName: "sendTxReceiptsQuery",
    value: parseEther("0.01"),
  });

  async function getQuery() {
    const qb = axiom.experimental.newTxReceiptsQueryBuilder();

    // TODO: we can query 8 fields at once to reduce transactions
    await qb.appendReceiptQuery({
      txHash,
      field: ReceiptField.CumulativeGas,
    });
    await qb.appendTxQuery({
      txHash,
      field: TransactionField.SignatureR,
    });
    await qb.appendTxQuery({
      txHash,
      field: TransactionField.SignatureS,
    });

    return qb;
  }

  async function submitQuery() {
    if (!queryResult.write) throw new Error("Contract write not ready");
    const qb = await getQuery();
    const { keccakQueryResponse, queryHash, query } = await qb.build();
    console.debug("keccakQueryResponse:", keccakQueryResponse);
    console.debug("Query hash:", queryHash);
    console.debug("Query data:", query);

    return queryResult.write({
      args: [
        keccakQueryResponse as `0x${string}`,
        queryHash as `0x${string}`,
        query as `0x${string}`,
      ],
    });
  }

  async function getWitness() {
    const qb = await getQuery();
    const responseTree = await qb.getResponseTrees();
    const keccakTxResponse = responseTree.tx.tree.getHexRoot();
    const keccakReceiptResponse = responseTree.receipt.tree.getHexRoot();
    const wit = await qb.getValidationWitness();

    // to Call with areTxReceiptsValid
    return {
      keccakTxResponse,
      keccakReceiptResponse,
      txResponses: wit.txResponses,
      receiptResponses: wit.receiptResponses,
    };
  }

  return {
    axiom,
    submitQuery,
    queryResult,
    getWitness,
  };
}

export function AxiomProvider({
  config,
  children,
}: PropsWithChildren<{ config: AxiomConfig }>) {
  const axiom = new Axiom(config);

  return (
    <AxiomContext.Provider value={{ axiom }}>{children}</AxiomContext.Provider>
  );
}
