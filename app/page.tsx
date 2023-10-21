"use client";

import GamePage from "@/app/_components/GamePage";
import LeaderboardPage from "@/app/_components/LeaderboardPage";
import TopPage from "@/app/_components/TopPage";

export default function Home() {
  return (
    <main className="flex flex-col">
      <TopPage />
      <GamePage />
      <LeaderboardPage />
    </main>
  );
}
