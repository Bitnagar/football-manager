/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import PlayerDot from "./PlayerDot";
import { RosterData } from "@/types/shared.types";

export default function Formation({ rosterData }: { rosterData: RosterData }) {
  const MAX_Goalkeeper = 1;
  const MAX_Forwards = 3;
  const MAX_Defenders = 4;
  const MAX_Midfielders = 3;

  const [showPlayer, setShowPlayer] = useState<any>(
    rosterData.starters.goalkeeper[0]
  );

  function handlePlayerDotClick(player: any) {
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
        <section className="flex min-w-fit h-full items-center justify-between gap-10 bg-[#2D2D2D] p-8 ">
          <div
            id="formation-container"
            className="min-w-[808px] h-[541px] flex justify-between items-center"
          >
            <div className="min-w-[90px] h-full flex items-center justify-center">
              <PlayerDot
                className="cursor-pointer w-[32.32px] h-[32.06px] bg-yellow-600 rounded-full ml-10"
                player={rosterData.starters.goalkeeper[0]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
            </div>
            <div className="min-w-[90px] h-full transform translate-x-[-70px] flex flex-col justify-around">
              <PlayerDot
                className="cursor-pointer goalkeeper w-[32.32px] h-[32.06px] bg-black rounded-full ml-16"
                player={rosterData.starters.defenders[0]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
              <PlayerDot
                className="cursor-pointer goalkeeper w-[32.32px] h-[32.06px] bg-black rounded-full ml-10"
                player={rosterData.starters.defenders[1]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
              <PlayerDot
                className="cursor-pointer goalkeeper w-[32.32px] h-[32.06px] bg-black rounded-full ml-10"
                player={rosterData.starters.defenders[2]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
              <PlayerDot
                className="cursor-pointer goalkeeper w-[32.32px] h-[32.06px] bg-black rounded-full ml-16"
                player={rosterData.starters.defenders[3]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
            </div>
            <div className="min-w-[90px] h-full transform translate-x-[-132px] flex flex-col justify-evenly">
              <PlayerDot
                className="cursor-pointer goalkeeper w-[32.32px] h-[32.06px] bg-black rounded-full ml-10"
                player={rosterData.starters.midfielders[0]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
              <PlayerDot
                className="cursor-pointer goalkeeper w-[32.32px] h-[32.06px] bg-black rounded-full ml-10"
                player={rosterData.starters.midfielders[1]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
              <PlayerDot
                className="cursor-pointer goalkeeper w-[32.32px] h-[32.06px] bg-black rounded-full ml-10"
                player={rosterData.starters.midfielders[2]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
            </div>
            <div className="min-w-[90px] h-full transform translate-x-[-170px] flex flex-col justify-evenly">
              <PlayerDot
                className="cursor-pointer goalkeeper w-[32.32px] h-[32.06px] bg-black rounded-full ml-6"
                player={rosterData.starters.forwards[0]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
              <PlayerDot
                className="cursor-pointer goalkeeper w-[32.32px] h-[32.06px] bg-black rounded-full ml-10"
                player={rosterData.starters.forwards[1]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
              <PlayerDot
                className="cursor-pointer goalkeeper w-fit h-[32.06px] bg-black rounded-full ml-6"
                player={rosterData.starters.forwards[2]}
                handlePlayerDotClick={handlePlayerDotClick}
              />
            </div>
          </div>
          <div className="min-w-[322px] h-[541px] flex flex-col bg-[#222222] text-white rounded-sm p-6">
            <div
              style={{
                backgroundImage: `url(${showPlayer["Player Image"]})`,
                backgroundSize: "cover", // Adjust as needed
                backgroundPosition: "center", // Adjust as needed
                width: "100%",
                height: "75%", // Adjust as needed
              }}
              className={"w-full h-3/4"}
            >
              <div>
                <h1>{showPlayer["Jersey Number"]}</h1>
              </div>
              <div>
                <h1>{showPlayer["Player Name"]}</h1>
                <h1>{showPlayer["Position"]}</h1>
              </div>
              <div>
                <div>
                  <h1>Height</h1>
                  <h1>{showPlayer["Height"]}</h1>
                </div>
                <div>
                  <h1>Weight</h1>
                  <h1>{showPlayer["Weight"]}</h1>
                </div>
                <div>
                  <h1>Nationality</h1>
                  <div>
                    <img
                      src={showPlayer["Flag Image"]}
                      alt={showPlayer["Nationality"]}
                      width={16}
                      height={16}
                    />
                    <h1>{showPlayer["Nationality"]}</h1>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full h-1/4 flex flex-col">
              <div className="upper flex">
                <div>
                  <h1>{showPlayer["Appearances"]}</h1>
                  <h1>Appearances</h1>
                </div>
                <div>
                  <h1>{showPlayer["Minutes Played"]}</h1>
                  <h1>Minutes Played</h1>
                </div>
              </div>
              {showPlayer["Position"] === "Goalkeeper" && (
                <div className="lower flex">
                  <div>
                    <h1>{showPlayer["Clean Sheets"]}</h1>
                    <h1>Clean Sheets</h1>
                  </div>
                  <div>
                    <h1>{showPlayer["Saves"]}</h1>
                    <h1>Saves</h1>
                  </div>
                </div>
              )}
              {showPlayer["Position"] !== "Goalkeeper" && (
                <div className="lower">
                  <div>
                    <h1>{showPlayer["Goals "]}</h1>
                    <h1>Goals</h1>
                  </div>
                  <div>
                    <h1>{showPlayer["Assists"]}</h1>
                    <h1>Assists</h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}
