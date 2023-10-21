import userDataList from "@/lib/db";
import UserCard from "./UserCard";

const TotalGweiLeaderboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-[16px]">
      {userDataList.map((data) => (
        <UserCard key={data.name} data={data} />
      ))}
    </div>
  );
};

export default TotalGweiLeaderboard;
