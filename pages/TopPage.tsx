"use client";
import Image from "next/image";
import { useState } from "react";
import MintButton from "@/components/MintButton";

export default function TopPage() {
  const [price, setPrice] = useState(0.01);
  const [citizen, setCitizen] = useState(2588);

  const handleMint = async () => {
    console.log("mint");
  };

  return (
    <div className="min-h-screen bg-main p-6 flex items-center justify-center">
      <div className="flex flex-col justify-around w-full gap-12">
        <div className="w-full">
          <Image
            src="/awei_logo.png"
            alt="awei_logo"
            width={400}
            height={278}
          />
        </div>

        <div className="flex items-center justify-center items-center">
          <div className="flex flex-row bg-[#F15B56] rounded-[24px] w-[80%] p-6 justify-around gap-6 font-tomorrow text-[#ffffff]">
            <div className="flex flex-col justify-around w-[40%]">
              <div className="flex flex-col">
                <div className="font-bold text-[32px]">AWEI CITIZEN</div>
                <div className="font-normal text-[14px]">
                  This game is like this game. So you can play this game
                  whenever, wherever you are. This game is like this game. So
                  you can play this game whenever
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <span className="font-bold text-[24px]">{price} </span>
                  ETH
                </div>
                <div>
                  <span className="font-bold text-[24px]">{citizen} </span>
                  Citizen
                </div>
              </div>
              <MintButton onClick={() => handleMint()} />
            </div>
            <div className="bg-[#3d3d3d] rounded-[24px] w-[312px] h-[312px] relative">
              <Image
                src="/bottle.png"
                alt="awei_logo"
                layout="fill"
                className="absolute top-0 left-0"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
