"use client";

import { useState } from "react";
import TotalGweiLeaderboard from "@/app/_components/leaderboard/TotalGweiLeaderboard";
import SprintGweiLeaderboard from "@/app/_components/leaderboard/SprintGweiLeaderboard";
import GoerliLeaderboard from "@/app/_components/leaderboard/GoerliLeaderboard";
import ArbitrumLeaderboard from "@/app/_components/leaderboard/ArbitrumLeaderboard";
import PolygonLeaderboard from "@/app/_components/leaderboard/PolygonLeaderboard";

const leaderboardLinks = [
  { id: "sprintGwei", name: "Sprint Gwei" },
  { id: "totalGwei", name: "Total Gwei" },
  { id: "goerli", name: "Goerli" },
  { id: "arbitrum", name: "Arbitrum" },
  { id: "polygon", name: "Polygon" },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<string>("sprintGwei");
  const tabStyle = "py-[12px] px-[32px] rounded-[8px]";

  return (
    <div className="min-h-screen bg-main p-6 pb-[80px] flex items-center justify-center font-tomorrow text-[#ffffff]">
      <div className="w-[80%] flex flex-col gap-[60px]">
        <div className="text-[44px] font-bold text-center">
          CITIZEN&apos;s GWEI SCORE
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-row justify-between gap-[24px] font-tomorrow overflow-x-auto whitespace-nowrap hide-scrollbar">
            {leaderboardLinks.map((link) => (
              <button
                key={link.id}
                className={
                  activeTab === link.id
                    ? `${tabStyle} bg-[#272625] font-bold`
                    : `${tabStyle} border border-[#272625]`
                }
                onClick={() => setActiveTab(link.id)}
              >
                {link.name}
              </button>
            ))}
          </div>
          <div>
            {activeTab === "sprintGwei" && <SprintGweiLeaderboard />}
            {activeTab === "totalGwei" && <TotalGweiLeaderboard />}
            {activeTab === "goerli" && <GoerliLeaderboard />}
            {activeTab === "arbitrum" && <ArbitrumLeaderboard />}
            {activeTab === "polygon" && <PolygonLeaderboard />}
          </div>
        </div>
        <div className="flex flex-col gap-[32px] items-center">
          <div className="text-[44px] font-bold">
            Voting for Welcoming New Project
          </div>
          <button className="bg-[#ffffff] rounded-[8px] py-[16px] px-[28px] text-main w-fit font-bold cursor-pointer transform hover:scale-105 transition-transform duration-300">
            VOTE NOW
          </button>
        </div>
      </div>
    </div>
  );
}
