type UserDataProps = {
  ranking: number;
  name: string;
  icon: string;
  points: number;
};

type Props = {
  data: UserDataProps;
};

const UserCard: React.FC<Props> = ({ data }) => {
  function formatRanking(number: number) {
    return number >= 1 && number <= 9 ? `0${number}` : `${number}`;
  }

  function getRankingBorderStyles(ranking: number) {
    switch (ranking) {
      case 1:
        return "border-2 border-gold";
      case 2:
        return "border-2 border-silver";
      case 3:
        return "border-2 border-bronze";
      default:
        return "";
    }
  }

  return (
    <div className="bg-[#272625] flex flex-row font-tomorrow px-[24px] py-[16px] rounded-[16px] items-center justify-between cursor-pointer transform hover:scale-[101%] transition-transform duration-300">
      <div className="flex flex-row gap-[24px]">
        <div
          className={`font-bold text-[20px] p-[12px] rounded-[50%] h-[56px] w-[56px] flex items-center justify-center ${getRankingBorderStyles(
            data.ranking
          )}`}
        >
          {formatRanking(data.ranking)}
        </div>
        <div className="flex flex-row gap-[16px] items-center">
          <img
            src={data.icon}
            alt={data.name}
            className="w-[64px] h-[64px] rounded-full"
          />
          <div className={"text-[18px]"}>{data.name}</div>
        </div>
      </div>
      <div className="text-[#ff7a2f] flex flex-row gap-[8px] items-center text-[14px] bg-[#373737] px-[16px] py-[12px] rounded-[16px]">
        <span className="text-[20px]">{data.points}</span> GWEI
      </div>
    </div>
  );
};

export default UserCard;
