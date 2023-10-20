import { useMUD } from "@/app/_service/Mud/MUDContext";
import { useComponentValue } from "@latticexyz/react";
import { singletonEntity } from "@latticexyz/store-sync/recs";

export function useTotalSupply(): bigint | undefined {
  const {
    components: { AweiTokenMetadata },
  } = useMUD();
  const metadata = useComponentValue(AweiTokenMetadata, singletonEntity);
  return metadata?.totalSupply;
}
