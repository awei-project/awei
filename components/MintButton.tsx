type MintButtonProps = {
  onClick: () => void;
};

const MintButton: React.FC<MintButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-[#ffffff] rounded-[8px] py-[16px] px-[28px] text-[#F15B56] w-fit font-bold cursor-pointer transform hover:scale-105 transition-transform duration-300"
      onClick={onClick}
    >
      MINT CITIZENSHIP
    </button>
  );
};

export default MintButton;
