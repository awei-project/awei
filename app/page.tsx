import TopPage from "@/pages/TopPage";
import GamePage from "@/pages/GamePage";
import LeaderboardPage from "@/pages/LeaderboardPage";

export default function Home() {
  return (
    <main className="flex flex-col">
      <TopPage />
      <GamePage />
      <LeaderboardPage />
    </main>
  );
}
