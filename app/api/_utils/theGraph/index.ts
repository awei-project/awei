const COUNT_PER_PAGE = 100;

type TheGraphResponse = {
  data: {
    claimableTransactions: Array<{
      id: `0x${string}`;
      sender: `0x${string}`;
      to: `0x${string}`;
      time: `${number}`;
    }>;
  };
};

type FetchOptions = {
  page?: number; // default 1
  // all?: boolean; // default false (only claimable), if true, includes claimed transactions
};

const NetworkConfig = {
  goerli: process.env.THEGRAPH_URL!,
  polygon: process.env.THEGRAPH_POLYGON_URL!,
} as const;

export async function fetchEthereumTransactions(
  address: string,
  timestamp: number,
  network: keyof typeof NetworkConfig,
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

  return fetch(NetworkConfig[network], {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: payload }),
  }).then((res) => res.json());
}
