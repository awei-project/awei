import ImageContainer from "@/components/ImageContainer";

export default function GamePage() {
  return (
    <div className="min-h-screen bg-main p-6 flex items-center justify-center font-tomorrow text-[#ffffff]">
      <div className="w-[80%] flex flex-col gap-16">
        <div className="text-[44px] font-bold text-center">AWEI WORLD</div>
        <div className="flex flex-row justify-between flex-wrap gap-16">
          <ImageContainer
            src="/pirate_nation.png"
            alt="pirate_nation"
            link="https://piratenation.game/"
          />
          <ImageContainer
            src="/phi.png"
            alt="pirate_nation"
            link="https://philand.xyz/"
          />
          <ImageContainer src="/awgotchi.png" alt="aw_gotchi" />
        </div>
      </div>
    </div>
  );
}
