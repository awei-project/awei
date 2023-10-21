import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useMint } from "../_hooks/token/useMint";
import { useEffect } from "react";
import toast from "react-hot-toast";

const MintButton: React.FC = () => {
  const { isConnected } = useAccount();
  const { mint, isMinting, isError, tokenId, txHash, error } = useMint();
  const { connect } = useConnect({
    onSuccess: () => mint(),
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (isError) {
      if (error) toast(`Mint failed, error: ${error.message.split("\n")[0]}`);
      if (txHash) toast(`Mint failed, transaction: ${txHash}`);
    }
    if (tokenId) {
      toast(`Mint success, token id: ${tokenId}`);
    }
  }, [error, isError, tokenId, txHash]);

  const handleMint = () => {
    if (isMinting) return;
    if (!isConnected) return connect();
    mint();
  };

  return (
    <button
      className="bg-[#ffffff] rounded-[8px] py-[16px] px-[28px] text-[#F15B56] w-fit font-bold cursor-pointer transform hover:scale-105 transition-transform duration-300"
      onClick={handleMint}
    >
      {isMinting ? "MINTING..." : "MINT CITIZENSHIP"}
    </button>
  );
};

export default MintButton;
