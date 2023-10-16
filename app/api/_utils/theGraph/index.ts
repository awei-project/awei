const COUNT_PER_PAGE = 100;

type TheGraphResponse = {
  data: {
    claimableTransactions: Array<{
      id: string;
      sender: string;
      to: string;
      time: `${number}`;
    }>;
  };
};

type FetchOptions = {
  page?: number; // default 1
  // all?: boolean; // default false (only claimable), if true, includes claimed transactions
};
export function fetchEthereumTransactions(
  address: string,
  timestamp: number,
  options?: FetchOptions
): Promise<TheGraphResponse> {
  const payload = `
    query {
        claimableTransactions(first: ${COUNT_PER_PAGE},
        skip: ${(options?.page || 1) - 1},
        where: {sender: "${address}", time_lte: ${timestamp}}
    ) {
            id
            sender
            to
            time
        }
    }`;

  return fetch(process.env.THEGRAPH_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: payload }),
  }).then((res) => res.json());
}
