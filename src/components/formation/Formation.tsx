/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import PlayerDot from "./PlayerDot";
import { PlayerStats, RosterData } from "@/types/shared.types";
import Image from "next/image";

export default function Formation({ rosterData }: { rosterData: RosterData }) {
  const MAX_Goalkeeper = 1;
  const MAX_Forwards = 3;
  const MAX_Defenders = 4;
  const MAX_Midfielders = 3;

  const [showPlayer, setShowPlayer] = useState<PlayerStats>(
    rosterData.starters.goalkeeper[0]
  );

  function handlePlayerDotClick(player: PlayerStats) {
    setShowPlayer(player);
  }

  // useEffect(() => {
  //   console.log("formation component rendered");
  // }, []);

  if (
    rosterData.starters.goalkeeper.length === MAX_Goalkeeper &&
    rosterData.starters.defenders.length === MAX_Defenders &&
    rosterData.starters.forwards.length === MAX_Forwards &&
    rosterData.starters.midfielders.length === MAX_Midfielders
  ) {
    return (
      <>
        <div className="flex w-full h-full items-center justify-center bg-[#2D2D2D] p-8 rounded-md">
          <div className="w-full h-full flex items-center justify-around gap-10">
            <div className="relative lg:min-w-[625px] lg:min-h-[420px] xl:min-w-[808px] xl:h-[541px]">
              <Image
                src={"/assets/Field.png"}
                alt="field image"
                width={808}
                height={541}
                className="absolute top-0 left-0 z-[0]"
                priority={true}
              />
              <div className="w-full h-full flex justify-between items-center lg:min-w-[625px] lg:min-h-[420px] xl:min-w-[808px] xl:h-[541px]">
                <div className="min-w-[90px] h-full flex items-center justify-center text-white z-10">
                  <PlayerDot
                    className="lg:ml-2 xl:ml-4"
                    player={rosterData.starters.goalkeeper[0]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                </div>
                <div className="min-w-[90px] lg:min-h-[420px] xl:h-[541px] transform lg:translate-x-[-50px] xl:translate-x-[-70px] flex flex-col lg:justify-evenly xl:justify-around z-10">
                  <PlayerDot
                    className="ml-16"
                    player={rosterData.starters.defenders[0]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                  <PlayerDot
                    player={rosterData.starters.defenders[1]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                  <PlayerDot
                    player={rosterData.starters.defenders[2]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                  <PlayerDot
                    className="ml-16"
                    player={rosterData.starters.defenders[3]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                </div>
                <div className="min-w-[90px] lg:min-h-[420px] xl:h-[541px] transform lg:translate-x-[-88px] xl:translate-x-[-114px] flex flex-col justify-evenly">
                  <PlayerDot
                    player={rosterData.starters.midfielders[0]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                  <PlayerDot
                    player={rosterData.starters.midfielders[1]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                  <PlayerDot
                    player={rosterData.starters.midfielders[2]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                </div>
                <div className="min-w-[90px] lg:min-h-[420px] xl:h-[541px] transform lg:translate-x-[-110px] xl:translate-x-[-170px] flex flex-col justify-evenly">
                  <PlayerDot
                    className="mr-8"
                    player={rosterData.starters.forwards[0]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                  <PlayerDot
                    player={rosterData.starters.forwards[1]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                  <PlayerDot
                    className="mr-8"
                    player={rosterData.starters.forwards[2]}
                    handlePlayerDotClick={handlePlayerDotClick}
                  />
                </div>
              </div>
            </div>
            <div className="lg:min-w-[320px] lg:h-[422px] lg:text-xs xl:text-sm xl:min-w-[322px] xl:h-[541px] flex flex-col bg-[#222222] text-white rounded-sm p-6">
              <div
                style={{
                  backgroundImage: `url(${showPlayer["Player Image"]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                  width: "90%",
                  height: "75%",
                }}
                className="w-full h-3/4 flex flex-col justify-between"
              >
                <div className="relative w-[44px] h-[109px] mt-10">
                  <h1 className="relative text-[40px] text-primary-orange font-semibold z-[50]">
                    {showPlayer["Jersey Number"]}
                  </h1>
                  <h1 className="absolute top-0 left-0 text-[109px] text-[#3A3731] font-semibold transform lg:translate-y-[-2px] xl:translate-y-[5px] xl:translate-x-[-6px] z-0">
                    {showPlayer["Jersey Number"]}
                  </h1>
                </div>
                <div className="flex flex-col gap-5 lg:mb-4 xl:mb-6 w-full">
                  <div>
                    <h1 className="text-2xl font-normal">
                      {showPlayer["Player Name"]}
                    </h1>
                    <h1 className="text-primary-orange">
                      {showPlayer["Position"]}
                    </h1>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <h1 className="mb-2">Height</h1>
                      <h1>{parseInt(showPlayer["Height"]) / 100} m</h1>
                    </div>
                    <div>
                      <h1 className="mb-2">Weight</h1>
                      <h1>{showPlayer["Weight"]} kg</h1>
                    </div>
                    <div className="w-fit">
                      <h1 className="mb-2">Nationality</h1>
                      <div className="w-full flex items-center gap-2">
                        <img
                          src={showPlayer["Flag Image"]}
                          alt={showPlayer["Nationality"]}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        <h1 className="min-w-fit">
                          {showPlayer["Nationality"]}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="w-full h-1/4 flex justify-between lg:mt-4 xl:mt-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="text-primary-orange lg:text-sm xl:text-2xl font-semibold">
                      {showPlayer["Appearances"]}
                    </h1>
                    <h1>Appearances</h1>
                  </div>
                  {showPlayer["Position"] === "Goalkeeper" ? (
                    <div>
                      <h1 className="text-primary-orange lg:text-sm xl:text-2xl font-semibold">
                        {showPlayer["Clean Sheets"]}
                      </h1>
                      <h1>Clean Sheets</h1>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-primary-orange lg:text-sm xl:text-2xl font-semibold">
                        {showPlayer["Goals "]}
                      </h1>
                      <h1>Goals</h1>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="text-primary-orange lg:text-sm xl:text-2xl font-semibold">
                      {showPlayer["Minutes Played"]}
                    </h1>
                    <h1>Minutes Played</h1>
                  </div>
                  {showPlayer["Position"] === "Goalkeeper" ? (
                    <div>
                      <h1 className="text-primary-orange lg:text-sm xl:text-2xl font-semibold">
                        {showPlayer["Saves"]}
                      </h1>
                      <h1>Saves</h1>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-primary-orange lg:text-sm xl:text-2xl font-semibold">
                        {showPlayer["Assists"]}
                      </h1>
                      <h1>Assists</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
