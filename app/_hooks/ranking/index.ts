type RankingType = "SPRINT" | "TOTAL" | "GOERLI" | "ARBITRUM" | "POLYGON";

type TokenInfo = {
  name: string;
  level: number;
  score: number;
};

export function useRanking(type: RankingType): TokenInfo[] {
  return [];
}
