"use client";

import GamePage from "@/pages/GamePage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import TopPage from "@/pages/TopPage";

export default function Home() {
  return (
    <main className="flex flex-col">
      <TopPage />
      <GamePage />
      <LeaderboardPage />
    </main>
  );
}
