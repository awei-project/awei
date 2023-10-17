export type Tx = {
  hash: `0x${string}`;
  to: `0x${string}`;
};

export type FetchResult = Array<Tx>;
