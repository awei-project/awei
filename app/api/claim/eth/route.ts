import { NextRequest } from "next/server";
import { fetchEthereumTransactions } from "../../_utils/theGraph";
import { ErrorResult } from "../../types";
import { FetchResult } from "../types";

// Fetch claimable transactions
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  const page = searchParams.get("page");

  const errors = [];
  if (!address) {
    errors.push("address is required");
  }
  if (page && isNaN(parseInt(page))) {
    errors.push("page must be a number");
  }
  if (errors.length > 0) {
    return Response.json({ errors } as ErrorResult);
  }

  const ethereumTxs = await fetchEthereumTransactions(
    <string>address,
    Math.floor(new Date().getTime() / 1000),
    { page: page ? parseInt(page) : 1 }
  );
  const result: FetchResult = ethereumTxs.data.claimableTransactions.map(
    (tx) => ({
      hash: tx.id,
      to: tx.to,
    })
  );

  return Response.json(result);
}
